// Print the elements of an array in the increasing frequency if 2 numbers have same frequency then print the one which came first.

// Example:
// Input : arr[] = {2, 5, 2, 8, 5, 6, 8, 8}
// Output : arr[] = {8, 8, 8, 2, 2, 5, 5, 6} .
// ------------------------------------------------------------

const kFrequencySort = (arr) => {
  let temp = [];
  let mapObj = new Map();
  let mapIndex = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (mapObj.has(arr[i])) {
      mapObj.set(arr[i], mapObj.get(arr[i]) + 1);
    } else {
      mapObj.set(arr[i], 1);
      mapIndex.set(arr[i], i);
    }
  }

  arr.sort((a, b) => {
    let f1 = mapObj.get(a);
    let f2 = mapObj.get(b);
    if (f1 !== f2) {
      console.log("f1", f2 - f1);
      return f2 - f1;
    } else {
      mapIndex.get(a[0]) - mapIndex.get(b[0]);
    }
  });
  console.log(arr);
};

console.log(kFrequencySort([2, 5, 2, 3, 8, 5, 6, 8, 8, 9]));
