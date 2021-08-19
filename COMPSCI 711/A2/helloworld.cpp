#include <iostream>
#include <vector>
#include <string>
#include <iterator>
#include <sstream>

using namespace std;

void readGraph()
{
  int numNodes;
  vector<vector<int>> adjacencyList;

  for (int nodeIdx = 0; nodeIdx < numNodes; nodeIdx++)
  {
    cout << nodeIdx << endl;
    string rawInput;
    getline(cin, rawInput);
    istringstream bufferInput(rawInput);
    adjacencyList.push_back(vector<int>{std::istream_iterator<int>{bufferInput}, std::istream_iterator<int>{}});
  }

  for (const auto &row : adjacencyList)
  {
    for (const auto &s : row)
      std::cout << s << ' ';
    std::cout << std::endl;
  }
}

int main()
{
  vector<string> msg{"Hello", "C++", "World", "from", "VS Code", "and the C++ extension!"};

  for (const string &word : msg)
  {
    cout << word << " ";
  }
  cout << endl;

  readGraph();
}