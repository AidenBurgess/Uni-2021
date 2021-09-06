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

struct dependencyNode
{
  string target;
  vector<string> dependencies;
  string command;
};

struct nodeGraph
{
  map<string, dependencyNode> nodeMap;
  dependencyNode startNode;
};

// ================= ISSUING COMMANDS =================
void skip() {}

time_t getFileChangedTime(string fileName)
{
  struct stat attr;
  stat(fileName.c_str(), &attr);
  return attr.st_ctime;
}

bool fileExists(string fileName)
{
  struct stat attr;
  return stat(fileName.c_str(), &attr) == 0;
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
    // Wait for all threads to finish
    for (auto &th : threads)
      th.join();

    try
    {
      // Check if any dependencies have changed
      if (dependencyChanged(nodeMap, node.target) || !fileExists(node.target))
      {
        system(node.command.c_str());
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

// ================= PARSE =================
vector<string> split(string str, char delimiter)
{
  stringstream ss(str);
  string tmp;
  vector<string> words;
  while (getline(ss, tmp, delimiter))
    words.push_back(tmp);

  return words;
}

dependencyNode readTargetAndDependencies(string line)
{
  vector<string> words = split(line, ' ');

  string target = words[0];
  // Remove colon from end
  target.pop_back();
  // Add the rest of the line to dependencies
  vector<string> dependencies;
  for (int i = 1; i < words.size(); i++)
    dependencies.push_back(words[i]);

  return {target, dependencies};
}

nodeGraph parseMakefile(string fileName)
{
  map<string, dependencyNode> nodeMap;
  string firstTarget;
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
      if (firstTarget.empty())
        firstTarget = node.target;
    }
    myfile.close();
  }

  else
  {
    cout << "Unable to open file";
    exit(1); // terminate with error
  }

  return {nodeMap, nodeMap[firstTarget]};
}

// ================= MAIN =================

string getFileName(int argc, char *argv[])
{
  string filename = "Makefile";

  // Set filename to command line argument if it exists
  if (argc > 1)
  {
    if (string(argv[1]) != "-f")
    {
      cout << "Invalid argument. Usage: ./myMake -f <filename>" << endl;
      exit(1); // terminate with error
    }
    else
      filename = argv[2];
  }

  return filename;
}

int main(int argc, char *argv[])
{
  string filename = getFileName(argc, argv);

  auto nodeGraph = parseMakefile(filename);
  issueCommands(nodeGraph.startNode, nodeGraph.nodeMap);
  return 0;
}
