# COMPSCI 711 - Assignment 1

## 1.

### (a)

|         | Diameter | Arc Connectivity | Bisection width |
| ------- | -------- | ---------------- | --------------- |
| Graph 1 | 2        | 2                | 4               |
| Graph 2 | 3        | 2                | 4               |
|         |          |                  |                 |

### (b)

[COMPSCI 711 (3 unread) (piazza.com)](https://piazza.com/class/kr2ysgz46du125?cid=9)

Dilation: Maximum #lines an edge is mapped to

Congestion: Maximum #edges mapped on a single link

Want to minimise dilation



Original vertices: a,b,c,d,e,f

New vertices: 0,1,2,3,4,5,6,7



<img src="C:\Users\aiden\AppData\Roaming\Typora\typora-user-images\image-20210810110311317.png" alt="image-20210810110311317" style="zoom:80%;" />

## 2.

### Counter example for property 2

$s = [5,5,5,5]$

$s_1 = [5,5]$

$s_2 = [5,5]$

By observation, not all elements in $s_1$ are smaller than the elements of $s_2$​.

## 3.

<img src="C:\Users\aiden\AppData\Roaming\Typora\typora-user-images\image-20210810183339908.png" alt="image-20210810183339908" style="zoom:67%;" />



## 5.

### (a)

Run Luby's Maximal Independent Set Algorithm to retrieve a maximally independent set $W$. The set $W'=V-W$ is a minimal vertex cover.

Proof by contradiction:

Let $G = (V,E)$ be a graph.

Let $W$​​​ be a maximally independent set of $G$.

Let $N(W)$ be the neighbours of W. 

$N(W) \cap V \neq \empty$​ by definition.

[graph theory - Relationship between Maximal Independent Set and Minimum Vertex Cover - Mathematics Stack Exchange](https://math.stackexchange.com/questions/1758900/relationship-between-maximal-independent-set-and-minimum-vertex-cover)

### (b)

Your goal is to remove all cycles from the graph, so while there is a cycle in the graph do a process similar to Luby's algorithm and do some sort of a removal from the graph (what is required to be removed? what makes a cycle?). If there are still cycles in the graph then your algorithm should keep removing, otherwise it should return.



Remember that your algorithm must terminate when it has found the **also** **minimum** feedback vertex set (even though you are looking for **minimal** sized sets) (G−V′′G - V'' must contain atleast one cycle). You should be finding this as a natural property in the algorithm that you write and shouldn't require and special logic



I would suggest looking at your 5a answer again because the two algorithms are very similar



While there exists a cycle in the graph

Assign random numbers to each vertex in the cycle

Vertices whose random number are smaller than all other vertices in the cycle are added to the MFVS.

Return MVFS
