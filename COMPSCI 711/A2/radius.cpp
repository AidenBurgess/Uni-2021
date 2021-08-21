#include <omp.h>
#include <iostream>
#include <vector>
#include <string>
#include <iterator>
#include <sstream>
#include <list>
#include <algorithm>

using namespace std;

// Code for Graph and BFS implementation from: https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/
// The code has been modified to return the depth and to detect if the graph is connected
// Code for timing funcTime from: https://stackoverflow.com/questions/22387586/measuring-execution-time-of-a-function-in-c (jahid & Zitrax)

// This class represents a directed graph using
// adjacency list representation
class Graph
{

  // Pointer to an array containing adjacency
  // lists
  list<int> *adj;

public:
  int V; // No. of vertices

  Graph(int V); // Constructor

  // function to add an edge to graph
  void addEdge(int v, int w);

  // BFS traversal from a given source s, returns the depth
  int BFS(int s);
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

struct element
{
  int node;
  int depth;
};

int Graph::BFS(int s)
{
  // Mark all the vertices as not visited
  bool *visited = new bool[V];
  for (int i = 0; i < V; i++)
    visited[i] = false;

  // Create a queue for BFS
  list<element> queue;

  // Mark the current node as visited and enqueue it
  visited[s] = true;
  queue.push_back({s, 0});

  // 'i' will be used to get all adjacent
  // vertices of a vertex
  list<int>::iterator i;

  element currentNode;
  while (!queue.empty())
  {
    // Dequeue a vertex from queue and print it
    currentNode = queue.front();
    queue.pop_front();

    // Get all adjacent vertices of the dequeued
    // vertex s. If a adjacent has not been visited,
    // then mark it visited and enqueue it
    for (i = adj[currentNode.node].begin(); i != adj[currentNode.node].end(); ++i)
    {
      if (!visited[*i])
      {
        visited[*i] = true;
        queue.push_back({*i, currentNode.depth + 1});
      }
    }
  }

  for (int i = 0; i < V; i++)
  {
    if (visited[i] == false)
    {
      throw "Not strongly connected!";
    }
  }
  return currentNode.depth;
}

Graph readGraph(int numNodes)
{
  vector<vector<int>> adjacencyList;
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
      // cout << node << *col << endl;
      g.addEdge(node, *col);
    }
    ++node;
  }

  return g;
}

void findRadiusSequential(Graph graph, int numNodes)
{
  vector<int> eccs(numNodes, 0);
  bool notConnectedFlag = false;

  for (int i = 0; i < graph.V; ++i)
  {
    try
    {
      int ecc = graph.BFS(i);
      eccs[i] = ecc;
    }
    catch (const char *msg)
    {
      notConnectedFlag = true;
      break;
    }
  }
  if (notConnectedFlag)
  {
    cout << "None" << endl;
  }
  else
  {
    cout << *min_element(eccs.begin(), eccs.end()) << endl;
  }
}

void findRadiusParallel(Graph graph, int numNodes)
{
  vector<int> eccs(numNodes, 0);
  bool notConnectedFlag = false;

#pragma omp parallel for
  for (int i = 0; i < graph.V; ++i)
  {
    try
    {
      int ecc = graph.BFS(i);
      eccs[i] = ecc;
    }
    catch (const char *msg)
    {
      notConnectedFlag = true;
    }
  }
  if (notConnectedFlag)
  {
    cout << "None" << endl;
  }
  else
  {
    cout << *min_element(eccs.begin(), eccs.end()) << endl;
  }
}

int readNumNodes()
{
  int numNodes;
  cin >> numNodes;
  cin.ignore();

  return numNodes;
}

#include <chrono>
#include <utility>

typedef std::chrono::high_resolution_clock::time_point TimeVar;

#define duration(a) std::chrono::duration_cast<std::chrono::nanoseconds>(a).count()
#define timeNow() std::chrono::high_resolution_clock::now()

template <typename F, typename... Args>
double funcTime(F func, Args &&...args)
{
  TimeVar t1 = timeNow();
  func(std::forward<Args>(args)...);
  return duration(timeNow() - t1);
}

int main()
{

  while (true)
  {
    int numNodes = readNumNodes();
    if (numNodes == 0)
      break;

    Graph graph = readGraph(numNodes);
    double timeTaken = funcTime(findRadiusParallel, graph, numNodes);
    // double timeTaken = funcTime(findRadiusSequential, graph, numNodes);
    cout << endl
         << "Time taken: " << timeTaken << endl;
  }
}