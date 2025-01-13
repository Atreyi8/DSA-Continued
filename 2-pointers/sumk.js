// Two pointers is really an easy and effective technique that is typically used for searching pairs in a sorted array.
// Given a sorted array A (sorted in ascending order), 
//having N integers, find all the  pair of elements (A[i], A[j]) such that their sum is equal to X.

//Ip = [1,4,4,5,5,5,6,6,11]
//Sum = 11
//OP = 6 {(5,6),(5,6)---}
// indices --->     {(3,6),(3,7),(4,6),(4,7),(5,6),(5,7)}


const findSum = (arr,sum)=>{
    let start = 0;
    let end = arr.length -1;
    let ans = 0;

    while(start<=end){
        if(arr[start]+arr[end]<sum){
            start++
        }
        else if(arr[start]+ arr[end]>sum){
            end --
        }
        //case when arr[start]+arr[end]=== sum
        else{
            //Considering the case when both start and end have same value , in case sum = 10 , and values as 5
            if(arr[start]===arr[end]){
                console.log("gere",start,end,ans)
                //let top = arr[start]
                let c1 = 0;
                // while(arr[start]===top){
                //     c1 = c1 + 1;
                //     start ++;
                // }
                //or
                c1 = end - start + 1
                start = end+1
                console.log("@@",start,end,c1,ans)
                ans = ans + c1

            }
            else{
                //doing for duplicate numbers
                console.log("here",start,end)
                let top = arr[start]
                let bottom = arr[end]
                let c1 = 0;
                let c2 = 0;
                while(arr[start]===top){
                    c1 = c1 + 1;
                    start ++;
                }
                while(arr[end] === bottom){
                    c2 = c2+1;
                    end --
                }
                console.log("tehre",start,end,c1,c2)

                ans = ans + c1*c2
            }
        }
    }
    return ans
}

console.log(findSum([1,4,4,5,5,5,6,6,11],10))