/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findPairs = function (nums, k) {
    nums = nums.sort((a, b) => a - b);
    console.log(nums);
    let n = nums.length;
    let l = 0;
    let r = 1;
    let count = 0;
    while (r < n) {
      if (k === 0) {
        if (nums[r] === nums[l]) {
          count++;
          let left = nums[l];
          while (nums[l] === left) {
            l++;
            r++;
          }
        } else {
          r++;
          l++;
        }
      } else {
        console.log(l, r);
        while (nums[l] === nums[l + 1]) {
          l++;
        }
        while (nums[r] === nums[r + 1]) {
          r++;
        }
        console.log("22", l, r);
  
        if (nums[r] - nums[l] === k && r !== l) {
          console.log("#####");
          r++;
          l++;
          count++;
        } else if (nums[r] - nums[l] > k) {
          l++;
        } else {
          r++;
        }
      }
    }
    console.log("outside loop");
    return count;
  };
  //isme duplicacy solve nhi ho pa rhi
  
  // var findPairs = function(nums, k) {
  //     let n=nums.length;
  //     let hash={};
  //     let pairs=0;
  //     for(let i=0;i<n;i++){
  //         hash[nums[i]]=(hash[nums[i]]||0)+1;
  //     }
  //     for(let key in hash){
  //         let num=parseInt(key);
  //         if(k>0 && hash[num+k]){
  //             pairs++;
  //         }
  //         else if(k===0 && hash[num]>1){
  //             pairs++;
  //         }
  //     }
  //     return pairs;
  
  //  };
  console.log(findPairs([1, 1, 1, 1, 2, 2], 1));
  