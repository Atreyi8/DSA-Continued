 

// Example 1:

// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.
// Example 2:

// Input: s = "cbbd"
// Output: "bb"
 

// Constraints:

// 1 <= s.length <= 1000
// s consist of only digits and English letters.

var longestPalindrome = function(s) {
    if (s.length < 2) {
        return s;
    }

    let maxLen = 0;
    let lo = 0;
    let result = s;

    const expandPalindrome = (j, k) => {
        while (j >= 0 && k < s.length && s[j] === s[k]) {
            j--;
            k++;
        }
        if (maxLen < k - j - 1) {
            maxLen = k - j - 1;
            lo = j + 1;
        }
    };

    for (let i = 0; i < s.length; i++) {
        expandPalindrome(i, i);
        expandPalindrome(i, i + 1);
    }

    return result.substring(lo, lo + maxLen);
};