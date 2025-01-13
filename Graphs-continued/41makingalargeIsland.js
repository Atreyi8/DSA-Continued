// 827. Making A Large Island
// Solved
// Hard
// Topics
// Companies
// You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.

// Return the size of the largest island in grid after applying this operation.

// An island is a 4-directionally connected group of 1s.

// Example 1:

// Input: grid = [[1,0],[0,1]]
// Output: 3
// Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
// Example 2:

// Input: grid = [[1,1],[1,0]]
// Output: 4
// Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.
// Example 3:

// Input: grid = [[1,1],[1,1]]
// Output: 4
// Explanation: Can't change any 0 to 1, only one island with area = 4.

// Constraints:

// n == grid.length
// n == grid[i].length
// 1 <= n <= 500
// grid[i][j] is either 0 or 1.

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
var largestIsland = function (grid) {
  let n = grid.length;
  let ds = new DisjointSet(n * n);
  let drow = [-1, 0, 1, 0];
  let dcol = [0, 1, 0, -1];
  //Step1 -connecting all 1 components
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 0) {
        continue;
      }
      for (let i = 0; i < 4; i++) {
        let nrow = r + drow[i];
        let ncol = c + dcol[i];
        //console.log(nrow,ncol,r,c)
        if (
          nrow >= 0 &&
          ncol >= 0 &&
          nrow < n &&
          ncol < n &&
          grid[nrow][ncol] === 1
        ) {
          let node = r * n + c;
          let adjNode = nrow * n + ncol;
          ds.unionBySize(node, adjNode);
        }
      }
    }
  }
  console.log(ds.parent, ds.size);
  //Step 2 - try converting zero to 1

  let max = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        continue;
      }
      //for 0
      let set = new Set();
      for (let i = 0; i < 4; i++) {
        let nrow = r + drow[i];
        let ncol = c + dcol[i];
        if (
          nrow >= 0 &&
          ncol >= 0 &&
          nrow < n &&
          ncol < n &&
          grid[nrow][ncol] === 1
        ) {
          let adjNode = nrow * n + ncol;
          let parentOfadjNode = ds.findParent(adjNode);
          set.add(parentOfadjNode);
        }
      }
      let size = 0;
      for (let node of set) {
        size = size + ds.size[node];
      }
      if (max < size + 1) {
        max = size + 1;
      }
    }
  }
  console.log(max);
  //for 1111
  for (let i = 0; i < n * n; i++) {
    max = Math.max(max, ds.size[ds.findParent(i)]);
  }
  return max;
};
