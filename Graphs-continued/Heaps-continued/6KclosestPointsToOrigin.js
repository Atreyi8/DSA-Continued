// Given a list of points on the 2-D plane and an integer K. The task is to find K closest points to the origin and print them.

// Note: The distance between two points on a plane is the Euclidean distance.

// Example:
// Input : point = [[3, 3], [5, -1], [-2, 4]], K = 2 .

// So how to check distance between points is simple,
//we can use the formula of distance between two points in 2-D plane which is sqrt((x2-x1)^2 + (y2-y1)^2) .
// since one of the points are (0,0) we can simplify the formula to sqrt(x^2 + y^2) .
//Now if we do square also on the distance we can avoid the sqrt operation and just compare the distance by x^2 + y^2.

class MaxHeap {
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
      if (this.heap[parentIndex].distance > this.heap[index].distance) break;
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
    let largest = index;

    if (
      left < this.heap.length &&
      this.heap[left].distance > this.heap[largest].distance
    )
      largest = left;
    if (
      right < this.heap.length &&
      this.heap[right].distance > this.heap[largest].distance
    )
      largest = right;

    if (largest !== index) {
      [this.heap[largest], this.heap[index]] = [
        this.heap[index],
        this.heap[largest],
      ];
      this.heapifyDown(largest);
    }
  }
}

const KClosestPointstoOrigin = (arr, K) => {
  let maxHeap = new MaxHeap();
  for (let i = 0; i < arr.length; i++) {
    let x = arr[i][0];
    let y = arr[i][1];
    let distance = x * x + y * y;
    maxHeap.push({ distance: distance, point: [x, y] });
    if (maxHeap.size() > K) {
      maxHeap.pop();
    }
  }
  while (maxHeap.size() > 0) {
    console.log(maxHeap.pop().point);
  }
};

console.log(
  KClosestPointstoOrigin(
    [
      [3, 3],
      [5, -1],
      [-2, 4],
    ],
    2
  )
);
