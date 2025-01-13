// 787. Cheapest Flights Within K Stops
// Solved
// Medium
// Topics
// Companies
// There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.

// You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

// Example 1:

// Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
// Output: 700
// Explanation:
// The graph is shown above.
// The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
// Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.
// Example 2:

// Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
// Output: 200
// Explanation:
// The graph is shown above.
// The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.
// Example 3:

// Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
// Output: 500
// Explanation:
// The graph is shown above.
// The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.

// Constraints:

// 1 <= n <= 100
// 0 <= flights.length <= (n * (n - 1) / 2)
// flights[i].length == 3
// 0 <= fromi, toi < n
// fromi != toi
// 1 <= pricei <= 104
// There will not be any multiple flights between two cities.
// 0 <= src, dst, k < n
// src != dst

var findCheapestPrice = function (n, flights, src, dst, k) {
  let adj = Array(n)
    .fill()
    .map(() => []);

  //create adjacency

  for (let i = 0; i < flights.length; i++) {
    let a = flights[i][0];
    let b = flights[i][1];
    let c = flights[i][2];
    console.log(a, b);

    adj[a].push([b, c]);
  }
  console.log(adj);
  let priceArray = Array(n).fill(Infinity);
  let q = [];
  priceArray[src] = 0;
  //stop,src,price
  q.push([0, src, 0]);

  while (q.length > 0) {
    let [stop, city, price] = q.shift();
    for (let [neighborCity, priceForCity] of adj[city]) {
      console.log("q at start", q, priceArray);
      if (stop > k) {
        console.log("here");
        continue;
      }
      //stops taken till now is less than or equal to k , then i can increase one moe
      if (priceForCity + price < priceArray[neighborCity] && stop <= k) {
        priceArray[neighborCity] = priceForCity + price;
        q.push([stop + 1, neighborCity, priceArray[neighborCity]]);
      }
      console.log("q at end", q, priceArray);
    }
  }
  console.log("priceArray", priceArray);
  if (priceArray[dst] === Infinity) return -1;
  return priceArray[dst];
};

findCheapestPrice(
  4,
  [
    [0, 1, 100],
    [1, 2, 100],
    [2, 0, 100],
    [1, 3, 600],
    [2, 3, 200],
  ],
  0,
  3,
  1
);
