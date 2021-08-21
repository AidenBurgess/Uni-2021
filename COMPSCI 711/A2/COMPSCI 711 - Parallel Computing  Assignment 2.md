# COMPSCI 711 - Parallel Computing | Assignment 2

## Algorithm

The algorithm chosen to solve the problem utilises BFS to find the eccentricity of a single node, then repeats this for each node in the graph. The minimum of these eccentricities is calculated to be the radius of the graph. It also checks for connectedness, as this is not guaranteed. As it performs BFS, it marks each node as visited, if not all nodes are marked visited at the end of BFS execution, then an exception is thrown. 

### Sequential Algorithm

```c++
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
```



### Parallel Algorithm

```c++
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
```



## Test Data

### Test Cases

- #1-3: The three examples in the assignment brief
- #4: Randomly generated 100 node, 4924 edge, Erdos-Renyi graph
- #5: Randomly generated 300 node, 44822 edge, Erdos - Renyi graph

### Reasoning

Test cases #1-3 were chosen to test the correctness of the algorithm, as the expected answer was known for these three. Therefore, these were utilised throughout the development phase to periodically test the algorithm.

Test cases #4 and #5 were needed after the testing phase for performance results, as the original graphs are relatively small (3-5 nodes), and were being processed too quickly. Therefore, graphs test cases 4 and 5 are significantly larger in both number of nodes and edges.



The large graphs were generated using the networkx package for python. `n ` can be changed to differ the size of the graph generated.

```python
n = 300
G = nx.erdos_renyi_graph(n, 0.5, seed=123, directed=True)
for line in nx.generate_adjlist(G):
    print(line)
```

### Testing Methodology

The tests were ran manually by running the program. The timing was taken using `chrono::high_resolution_clock` which measures time in "the smallest tick period provided by the implementation." 

## Performance Results

See if expected running times do show the results of parallelism

Compare Sequential results

![image-20210820095605269](C:\Users\aiden\AppData\Roaming\Typora\typora-user-images\image-20210820095605269.png)

| Algorithm  |      |      |
| ---------- | ---- | ---- |
| Sequential |      |      |
| Parallel   |      |      |
|            |      |      |

Thread Overhead

