// You are given a n,m which means the row and column of the 2D matrix and an array of  size k denoting the number of operations. Matrix elements is 0 if there is water or 1 if there is land. Originally, the 2D matrix is all 0 which means there is no land in the matrix. The array has k operator(s) and each operator has two integer A[i][0], A[i][1] means that you can change the cell matrix[A[i][0]][A[i][1]] from sea to island. Return how many island are there in the matrix after each operation.You need to return an array of size k.
// Note : An island means group of 1s such that they share a common side.

// Example 1:

// Input: n = 4
// m = 5
// k = 4
// A = {{1,1},{0,1},{3,3},{3,4}}

// Output: 1 1 2 2
// Explanation:
// 0.  00000
//     00000
//     00000
//     00000
// 1.  00000
//     01000
//     00000
//     00000
// 2.  01000
//     01000
//     00000
//     00000
// 3.  01000
//     01000
//     00000
//     00010
// 4.  01000
//     01000
//     00000
//     00011

// Example 2:

// Input: n = 4
// m = 5
// k = 4
// A = {{0,0},{1,1},{2,2},{3,3}}

// Output: 1 2 3 4
// Explanation:
// 0.  00000
//     00000
//     00000
//     00000
// 1.  10000
//     00000
//     00000
//     00000
// 2.  10000
//     01000
//     00000
//     00000
// 3.  10000
//     01000
//     00100
//     00000
// 4.  10000
//     01000
//     00100
//     00010

// Your Task:
// You don't need to read or print anything. Your task is to complete the function numOfIslands() which takes an integer n denoting no. of rows in the matrix, an integer m denoting the number of columns in the matrix and a 2D array of size k denoting  the number of operators.

// Expected Time Complexity: O(m * n)
// Expected Auxiliary Space: O(m * n)

// Constraints:

// 1 <= n,m <= 100
// 1 <= k <= 1000

//{ Driver Code Starts
//Initial Template for javascript

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
  //Function to count the number of islands.
  numOfIslands(rows, cols, operators) {
    let visited = Array.from({ length: rows }, () => Array(cols).fill(0));
    console.log(visited);
    let ds = new DisjointSet(rows * cols);
    let res = [];
    let count = 0;
    let drow = [0, -1, 0, 1];
    let dcol = [1, 0, -1, 0];
    for (let i = 0; i < operators.length; i++) {
      let [u, v] = operators[i];
      if (visited[u][v] === 1) {
        res.push(count);
        continue;
      }
      visited[u][v] = 1;
      count++;
      for (let j = 0; j < 4; j++) {
        let newRow = u + drow[j];
        let newCol = v + dcol[j];
        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          visited[newRow][newCol] === 1
        ) {
          let node = u * cols + v;
          let adjNode = newRow * cols + newCol;
          if (ds.findParent(node) !== ds.findParent(adjNode)) {
            ds.unionBySize(node, adjNode);
            count--;
          }
        }
      }
      res.push(count);
    }
    console.log(res);
    return res;
  }
}

let sol = new Solution();
sol.numOfIslands(4, 5, [
  [1, 1],
  [0, 1],
  [3, 3],
  [3, 4],
]);
