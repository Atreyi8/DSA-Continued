// Connecting the graph
// MediumAccuracy: 52.79%Submissions: 16K+Points: 4
// Be the comment of the day in POTD and win a GfG T-Shirt!
// Solve right now

// banner
// You are given a graph with n vertices (0 to n-1) and m edges. You can remove one edge from anywhere and add that edge between any two vertices in one operation. Find the minimum number of operations that will be required to connect the graph.
// If it is not possible to connect the graph, return -1.

// Example 1:

// Input:
// n = 4
// m = 3
// Edges = [ [0, 1] , [0, 2] , [1, 2] ]
// Output:
// 1
// Explanation:
// Remove edge between vertices 1 and 2 and add between vertices 1 and 3.

// Example 2:

// Input:
// n = 6
// m = 5
// Edges = [ [0,1] , [0,2] , [0,3] , [1,2] , [1,3] ]
// Output:
// 2
// Explanation:
// Remove edge between (1,2) and(0,3) and add edge between (1,4) and (3,5)

// Your Task:
// You don't need to read or print anything. Your task is to complete the function Solve() which takes an integer n denoting a number of vertices and a 2d matrix denoting the edges of a graph and returns the minimum number of operations to connect a graph.

// Expected Time Complexity: O(m*n)
// Expected Space Complexity: O(m*n)

// Constraints:
// 1<=n<=105
// 0<=m<=102
// 1<=edge[i][0],edge[i][1]<=n-1

//User function Template for javascript
/**
 * @param {number} n
 * @param {number[][]} adj
 * @returns {number}
 */

class DisjointSet {
  constructor(n) {
    // if for 1 based indexing
    this.rank = Array(n + 1).fill(0);
    this.size = Array(n + 1).fill(1);
    this.parent = Array(n + 1)
      .fill()
      .map((_, i) => i);
  }

  findParent(u) {
    if (this.parent[u] === u) return u;
    return (this.parent[u] = this.findParent(this.parent[u]));
  }

  unionByRank(u, v) {
    let pu = this.findParent(u);
    let pv = this.findParent(v);
    //console.log("pu",pu,"pv",pv ,"rank-pu",this.rank[pu],"rank-pv",this.rank[pv])
    if (pu === pv) return false;
    else if (this.rank[pu] < this.rank[pv]) {
      console.log("in 1 if");
      this.parent[pu] = pv;
    } else if (this.rank[pv] < this.rank[pu]) {
      console.log("in 2 if");
      this.parent[pv] = pu;
    } else {
      console.log("here");
      this.parent[pv] = pu;
      this.rank[pu]++;
      console.log("here", this.rank);
    }
  }

  unionBySize(u, v) {
    let pu = this.findParent(u);
    let pv = this.findParent(v);
    if (pu === pv) return false;
    if (this.size[pu] < this.size[pv]) {
      this.parent[pu] = pv;
      this.size[pv] += this.size[pu];
    }
    //works for both equal and less case
    else {
      this.parent[pv] = pu;
      this.size[pu] += this.size[pv];
    }
  }
}

class Solution {
  //Function to solve the given problem.
  Solve(n, adj) {
    let ds = new DisjointSet(n);
    let countExtraEdges = 0;
    for (let i = 0; i < adj.length; i++) {
      let [u, v] = adj[i];
      let pu = ds.findParent(u);
      let pv = ds.findParent(v);
      if (pu === pv) {
        countExtraEdges++;
      } else {
        ds.unionBySize(u, v);
      }
    }

    let noOfComponents = 0;
    for (let i = 0; i < n; i++) {
      if (ds.parent[i] === i) {
        noOfComponents++;
      }
    }

    if (countExtraEdges >= noOfComponents - 1) return noOfComponents - 1;
    return -1;

    //your code here
  }
}
