// 1976. Number of Ways to Arrive at Destination
// Solved
// Medium
// Topics
// Companies
// Hint
// You are in a city that consists of n intersections numbered from 0 to n - 1 with bi-directional roads between some intersections. The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections.

// You are given an integer n and a 2D integer array roads where roads[i] = [ui, vi, timei] means that there is a road between intersections ui and vi that takes timei minutes to travel. You want to know in how many ways you can travel from intersection 0 to intersection n - 1 in the shortest amount of time.

// Return the number of ways you can arrive at your destination in the shortest amount of time. Since the answer may be large, return it modulo 109 + 7.

// Example 1:

// Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
// Output: 4
// Explanation: The shortest amount of time it takes to go from intersection 0 to intersection 6 is 7 minutes.
// The four ways to get there in 7 minutes are:
// - 0 ➝ 6
// - 0 ➝ 4 ➝ 6
// - 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
// - 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6
// Example 2:

// Input: n = 2, roads = [[1,0,10]]
// Output: 1
// Explanation: There is only one way to go from intersection 0 to intersection 1, and it takes 10 minutes.

// Constraints:

// 1 <= n <= 200
// n - 1 <= roads.length <= n * (n - 1) / 2
// roads[i].length == 3
// 0 <= ui, vi <= n - 1
// 1 <= timei <= 109
// ui != vi
// There is at most one road connecting any two intersections.
// You can reach any intersection from any other intersection.

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

/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var countPaths = function (n, roads) {
  let adj = Array(n)
    .fill()
    .map(() => []);
  for (let i = 0; i < roads.length; i++) {
    let u = roads[i][0];
    let v = roads[i][1];
    let t = roads[i][2];
    adj[u].push([v, t]);
    adj[v].push([u, t]);
  }

  console.log(adj);
  let distance = Array(n).fill(Infinity);
  let ways = Array(n).fill(0);
  distance[0] = 0;
  ways[0] = 1;
  let minHeap = new MinHeap();
  //dist,node
  minHeap.push([0, 0]);

  while (minHeap.size() > 0) {
    let [dist, node] = minHeap.pop();
    //   console.log("here@@@@",distance,ways)
    for (let [neighborNode, distToNeighbor] of adj[node]) {
      // let neighborNode = neighbor[0]
      // let distToNeighbor = neighbor[1]
      // console.log("neighbor",neighborNode,"distToNeighbor",distToNeighbor,"node",node,"dist",dist,minHeap,"distanceneighbor",distance[neighborNode],dist+distToNeighbor)
      if (dist + distToNeighbor < distance[neighborNode]) {
        distance[neighborNode] = dist + distToNeighbor;
        ways[neighborNode] = ways[node];
        minHeap.push([distance[neighborNode], neighborNode]);
      } else if (dist + distToNeighbor === distance[neighborNode]) {
        ways[neighborNode] = (ways[neighborNode] + ways[node]) % 1000000007;
      }
    }
    // console.log("############,node,",node,minHeap)
  }
  console.log(ways, distance);
  return ways[n - 1];
};

countPaths(7, [
  [0, 6, 7],
  [0, 1, 2],
  [1, 2, 3],
  [1, 3, 3],
  [6, 3, 3],
  [3, 5, 1],
  [6, 5, 1],
  [2, 5, 1],
  [0, 4, 5],
  [4, 6, 2],
]);
