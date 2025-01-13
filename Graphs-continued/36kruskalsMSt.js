/**
 * @param {number[][]} adj
 * @param {number} v
 * @param {number} e
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
  spanningTree(v, adj) {
    //Kruskal's algo need edges
    let edges = [];
    for (let i = 0; i < adj.length; i++) {
      for (let [neighBorOfNode, neighborWt] of adj[i]) {
        // i is node that is u=i , v = neighBorOfNode
        edges.push([neighborWt, i, neighBorOfNode]);
      }
    }
    //console.log("edges",edges)
    //Step 1 sort edges by weight
    edges.sort((a, b) => a[0] - b[0]);
    //console.log("final",edges)
    let mstSum = 0;
    // Step 2 Join edges by disjoint set
    let ds = new DisjointSet(v);
    for (let i = 0; i < edges.length; i++) {
      let [wt, u, v] = edges[i];
      let pu = ds.findParent(u);
      let pv = ds.findParent(v);
      if (pu !== pv) {
        ds.unionBySize(u, v);
        mstSum += wt;
      }
    }
    //console.log("mstSum",mstSum)
    return mstSum;
  }
}
