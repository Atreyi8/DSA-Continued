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
      if (this.heap[parentIndex] < this.heap[index]) break;
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

    if (left < this.heap.length && this.heap[left] < this.heap[smallest])
      smallest = left;
    if (right < this.heap.length && this.heap[right] < this.heap[smallest])
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
