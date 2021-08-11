# COMPSCI 711 - Assignment 1

## 1.

### (a)

|         | Diameter | Arc Connectivity | Bisection width |
| ------- | -------- | ---------------- | --------------- |
| Graph 1 | 2        | 2                | 4               |
| Graph 2 | 3        | 2                | 4               |
|         |          |                  |                 |

### (b) 

<img src="C:\Users\aiden\AppData\Roaming\Typora\typora-user-images\image-20210811224419986.png" alt="image-20210811224419986" style="zoom:80%;" />

Dilation: 2

Congestion: 1

## 2. 

Note: This proof is taken from p. 395-396, Introduction to Parallel Computing, Second Edition

First, if the sequence s is a shifted bitonic sequence, we shift it so that s is monotonically increasing and then monotonically decreasing.

The sequences $s_1$, and $s_2$, resulting from the bitonic split are as follows

$s_1 = [min(a_0, a_{n/2}),...,min(a_{n/2-1},a_{n-1})]$

$s_2 = [max(a_0, a_{n/2}),...,max(a_{n/2-1},a_{n-1})]$

### (1)

In $s_1$​, there is an element $b_i = min(a_i, a_{n/2+i})$ such that all the elements before $b_i$​ are from the increasing part of the original sequence and all the elements after $b_i$ are from the decreasing part. 

In sequence $s_2$, the element $b_i'=max(a_i,a_{n/2+i})$ is such that all the elements before $b_i'$ are from the decreasing part of the original sequence and all the elements after $b_i'$ are from the increasing part. Thus, the sequences $s_1$ and $s_2$​ are bitonic sequences. 

### (2)

$b_i$ is greater than or equal to all elements of $s_1$, $b_i'$ is less than or equal to all elements of $s_2$, and $b_i'$ is greater than or equal to $b_i$​. Therefore, all elements of $s_1$ are smaller than or equal to $s_2$. Note that property 2 is strictly smaller only if the $s$ contains unique elements.

## 3. 

<img src="C:\Users\aiden\AppData\Roaming\Typora\typora-user-images\image-20210810183339908.png" alt="image-20210810183339908" style="zoom:67%;" />

Source-partitioned Dijkstra's can only utilise 6 processes at a time. This is because the number of processes is restricted by the number of nodes in the graph. One process performs Dijkstra's single-source algorithm for each node. Therefore, there is no inter-process communication so no communication overhead. The parallel run-time when p < n is $O(n^2)$. However, as can be seen in the example the isoefficiency is $O(n^3)$. This algorithm does not scale well (performs about as well as non-parallel) as the number of processors scale.​

Source-parallel Dijkstra's can efficiently utilise all 24 processors. It has 4 partitions, each with 6 processes each. It is significantly more performant than source-partitioned Dijkstra's algorithm. In contrast to source-partitioned Dijkstra's, there is communication overhead of $O(n\log{p})$​​. ​The isoefficiency of this formulation is $O((p\log{p})^{1.5})$​



## 4. 

Note: Algorithm derived from slide 45 of *The Evolution of P Systems, to Hyperday P Systems, to P Modules* by Michael J.Dinneen, Yun-Bum Kim and Radu Nicolescu

The following rules assume that the clocks for processors are the same frequency, and are synchronised.

For state $s_0$:

1. $s_0 \rightarrow s_1ac_{\uparrow}, \alpha=min,\beta=repl$

For state $s_1$:

1. $s_1ac \rightarrow s_1hac_{\uparrow}, \alpha=max,\beta=repl$​
2. $s_1c \rightarrow s_1, \alpha=max$​
3. $s_1a \rightarrow s_2, \alpha=min$

At the start of the process, the nodes are empty. Then they all transition to state 1 and send a message to their parents. The parents collect these messages to determine whether they have a child. Note that $a$ represents if a node is still actively processing. If a node has no children after this first stage then it will just have $a$ as its state. By rule (3) it will then transition to an inactive state. $s_2$ is the inactive state of the system. 

Otherwise, the node does have a child (or many), in which case it increments it's height (1). If there are multiple children, this information is discarded as it is not useful via (2). When (1) occurs, it also sends a message to its parents. This is to inform them that they need to increment their height.

This will loop until all nodes end in state $s_2$​. The number of $h$​'s is the height of the node. There is a side-effect which is that all other nodes will also store their height.

## 5.

### (a) NOT DONE

Run Luby's Maximal Independent Set Algorithm to retrieve a maximally independent set $W$. The set $W'=V-W$ is a minimal vertex cover.

Proof by contradiction:

Let $G = (V,E)$ be a graph.

Let $W$​​​ be a maximally independent set of $G$.

Let $W'=V-W$

There are no edges between any vertices in W.

As W is a MIS, adding any vertex from W' does not give an independent set. Therefore, there is an edge between all vertices in W' and at least one vertex in W.

In fact,  

[graph theory - Relationship between Maximal Independent Set and Minimum Vertex Cover - Mathematics Stack Exchange](https://math.stackexchange.com/questions/1758900/relationship-between-maximal-independent-set-and-minimum-vertex-cover)

### (b)

```pseudocode
FUNCTION MinimalFeedbackVertexSet(G)
    set MFVS = {}

    while there exists a cycle in G:
        Assign random numbers to each vertex in the cycle
        set V = Vertex with smallest number in the cycle
        
        MVFS.add(V)
        set G = G - V
    end while

    return MVFS
end FUNCTION
```

​	
