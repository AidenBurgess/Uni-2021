## COMPSCI 711 - Parallel Computing Lecture 2



First ass due 7th August



Evaluating parallel systems (metrics)

Diameter, connectivity, bisection width, bisection bandwidth, cost



## Network topologies

### Bus based networks

### Crossbar networks

V high cost O($p^2$)

Looks like a grid, with x axis being memory banks and processing elements being y axis

### Multistage interconnection networks

Logarithmic number of stages for #processors

Cost is much lower O($plogn$)

### Complete and star-connected networks

Cost of complete graph is too high

Star network is like master/slave model (1 in center that is connected to all other processors)

Master process typically much faster to take the increased load

### Cartesian Topologies

Linear arrays or with/without wraparound links

Can have 2d, or 3d meshes also with/without wraparounds

Grids have the problem where not every node is the same thing (edge nodes and corner nodes have diff number of connections). This can be solved by using wraparound (2-D torus)

### Hypercubes

To generate the next hypercube, copy and then connect the same vertices together.

$2^n$ bit strings, every nodes in a hypercube has n neighbours, can move to a neighbour by toggling a bit

### Trees

As you go up the tree, the bandwidth increases as more communication is performed.

Leaf nodes are processing nodes. Internal nodes are switching nodes.

Routing is easy, however there is no redundancy.



Hypercube is typically a good overall choice, balances the metrics. It is symmetric.

Star is not symmetric, the centre node is special and connects to every other.

Diameter is the longest shortest path in the graph 



Hybercube $Q_n$ can be repr as a Aylet graph using the Abelian group $(Z_2)^n$ with the generators 1 in any dimension

Degree of Cayley graph is # elements in generator set.

### Another metric - Broadcast time

Send a message to the entire network, restricted to call one neighbour at a time. Best case at step i, there are 2x the number of nodes connected as at step i-1 (i.e. each node communicates to a new uncommunicated node). Ideal time for n nodes is logn. Hypercube broadcasts in logn time. At each step i, broadcast to bit i flipped.



A small twist is the gossiping problem where each node has their own information that needs to be spread to all other nodes. This is as opposed to broadcasting where communication is monodirectional



## Cache Coherence in Shared Memory Systems

What happens when two processors clash or try to write into the same memory?

To deal with inconsistency: invalidate or update

### Invalidate/Update protocols

Every processor has local cache and memory

After updating a processors memory, invalidate the same object for other processors. Then update the values in other processors

Clean/dirty bit can be used 

not needing to talk too much about this, focus on topology embeddings instead

### Topology Embeddings

Need another process to map physical changes to logical (embeddings)

Logical embedding is direct subgraph of physical graph

Logical structure => physical structure

Embedding quality metrics

- dilation - maximum number of lines an edge is mapped to 
- congestion - maximum number of edges mapped on a single link

Meshes can easily be mapped onto hypbercubes

Next time we start on algos.



