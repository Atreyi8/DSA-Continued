// Given three sorted arrays A, B, and C of not necessarily same sizes. 
//Calculate the minimum absolute difference between the maximum and minimum number of any triplet A[i], B[j], C[k]
// such that they belong to arrays A, B and C respectively, i.e., minimize (max(A[i], B[j], C[k]) – min(A[i], B[j], C[k]))

// Examples: 

// Input : A : [ 1, 4, 5, 8, 10 ]
//         B : [ 6, 9, 15 ]
//         C : [ 2, 3, 6, 6 ]
// Output : 1
// Explanation: When we select A[i] = 5
// B[j] = 6, C[k] = 6, we get the minimum difference 
// as max(A[i], B[j], C[k]) - min(A[i], B[j], C[k]))
// = |6-5| = 1 

// Input : A = [ 5, 8, 10, 15 ]
//         B = [ 6, 9, 15, 78, 89 ]
//         C = [ 2, 3, 6, 6, 8, 8, 10 ]
// Output : 1
// Explanation: When we select A[i] = 10
// b[j] = 9, C[k] = 10.
postMessage;''
const findminDiff = (A,B,C) =>{
    let a = 0;
    let b =0;
    let c = 0;

    let min_diff = Number.MAX_SAFE_INTEGER;
    while(a<A.length && b<B.length && c<C.length){
        let currentMax =  Math.max(A[a],B[b],C[c])
        let currentMin = Math.min(A[a],B[b],C[c])
        console.log(currentMax,currentMin)
        let current_diff = Math.abs(currentMax -currentMin)
        if(current_diff<min_diff){
            min_diff = current_diff
        }
        // abhi min difference kaise mil sakta
        // 1. max variable ghatao -> ab array sorted h toh and 1 element mai max wala us array ka sabse chota hi hoga isliye min badao
        // 2. min variable badao
        if(currentMin===A[a]){
            a++
        }
        else if(currentMin===B[b]){
            b++
        }
        else{
            c++
        }
    }
    return min_diff
    
}

console.log(findminDiff([ 1, 4, 5, 8, 10 ], [ 6, 9, 15 ],[ 7, 3, 6, 6 ]))