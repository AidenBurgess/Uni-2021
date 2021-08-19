#include <iostream>
#include <vector>
#include <string>
#include <iterator>
#include <sstream>
#include <list>

using namespace std;

// This class represents a directed graph using
// adjacency list representation
class Graph
{
  int V; // No. of vertices

  // Pointer to an array containing adjacency
  // lists
  list<int> *adj;

public:
  Graph(int V); // Constructor

  // function to add an edge to graph
  void addEdge(int v, int w);

  // prints BFS traversal from a given source s
  void BFS(int s);
};

Graph::Graph(int V)
{
  this->V = V;
  adj = new list<int>[V];
}

void Graph::addEdge(int v, int w)
{
  adj[v].push_back(w); // Add w to v’s list.
}

void Graph::BFS(int s)
{
  // Mark all the vertices as not visited
  bool *visited = new bool[V];
  for (int i = 0; i < V; i++)
    visited[i] = false;

  // Create a queue for BFS
  list<int> queue;

  // Mark the current node as visited and enqueue it
  visited[s] = true;
  queue.push_back(s);

  // 'i' will be used to get all adjacent
  // vertices of a vertex
  list<int>::iterator i;

  while (!queue.empty())
  {
    // Dequeue a vertex from queue and print it
    s = queue.front();
    cout << s << " ";
    queue.pop_front();

    // Get all adjacent vertices of the dequeued
    // vertex s. If a adjacent has not been visited,
    // then mark it visited and enqueue it
    for (i = adj[s].begin(); i != adj[s].end(); ++i)
    {
      if (!visited[*i])
      {
        visited[*i] = true;
        queue.push_back(*i);
      }
    }
  }
}

vector<vector<int>> readGraph()
{
  int numNodes;
  vector<vector<int>> adjacencyList;

  // Read in number of nodes
  cin >> numNodes;
  cin.ignore();
  Graph g(numNodes);

  // Read in adjacency list
  for (int nodeIdx = 0; nodeIdx < numNodes; nodeIdx++)
  {
    string rawInput;
    getline(cin, rawInput);
    istringstream bufferInput(rawInput);
    adjacencyList.push_back(vector<int>{std::istream_iterator<int>{bufferInput}, std::istream_iterator<int>{}});
  }

  vector<vector<int>>::iterator row;
  vector<int>::iterator col;

  int node = 0;
  for (row = adjacencyList.begin(); row != adjacencyList.end(); ++row)
  {
    for (col = row->begin(); col != row->end(); ++col)
    {
      cout << node << *col << endl;
      g.addEdge(node, *col);
    }
    ++node;
  }

  cout << "Following is Breadth First Traversal "
       << "(starting from vertex 0) \n";
  g.BFS(0);

  return adjacencyList;
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