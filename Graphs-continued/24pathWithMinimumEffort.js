// 1631. Path With Minimum Effort
// You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.

// A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.

// Return the minimum effort required to travel from the top-left cell to the bottom-right cell.

// Example 1:

// Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
// Output: 2
// Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.
// This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.
// Example 2:

// Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
// Output: 1
// Explanation: The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].
// Example 3:

// Input: heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
// Output: 0
// Explanation: This route does not require any effort.

// Constraints:

// rows == heights.length
// columns == heights[i].length
// 1 <= rows, columns <= 100
// 1 <= heights[i][j] <= 106

/**
 * @param {number[][]} heights
 * @return {number}
 */

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

var minimumEffortPath = function (heights) {
  let n = heights.length;
  let m = heights[0].length;

  let difference = Array.from({ length: n }, () => Array(m).fill(Infinity));

  let minHeap = new MinHeap();
  difference[0][0] = 0;
  minHeap.push([0, 0, 0]);

  let drow = [-1, 0, 1, 0];
  let dcol = [0, 1, 0, -1];

  while (minHeap.size() > 0) {
    let [diff, r, c] = minHeap.pop();
    // console.log("!!!@@@@@@@@@ iteration start",diff,r,c,difference)
    // giving this return outside of for loop because we want to calculate all paths
    if (r === n - 1 && c === m - 1) {
      //console.log("in destination",diff)
      return diff;
    }
    for (let i = 0; i < 4; i++) {
      let newrow = r + drow[i];
      let newcol = c + dcol[i];

      if (newrow >= 0 && newrow < n && newcol >= 0 && newcol < m) {
        //console.log("nrow",newrow,newcol,heights[newrow][newcol],heights[r][c])
        let newDiff = Math.max(
          Math.abs(heights[newrow][newcol] - heights[r][c]),
          diff
        );
        //console.log("newDiff",newDiff,diff,difference[newrow][newcol])
        if (newDiff < difference[newrow][newcol]) {
          difference[newrow][newcol] = newDiff;
          minHeap.push([newDiff, newrow, newcol]);
          // console.log("in Heap-------- pushing ",newrow,newcol,"-------",minHeap)
        }
      }
    }
    //console.log("iteration over-------------",difference)
  }
  return 0;
};

console.log(
  minimumEffortPath([
    [1, 2, 2],
    [3, 8, 2],
    [5, 3, 5],
  ])
);
