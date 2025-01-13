class DisjointSet {
  constructor(n) {
    // if for 1 based indexing
    this.size = Array(n + 1).fill(1);
    this.parent = Array(n + 1)
      .fill()
      .map((_, i) => i);
  }

  findParent(u) {
    if (this.parent[u] === u) return u;
    return (this.parent[u] = this.findParent(this.parent[u]));
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
console.log(ds.size);
console.log(ds.parent);
ds.unionBySize(1, 2);
console.log("1", ds.size, ds.parent);
ds.unionBySize(2, 3);
console.log("2", ds.size, ds.parent);
ds.unionBySize(4, 5);
console.log("3", ds.size, ds.parent);
ds.unionBySize(6, 7);
console.log("4", ds.size, ds.parent);
// console.log("---------")
ds.unionBySize(5, 6);
console.log("5", ds.size, ds.parent);
// console.log("here---",ds.findParent(7))
// if(ds.findParent(7) === ds.findParent(3)){
//     console.log("before true")
// }
// else{
//     console.log("before false")
// }
ds.unionBySize(3, 7);
//  console.log(ds.size,ds.parent)
//  if(ds.findParent(7) === ds.findParent(3)){
//     console.log("after true")
// }
// else{
//     console.log("after false")
//}
console.log("6", ds.size, ds.parent);
console.log(ds.findParent(3));
