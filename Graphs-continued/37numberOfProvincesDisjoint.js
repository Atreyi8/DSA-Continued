/**
 * @param {number} V
 * @param {number[][]} adj
 * @return {number}
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
  numProvinces(V, adj) {
    let ds = new DisjointSet(V);
    //create edges
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (adj[i][j] === 1) {
          ds.unionBySize(i, j);
        }
      }
    }

    let count = 0;
    //console.log("dcdsc",ds.parent)
    for (let i = 0; i < V; i++) {
      // not requirent to do recursive call of findParent
      //   if(ds.findParent(i)===i){
      //       count++
      //   }
      if (ds.parent[i] === i) {
        count++;
      }
    }
    //console.log(count)
    return count;
  }
}
