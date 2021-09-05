#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <sstream>
#include <time.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <map>
#include <thread>
#include <mutex>
#include <set>
using namespace std;

template <typename T, typename Compare = less<T>>
class concurrent_set
{
private:
  set<T, Compare> set_;
  mutex mutex_;

public:
  typedef typename set<T, Compare>::iterator iterator;

  pair<iterator, bool>
  insert(const T &val)
  {
    unique_lock<mutex> lock(mutex_);
    return set_.insert(val);
  }
};

struct dependencyNode
{
  string target;
  vector<string> dependencies;
  string command;
};

concurrent_set<string> alreadyUpdated;

vector<string> split(string str, char delimiter)
{
  stringstream ss(str);
  string tmp;
  vector<string> words;
  while (getline(ss, tmp, delimiter))
    words.push_back(tmp);

  return words;
}

void printVector(vector<string> v)
{
  for (auto i = v.begin(); i != v.end(); ++i)
    cout << *i << ' ';
  cout << endl;
}

dependencyNode readTargetAndDependencies(string line)
{
  vector<string> words = split(line, ' ');

  string target = words[0];
  // Remove colon from end
  target.pop_back();

  vector<string> dependencies;
  for (int i = 1; i < words.size(); i++)
    dependencies.push_back(words[i]);

  dependencyNode node = {target, dependencies};

  return node;
}

map<string, dependencyNode> parseMakefile(string fileName)
{
  map<string, dependencyNode> nodeMap;
  string line;
  ifstream myfile(fileName);
  if (myfile.is_open())
  {
    while (getline(myfile, line))
    {
      auto node = readTargetAndDependencies(line);
      getline(myfile, line);
      string tmp = line;
      node.command = tmp;
      getline(myfile, line);
      nodeMap[node.target] = node;
    }
    myfile.close();
  }

  else
  {
    cout << "Unable to open file";
    exit(1); // terminate with error
  }
  return nodeMap;
}

void skip() {}

time_t getFileChangedTime(string fileName)
{
  struct stat attr;
  stat(fileName.c_str(), &attr);
  return attr.st_mtime;
}

bool dependencyChanged(map<string, dependencyNode> nodeMap, string target)
{
  auto dependencies = nodeMap[target].dependencies;
  auto targetTime = getFileChangedTime(target);

  for (auto dependency : dependencies)
  {
    auto fileChangedTime = getFileChangedTime(dependency);
    if (fileChangedTime > targetTime)
      return true;
  }
  return false;
}

bool fileExists(string fileName)
{
  struct stat buffer;
  return (stat(fileName.c_str(), &buffer) == 0);
}

void issueCommands(dependencyNode node, map<string, dependencyNode> nodeMap)
{
  try
  {
    thread threads[node.dependencies.size()];
    for (int i = 0; i < node.dependencies.size(); i++)
    {
      auto dep = node.dependencies[i];
      if (nodeMap.find(dep) != nodeMap.end())
        threads[i] = thread(issueCommands, nodeMap[dep], nodeMap);
      else
        threads[i] = thread(skip);
    }

    for (auto &th : threads)
      th.join();

    try
    {
      // Check if target file has already been updated
      if (alreadyUpdated.insert(node.target).second)
      {
        // Check if any dependencies have changed
        if (dependencyChanged(nodeMap, node.target) || !fileExists(node.target))
        {
          cout << "Executing build for " << node.target << endl;
          cout << node.command << endl;
          system(node.command.c_str());
        }
        else
          cout << "Skipping build for: " << node.target << endl;
      }
    }
    catch (exception &e)
    {
      cout << "Error issuing system command for " << node.target << endl;
      cout << "Error: " << e.what() << endl;
    }
  }
  catch (exception &e)
  {
    cout << "Error in issueCommands for " << node.target << endl;
    cout << "Error: " << e.what() << endl;
  }
}

void printNodeMap(map<string, dependencyNode> nodeMap)
{
  for (auto &node : nodeMap)
  {
    cout << node.first << ": ";
    printVector(node.second.dependencies);
    cout << node.second.command << endl;
  }
}

int main(int argc, char *argv[])
{
  // Check if filename passed in as argument
  string filename = "Makefile";

  if (argc > 1)
  {
    if (string(argv[1]) != "-f")
    {
      cout << "Invalid argument. Usage: ./myMake -f <filename>" << endl;
      return 1;
    }
    else
      filename = argv[2];
  }

  auto nodeMap = parseMakefile(filename);
  // printNodeMap(nodeMap);
  issueCommands(nodeMap["a.out"], nodeMap);
  return 0;
}