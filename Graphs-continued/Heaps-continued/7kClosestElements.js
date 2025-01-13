// Given an unsorted array and two numbers x and k, find k closest values to x.
// Input : arr[] = [5,6,7,8,9], x = 7, k = 3 .
// output : 6,7,8

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
    const parentIndex = Math.floor((index - 1) / 2);

    if (
      parentIndex >= 0 &&
      this.heap[parentIndex].diff < this.heap[index].diff
    ) {
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      this.heapifyUp(parentIndex);
    }
  }

  heapifyDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let largestIndex = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex].diff > this.heap[largestIndex].diff
    ) {
      largestIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex].diff > this.heap[largestIndex].diff
    ) {
      largestIndex = rightChildIndex;
    }

    if (largestIndex !== index) {
      [this.heap[largestIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[largestIndex],
      ];
      this.heapifyDown(largestIndex);
    }
  }
}

const KClosetElement = (arr, x, k) => {
  let maxHeap = new MaxHeap();
  for (let i = 0; i < arr.length; i++) {
    maxHeap.push({ diff: Math.abs(arr[i] - x), val: arr[i] });
    if (maxHeap.size() > k) {
      maxHeap.pop();
    }
  }
  console.log(maxHeap.heap);
  while (maxHeap.size() > 0) {
    console.log(maxHeap.pop().val);
  }
};

KClosetElement([5, 6, 7, 8, 9], 7, 3); // [ 6, 7, 8 ]
