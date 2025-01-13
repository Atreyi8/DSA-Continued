// JavaScript program for implementation
// of Heap Sort

function sort(arr) {
  var N = arr.length;

  // Build heap (rearrange array)
  for (var i = Math.floor(N / 2) - 1; i >= 0; i--) {
    console.log("i", i);
    heapify(arr, N, i);
  }

  // One by one extract an element from heap
  for (var i = N - 1; i > 0; i--) {
    console.log("here", arr, N, i);
    // Move current root to end
    var temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    // call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(arr, N, i) {
  console.log("in heapify", arr, N, i);
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2
  console.log("il,r", l, r, arr[l], arr[r], arr[largest]);

  // If left child is larger than root
  if (l < N && arr[l] > arr[largest]) {
    console.log("left greater", l, N, arr[l], arr[largest]);
    largest = l;
  }

  // If right child is larger than largest so far
  if (r < N && arr[r] > arr[largest]) {
    console.log("right greater", r, N, arr[r], arr[largest]);
    largest = r;
  }

  console.log("@@@!!", largest, i, arr[largest], arr[i]);
  // If largest is not root
  if (largest != i) {
    var swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    // Recursively heapify the affected sub-tree
    heapify(arr, N, largest);
  }
}

/* A utility function to print array of size n */
function printArray(arr) {
  var N = arr.length;
  for (var i = 0; i < N; ++i) console.log(arr[i] + " ");
}

var arr = [12, 11, 13, 5, 6, 7];
var N = arr.length;

sort(arr);

console.log("Sorted array is");
printArray(arr, N);
