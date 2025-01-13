// Print the elements of an array in the increasing frequency if 2 numbers have same frequency then print the one which came first.

// Example:
// Input : arr[] = {2, 5, 2, 8, 5, 6, 8, 8}
// Output : arr[] = {8, 8, 8, 2, 2, 5, 5, 6} .
// ------------------------------------------------------------

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
      if (this.heap[parentIndex][0] > this.heap[index][0]) break;
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

    if (left < this.heap.length && this.heap[left][0] > this.heap[largest][0])
      largest = left;
    if (right < this.heap.length && this.heap[right][0] > this.heap[largest][0])
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

const kFrequencySort = (arr) => {
  let temp = [];
  let mapObj = new Map();
  for (let i = 0; i < arr.length; i++) {
    mapObj.set(arr[i], mapObj.get(arr[i]) + 1 || 1);
  }
  let maxHeap = new MaxHeap();
  for (let [num, freq] of mapObj) {
    maxHeap.push([freq, num]);
  }
  console.log(maxHeap.heap);
  while (maxHeap.size() > 0) {
    let [freq, num] = maxHeap.pop();
    for (let i = 0; i < freq; i++) {
      temp.push(num);
    }
  }
  return temp;
};

console.log(kFrequencySort([2, 5, 2, 8, 5, 6, 8, 8]));
