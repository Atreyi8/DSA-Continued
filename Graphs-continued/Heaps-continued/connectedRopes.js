// There are given n ropes of different lengths, we need to connect these ropes into one rope.
//The cost to connect two ropes is equal to sum of their lengths. We need to connect the ropes with minimum cost.

// For example if we are given 4 ropes of lengths 4, 3, 2 and 6. We can connect the ropes in following ways.
// 1) First connect ropes of lengths 2 and 3. Now we have three ropes of lengths 4, 6 and 5.
// 2) Now connect ropes of lengths 4 and 5. Now we have two ropes of lengths 6 and 9.
// 3) Finally connect the two ropes and all ropes have connected.

// Total cost for connecting all ropes is 5 + 9 + 15 = 29.
//This is the optimized cost for connecting ropes.
//Other ways of connecting ropes would always have same or more cost.
// For example, if we connect 4 and 6 first (we get three strings of 3, 2 and 10),
//then connect 10 and 3 (we get two strings of 13 and 2). Finally we connect 13 and 2. Total cost in this way is 10 + 13 + 15 = 38. .

// The idea is to maintain all the ropes in a min heap and keep on popping the top 2 elements and add them to the result and push the sum back to the heap.

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

const connectRopes = (arr) => {
  let minHeap = new MinHeap();
  for (let i = 0; i < arr.length; i++) {
    minHeap.push(arr[i]);
  }
  let cost = 0;
  while (minHeap.size() > 1) {
    let first = minHeap.pop();
    let second = minHeap.pop();
    let sum = first + second;
    cost = cost + sum;
    minHeap.push(sum);
  }
  console.log(cost);
  return cost;
};

connectRopes([4, 4, 2, 6]); // 29
