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

let ds = new DisjointSet(7);
// console.log(ds.rank)
// console.log(ds.parent)
ds.unionByRank(1, 2);
// console.log("1",ds.rank,ds.parent)
ds.unionByRank(2, 3);
// console.log("2",ds.rank,ds.parent)
ds.unionByRank(4, 5);
// console.log("3",ds.rank,ds.parent)
ds.unionByRank(6, 7);
// console.log("4",ds.rank,ds.parent)
// console.log("---------")
ds.unionByRank(5, 6);
// console.log("5",ds.rank,ds.parent)
// console.log("here---",ds.findParent(7))
if (ds.findParent(7) === ds.findParent(3)) {
  console.log("before true");
} else {
  console.log("before false");
}
ds.unionByRank(3, 7);
console.log(ds.rank, ds.parent);
if (ds.findParent(7) === ds.findParent(3)) {
  console.log("after true");
} else {
  console.log("after false");
}
console.log(ds.findParent(3));
