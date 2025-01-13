// Given a weighted, undirected, and connected graph with V vertices and E edges, your task is to find the sum of the weights of the edges in the Minimum Spanning Tree (MST) of the graph. The graph is represented by an adjacency list, where each element adj[i] is a vector containing pairs of integers. Each pair represents an edge, with the first integer denoting the endpoint of the edge and the second integer denoting the weight of the edge.

// Example 1:

// Input:
// 3 3
// 0 1 5
// 1 2 3
// 0 2 1

// Output:
// 4
// Explanation:

// The Spanning Tree resulting in a weight
// of 4 is shown above.
// Example 2:

// Input:
// 2 1
// 0 1 5

// Output:
// 5
// Explanation:
// Only one Spanning Tree is possible
// which has a weight of 5.

// Your task:
// Since this is a functional problem you don't have to worry about input, you just have to complete the function spanningTree() which takes a number of vertices V and an adjacency list adj as input parameters and returns an integer denoting the sum of weights of the edges of the Minimum Spanning Tree. Here adj[i] contains vectors of size 2, where the first integer in that vector denotes the end of the edge and the second integer denotes the edge weight.

// Expected Time Complexity: O(ElogV).
// Expected Auxiliary Space: O(V2).

// Constraints:
// 2 ≤ V ≤ 1000
// V-1 ≤ E ≤ (V*(V-1))/2
// 1 ≤ w ≤ 1000
// The graph is connected and doesn't contain self-loops & multiple edges.

//Input = 3, adj = [
//     [ [ 1, 5 ], [ 2, 1 ] ],
//     [ [ 0, 5 ], [ 2, 3 ] ],
//     [ [ 1, 3 ], [ 0, 1 ] ]
//   ]

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    let root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return root;
  }

  top() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  heapifyUp(index) {
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][0] < this.heap[index][0]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  heapifyDown(index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let smallest = index;

    if (left < this.heap.length && this.heap[left][0] < this.heap[smallest][0])
      smallest = left;
    if (
      right < this.heap.length &&
      this.heap[right][0] < this.heap[smallest][0]
    )
      smallest = right;

    if (smallest !== index) {
      [this.heap[smallest], this.heap[index]] = [
        this.heap[index],
        this.heap[smallest],
      ];
      this.heapifyDown(smallest);
    }
  }
}

class Solution {
  spanningTree(v, adj) {
    console.log(v, adj);
    let visited = Array(v).fill(0);
    let mstEdges = [];
    let minHeap = new MinHeap();
    let sum = 0;
    //wt,node,parent
    minHeap.push([0, 0, -1]);
    while (minHeap.size() > 0) {
      let [wt, node, parent] = minHeap.pop();
      if (visited[node]) {
        continue;
      }
      visited[node] = 1;
      sum = sum + wt;
      if (parent !== -1) {
        mstEdges.push([parent, node]);
      }
      for (let neighbor of adj[node]) {
        //console.log(node,neighbor)
        let [neighborNode, neighborWeight] = neighbor;
        if (!visited[neighborNode]) {
          minHeap.push([neighborWeight, neighborNode, node]);
        }
      }
    }
    console.log(sum, mstEdges);
    return sum;

    // code here
  }
}

let obj = new Solution();
obj.spanningTree(3, [
  [
    [1, 5],
    [2, 1],
  ],
  [
    [0, 5],
    [2, 3],
  ],
  [
    [1, 3],
    [0, 1],
  ],
]);
