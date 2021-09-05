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
using namespace std;

struct dependencyNode
{
  string target;
  vector<string> dependencies;
  string command;
};

vector<string> split(string str, char delimiter)
{
  stringstream ss(str);
  string tmp;
  vector<string> words;
  while (getline(ss, tmp, delimiter))
  {
    words.push_back(tmp);
  }

  return words;
}

void printVector(vector<string> v)
{
  for (auto i = v.begin(); i != v.end(); ++i)
    cout << *i << ' ';
  cout << '\n';
}

dependencyNode readTargetAndDependencies(string line)
{
  vector<string> words = split(line, ' ');

  string target = words[0];
  // Remove colon from end
  target.pop_back();
  vector<string> dependencies;
  for (int i = 1; i < words.size(); i++)
  {
    dependencies.push_back(words[i]);
  }

  // cout << target << endl;
  // printVector(dependencies);

  dependencyNode node = {target, dependencies};

  return node;
}

map<string, dependencyNode> parseMakefile()
{
  map<string, dependencyNode> nodeMap;
  vector<dependencyNode> dependencyNodes;
  string line;
  ifstream myfile("Makefile");
  if (myfile.is_open())
  {
    while (getline(myfile, line))
    {
      auto node = readTargetAndDependencies(line);
      getline(myfile, line);
      string tmp = line;
      node.command = tmp;
      getline(myfile, line);
      dependencyNodes.push_back(node);
      nodeMap[node.target] = node;
    }
    myfile.close();
  }

  else
    cout << "Unable to open file";
  return nodeMap;
}

void skip()
{
}

time_t getFileChangedTime(string fileName)
{
  struct stat attr;
  stat(fileName.c_str(), &attr);
  return attr.st_mtime;
}

bool getChangedDependencies(map<string, dependencyNode> nodeMap, string target)
{
  auto dependencies = nodeMap[target].dependencies;
  auto targetTime = getFileChangedTime(target);
  // cout << "Target: " << target << " " << targetTime << endl;

  for (auto dependency : dependencies)
  {
    auto fileChangedTime = getFileChangedTime(dependency);
    // cout << "Dependency: " << dependency << " " << fileChangedTime << endl;
    if (fileChangedTime > targetTime)
    {
      // cout << dependency << " older than " << target << endl;
      return true;
    }
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
      {
        threads[i] = thread(issueCommands, nodeMap[dep], nodeMap);
      }
      else
      {
        threads[i] = thread(skip);
      }
    }

    for (auto &th : threads)
    {
      th.join();
    }

    try
    {
      // Check if any dependencies have changed
      if (getChangedDependencies(nodeMap, node.target) || !fileExists(node.target))
      {
        cout << node.command << endl;
        system(node.command.c_str());
      }
      else
      {
        cout << "Skipping " << node.target << endl;
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

int main()
{
  auto nodeMap = parseMakefile();
  // printNodeMap(nodeMap);
  issueCommands(nodeMap["a.out"], nodeMap);
  return 0;
}