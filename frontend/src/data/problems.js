export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))  # Expected: [1, 2]
print(twoSum([3, 3], 6))  # Expected: [0, 1]`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // Expected: [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6))); // Expected: [1, 2]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6))); // Expected: [0, 1]
    }
}`,
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
    },
  },

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
    },
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your solution here
  
}

// Test cases
let test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

let test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      python: `def reverseString(s):
    # Write your solution here
    pass

# Test cases
test1 = ["h","e","l","l","o"]
reverseString(test1)
print(test1)  # Expected: ["o","l","l","e","h"]

test2 = ["H","a","n","n","a","h"]
reverseString(test2)
print(test2)  # Expected: ["h","a","n","n","a","H"]`,
      java: `import java.util.*;

class Solution {
    public static void reverseString(char[] s) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        char[] test1 = {'h','e','l','l','o'};
        reverseString(test1);
        System.out.println(Arrays.toString(test1)); // Expected: [o, l, l, e, h]
        
        char[] test2 = {'H','a','n','n','a','h'};
        reverseString(test2);
        System.out.println(Arrays.toString(test2)); // Expected: [h, a, n, n, a, H]
    }
}`,
    },
    expectedOutput: {
      javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
      python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
      java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
    },
  },

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.",
      notes: ["Given a string s, return true if it is a palindrome, or false otherwise."],
    },
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
      {
        input: 's = " "',
        output: "true",
        explanation:
          's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters"],
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your solution here
  
}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log(isPalindrome("race a car")); // Expected: false
console.log(isPalindrome(" ")); // Expected: true`,
      python: `def isPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(isPalindrome("A man, a plan, a canal: Panama"))  # Expected: True
print(isPalindrome("race a car"))  # Expected: False
print(isPalindrome(" "))  # Expected: True`,
      java: `class Solution {
    public static boolean isPalindrome(String s) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
        System.out.println(isPalindrome("race a car")); // Expected: false
        System.out.println(isPalindrome(" ")); // Expected: true
    }
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
    },
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your solution here
  
}

// Test cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6
console.log(maxSubArray([1])); // Expected: 1
console.log(maxSubArray([5,4,-1,7,8])); // Expected: 23`,
      python: `def maxSubArray(nums):
    # Write your solution here
    pass

# Test cases
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6
print(maxSubArray([1]))  # Expected: 1
print(maxSubArray([5,4,-1,7,8]))  # Expected: 23`,
      java: `class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); // Expected: 6
        System.out.println(maxSubArray(new int[]{1})); // Expected: 1
        System.out.println(maxSubArray(new int[]{5,4,-1,7,8})); // Expected: 23
    }
}`,
    },
    expectedOutput: {
      javascript: "6\n1\n23",
      python: "6\n1\n23",
      java: "6\n1\n23",
    },
  },

  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
      notes: [
        "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        "Return the maximum amount of water a container can store.",
        "Notice that you may not slant the container.",
      ],
    },
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxArea(height) {
  // Write your solution here
  
}

// Test cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49
console.log(maxArea([1,1])); // Expected: 1`,
      python: `def maxArea(height):
    # Write your solution here
    pass

# Test cases
print(maxArea([1,8,6,2,5,4,8,3,7]))  # Expected: 49
print(maxArea([1,1]))  # Expected: 1`,
      java: `class Solution {
    public static int maxArea(int[] height) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7})); // Expected: 49
        System.out.println(maxArea(new int[]{1,1})); // Expected: 1
    }
}`,
    },
    expectedOutput: {
      javascript: "49\n1",
      python: "49\n1",
      java: "49\n1",
    },
  },

  "merge-sorted-array": {
    id: "merge-sorted-array",
    title: "Merge Sorted Array",
    difficulty: "Easy",
    category: "Array • Two Pointers",
    description: {
      text: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums2 into nums1 as one sorted array.",
      notes: [
        "The final sorted array should not be returned by the function, but instead be stored inside the array nums1.",
        "nums1 has a length of m + n, where the last n elements are set to 0 and should be ignored.",
      ],
    },
    examples: [
      {
        input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        output: "[1,2,2,3,5,6]",
        explanation: "The arrays we are merging are [1,2,3] and [2,5,6]. The result is [1,2,2,3,5,6].",
      },
      {
        input: "nums1 = [1], m = 1, nums2 = [], n = 0",
        output: "[1]",
      },
    ],
    constraints: ["nums1.length == m + n", "nums2.length == n", "0 ≤ m, n ≤ 200"],
    starterCode: {
      javascript: `function merge(nums1, m, nums2, n) {
  // Write your solution here
  
}

// Test cases
let t1 = [1,2,3,0,0,0];
merge(t1, 3, [2,5,6], 3);
console.log(JSON.stringify(t1)); // Expected: [1,2,2,3,5,6]

let t2 = [1];
merge(t2, 1, [], 0);
console.log(JSON.stringify(t2)); // Expected: [1]`,
      python: `def merge(nums1, m, nums2, n):
    # Write your solution here
    pass

# Test cases
t1 = [1,2,3,0,0,0]
merge(t1, 3, [2,5,6], 3)
print(t1)  # Expected: [1, 2, 2, 3, 5, 6]

t2 = [1]
merge(t2, 1, [], 0)
print(t2)  # Expected: [1]`,
      java: `import java.util.*;

class Solution {
    public static void merge(int[] nums1, int m, int[] nums2, int n) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        int[] t1 = {1,2,3,0,0,0};
        merge(t1, 3, new int[]{2,5,6}, 3);
        System.out.println(Arrays.toString(t1)); // Expected: [1, 2, 2, 3, 5, 6]

        int[] t2 = {1};
        merge(t2, 1, new int[]{}, 0);
        System.out.println(Arrays.toString(t2)); // Expected: [1]
    }
}`,
    },
    expectedOutput: {
      javascript: "[1,2,2,3,5,6]\n[1]",
      python: "[1, 2, 2, 3, 5, 6]\n[1]",
      java: "[1, 2, 2, 3, 5, 6]\n[1]",
    },
  },

  "climbing-stairs": {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    description: {
      text: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      notes: [],
    },
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1+1 and 2.",
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways: 1+1+1, 1+2, and 2+1.",
      },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    starterCode: {
      javascript: `function climbStairs(n) {
  // Write your solution here
  
}

// Test cases
console.log(climbStairs(2)); // Expected: 2
console.log(climbStairs(3)); // Expected: 3
console.log(climbStairs(5)); // Expected: 8`,
      python: `def climbStairs(n):
    # Write your solution here
    pass

# Test cases
print(climbStairs(2))  # Expected: 2
print(climbStairs(3))  # Expected: 3
print(climbStairs(5))  # Expected: 8`,
      java: `class Solution {
    public static int climbStairs(int n) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(climbStairs(2)); // Expected: 2
        System.out.println(climbStairs(3)); // Expected: 3
        System.out.println(climbStairs(5)); // Expected: 8
    }
}`,
    },
    expectedOutput: {
      javascript: "2\n3\n8",
      python: "2\n3\n8",
      java: "2\n3\n8",
    },
  },

  "best-time-to-buy-and-sell-stock": {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array • Sliding Window",
    description: {
      text: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
      notes: [],
    },
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "No profit is possible since prices only decrease.",
      },
    ],
    constraints: ["1 ≤ prices.length ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxProfit(prices) {
  // Write your solution here
  
}

// Test cases
console.log(maxProfit([7,1,5,3,6,4])); // Expected: 5
console.log(maxProfit([7,6,4,3,1])); // Expected: 0`,
      python: `def maxProfit(prices):
    # Write your solution here
    pass

# Test cases
print(maxProfit([7,1,5,3,6,4]))  # Expected: 5
print(maxProfit([7,6,4,3,1]))  # Expected: 0`,
      java: `class Solution {
    public static int maxProfit(int[] prices) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{7,1,5,3,6,4})); // Expected: 5
        System.out.println(maxProfit(new int[]{7,6,4,3,1})); // Expected: 0
    }
}`,
    },
    expectedOutput: {
      javascript: "5\n0",
      python: "5\n0",
      java: "5\n0",
    },
  },

  "valid-parentheses": {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack • String",
    description: {
      text: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.",
      notes: [],
    },
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'"],
    starterCode: {
      javascript: `function isValid(s) {
  // Write your solution here
  
}

// Test cases
console.log(isValid("()")); // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false`,
      python: `def isValid(s):
    # Write your solution here
    pass

# Test cases
print(isValid("()"))  # Expected: True
print(isValid("()[]{}"))  # Expected: True
print(isValid("(]"))  # Expected: False`,
      java: `class Solution {
    public static boolean isValid(String s) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isValid("()")); // Expected: true
        System.out.println(isValid("()[]{}")); // Expected: true
        System.out.println(isValid("(]")); // Expected: false
    }
}`,
    },
    expectedOutput: {
      javascript: "true\ntrue\nfalse",
      python: "True\nTrue\nFalse",
      java: "true\ntrue\nfalse",
    },
  },

  "linked-list-cycle": {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    category: "Linked List • Two Pointers",
    description: {
      text: "Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.",
      notes: ["Return true if there is a cycle in the linked list. Otherwise, return false."],
    },
    examples: [
      {
        input: "head = [3,2,0,-4], pos = 1",
        output: "true",
        explanation: "There is a cycle in the linked list, where the tail connects to the 1st node.",
      },
      {
        input: "head = [1], pos = -1",
        output: "false",
        explanation: "There is no cycle in the linked list.",
      },
    ],
    constraints: ["0 ≤ Number of nodes ≤ 10⁴", "-10⁵ ≤ Node.val ≤ 10⁵"],
    starterCode: {
      javascript: `// Definition: function ListNode(val) { this.val = val; this.next = null; }

function hasCycle(head) {
  // Write your solution here (Floyd's Cycle Detection)
  
}

// Test: Create a cycle manually
function createList(arr, pos) {
  if (!arr.length) return null;
  let nodes = arr.map(v => ({ val: v, next: null }));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i+1];
  if (pos >= 0) nodes[nodes.length - 1].next = nodes[pos];
  return nodes[0];
}

console.log(hasCycle(createList([3,2,0,-4], 1))); // Expected: true
console.log(hasCycle(createList([1], -1))); // Expected: false`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def hasCycle(head):
    # Write your solution here (Floyd's Cycle Detection)
    pass

# Test helper
def create_list(arr, pos):
    if not arr: return None
    nodes = [ListNode(v) for v in arr]
    for i in range(len(nodes)-1): nodes[i].next = nodes[i+1]
    if pos >= 0: nodes[-1].next = nodes[pos]
    return nodes[0]

print(hasCycle(create_list([3,2,0,-4], 1)))  # Expected: True
print(hasCycle(create_list([1], -1)))  # Expected: False`,
      java: `class Solution {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int x) { val = x; next = null; }
    }
    
    public static boolean hasCycle(ListNode head) {
        // Write your solution here (Floyd's Cycle Detection)
        
        return false;
    }
    
    public static void main(String[] args) {
        // Test 1: [3,2,0,-4] with cycle at pos 1
        ListNode n1 = new ListNode(3), n2 = new ListNode(2),
                 n3 = new ListNode(0), n4 = new ListNode(-4);
        n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n2;
        System.out.println(hasCycle(n1)); // Expected: true

        // Test 2: [1] no cycle
        ListNode single = new ListNode(1);
        System.out.println(hasCycle(single)); // Expected: false
    }
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
    },
  },

  "binary-search": {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Array • Binary Search",
    description: {
      text: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
      notes: ["You must write an algorithm with O(log n) runtime complexity."],
    },
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4.",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "All integers in nums are unique", "nums is sorted in ascending order"],
    starterCode: {
      javascript: `function search(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(search([-1,0,3,5,9,12], 9)); // Expected: 4
console.log(search([-1,0,3,5,9,12], 2)); // Expected: -1`,
      python: `def search(nums, target):
    # Write your solution here
    pass

# Test cases
print(search([-1,0,3,5,9,12], 9))  # Expected: 4
print(search([-1,0,3,5,9,12], 2))  # Expected: -1`,
      java: `class Solution {
    public static int search(int[] nums, int target) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(search(new int[]{-1,0,3,5,9,12}, 9)); // Expected: 4
        System.out.println(search(new int[]{-1,0,3,5,9,12}, 2)); // Expected: -1
    }
}`,
    },
    expectedOutput: {
      javascript: "4\n-1",
      python: "4\n-1",
      java: "4\n-1",
    },
  },

  "merge-two-sorted-lists": {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List • Recursion",
    description: {
      text: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
      notes: [],
    },
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]",
      },
    ],
    constraints: ["0 ≤ List length ≤ 50", "-100 ≤ Node.val ≤ 100", "Both lists are sorted in non-decreasing order"],
    starterCode: {
      javascript: `function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function mergeTwoLists(list1, list2) {
  // Write your solution here
  
}

// Helpers
function toList(arr) {
  let head = null;
  for (let i = arr.length - 1; i >= 0; i--) head = new ListNode(arr[i], head);
  return head;
}
function toArr(node) {
  const r = []; while (node) { r.push(node.val); node = node.next; } return r;
}

console.log(JSON.stringify(toArr(mergeTwoLists(toList([1,2,4]), toList([1,3,4]))))); // [1,1,2,3,4,4]
console.log(JSON.stringify(toArr(mergeTwoLists(toList([]), toList([0]))))); // [0]`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeTwoLists(list1, list2):
    # Write your solution here
    pass

# Helpers
def to_list(arr):
    head = None
    for v in reversed(arr): head = ListNode(v, head)
    return head

def to_arr(node):
    r = []
    while node: r.append(node.val); node = node.next
    return r

print(to_arr(mergeTwoLists(to_list([1,2,4]), to_list([1,3,4]))))  # [1, 1, 2, 3, 4, 4]
print(to_arr(mergeTwoLists(to_list([]), to_list([0]))))  # [0]`,
      java: `import java.util.*;

class Solution {
    static class ListNode {
        int val; ListNode next;
        ListNode(int v) { val = v; }
        ListNode(int v, ListNode n) { val = v; next = n; }
    }

    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        // Write your solution here
        return null;
    }

    static ListNode toList(int[] arr) {
        ListNode head = null;
        for (int i = arr.length-1; i >= 0; i--) head = new ListNode(arr[i], head);
        return head;
    }
    static String toStr(ListNode n) {
        StringBuilder sb = new StringBuilder("[");
        while (n != null) { if (sb.length() > 1) sb.append(", "); sb.append(n.val); n = n.next; }
        return sb.append("]").toString();
    }

    public static void main(String[] args) {
        System.out.println(toStr(mergeTwoLists(toList(new int[]{1,2,4}), toList(new int[]{1,3,4})))); // [1, 1, 2, 3, 4, 4]
        System.out.println(toStr(mergeTwoLists(toList(new int[]{}), toList(new int[]{0})))); // [0]
    }
}`,
    },
    expectedOutput: {
      javascript: "[1,1,2,3,4,4]\n[0]",
      python: "[1, 1, 2, 3, 4, 4]\n[0]",
      java: "[1, 1, 2, 3, 4, 4]\n[0]",
    },
  },

  "fizz-buzz": {
    id: "fizz-buzz",
    title: "FizzBuzz",
    difficulty: "Easy",
    category: "Math • Simulation",
    description: {
      text: "Given an integer n, return a string array answer (1-indexed) where: answer[i] == 'FizzBuzz' if i is divisible by 3 and 5, answer[i] == 'Fizz' if i is divisible by 3, answer[i] == 'Buzz' if i is divisible by 5, answer[i] == i (as a string) otherwise.",
      notes: [],
    },
    examples: [
      {
        input: "n = 5",
        output: '["1","2","Fizz","4","Buzz"]',
      },
      {
        input: "n = 15",
        output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]',
      },
    ],
    constraints: ["1 ≤ n ≤ 10⁴"],
    starterCode: {
      javascript: `function fizzBuzz(n) {
  // Write your solution here
  
}

// Test cases
console.log(JSON.stringify(fizzBuzz(5))); // Expected: ["1","2","Fizz","4","Buzz"]
console.log(fizzBuzz(15).length); // Expected: 15`,
      python: `def fizzBuzz(n):
    # Write your solution here
    pass

# Test cases
print(fizzBuzz(5))  # Expected: ["1","2","Fizz","4","Buzz"]
print(len(fizzBuzz(15)))  # Expected: 15`,
      java: `import java.util.*;

class Solution {
    public static List<String> fizzBuzz(int n) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(fizzBuzz(5)); // Expected: [1, 2, Fizz, 4, Buzz]
        System.out.println(fizzBuzz(15).size()); // Expected: 15
    }
}`,
    },
    expectedOutput: {
      javascript: '["1","2","Fizz","4","Buzz"]\n15',
      python: "['1', '2', 'Fizz', '4', 'Buzz']\n15",
      java: "[1, 2, Fizz, 4, Buzz]\n15",
    },
  },

  "roman-to-integer": {
    id: "roman-to-integer",
    title: "Roman to Integer",
    difficulty: "Easy",
    category: "Hash Table • String",
    description: {
      text: "Roman numerals are represented by seven different symbols: I (1), V (5), X (10), L (50), C (100), D (500), M (1000). Given a roman numeral, convert it to an integer.",
      notes: [
        "I can be placed before V (5) and X (10) to make 4 and 9.",
        "X can be placed before L (50) and C (100) to make 40 and 90.",
        "C can be placed before D (500) and M (1000) to make 400 and 900.",
      ],
    },
    examples: [
      { input: 's = "III"', output: "3" },
      { input: 's = "LVIII"', output: "58", explanation: "L = 50, V = 5, III = 3." },
      { input: 's = "MCMXCIV"', output: "1994", explanation: "M = 1000, CM = 900, XC = 90, IV = 4." },
    ],
    constraints: ["1 ≤ s.length ≤ 15", "s contains only the characters (I, V, X, L, C, D, M)"],
    starterCode: {
      javascript: `function romanToInt(s) {
  // Write your solution here
  
}

// Test cases
console.log(romanToInt("III")); // Expected: 3
console.log(romanToInt("LVIII")); // Expected: 58
console.log(romanToInt("MCMXCIV")); // Expected: 1994`,
      python: `def romanToInt(s):
    # Write your solution here
    pass

# Test cases
print(romanToInt("III"))  # Expected: 3
print(romanToInt("LVIII"))  # Expected: 58
print(romanToInt("MCMXCIV"))  # Expected: 1994`,
      java: `class Solution {
    public static int romanToInt(String s) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(romanToInt("III")); // Expected: 3
        System.out.println(romanToInt("LVIII")); // Expected: 58
        System.out.println(romanToInt("MCMXCIV")); // Expected: 1994
    }
}`,
    },
    expectedOutput: {
      javascript: "3\n58\n1994",
      python: "3\n58\n1994",
      java: "3\n58\n1994",
    },
  },

  "remove-duplicates-from-sorted-array": {
    id: "remove-duplicates-from-sorted-array",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    category: "Array • Two Pointers",
    description: {
      text: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Return k — the number of unique elements.",
      notes: ["Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory."],
    },
    examples: [
      {
        input: "nums = [1,1,2]",
        output: "2, nums = [1,2,_]",
        explanation: "Your function should return k = 2, with the first two elements being 1 and 2.",
      },
      {
        input: "nums = [0,0,1,1,1,2,2,3,3,4]",
        output: "5, nums = [0,1,2,3,4,_,_,_,_,_]",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 3 * 10⁴", "-100 ≤ nums[i] ≤ 100", "nums is sorted in non-decreasing order"],
    starterCode: {
      javascript: `function removeDuplicates(nums) {
  // Write your solution here
  
}

// Test cases
let t1 = [1,1,2];
console.log(removeDuplicates(t1)); // Expected: 2

let t2 = [0,0,1,1,1,2,2,3,3,4];
console.log(removeDuplicates(t2)); // Expected: 5`,
      python: `def removeDuplicates(nums):
    # Write your solution here
    pass

# Test cases
t1 = [1,1,2]
print(removeDuplicates(t1))  # Expected: 2

t2 = [0,0,1,1,1,2,2,3,3,4]
print(removeDuplicates(t2))  # Expected: 5`,
      java: `class Solution {
    public static int removeDuplicates(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(removeDuplicates(new int[]{1,1,2})); // Expected: 2
        System.out.println(removeDuplicates(new int[]{0,0,1,1,1,2,2,3,3,4})); // Expected: 5
    }
}`,
    },
    expectedOutput: {
      javascript: "2\n5",
      python: "2\n5",
      java: "2\n5",
    },
  },

  "three-sum": {
    id: "three-sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Array • Two Pointers • Sorting",
    description: {
      text: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
      },
      {
        input: "nums = [0,0,0]",
        output: "[[0,0,0]]",
      },
    ],
    constraints: ["3 ≤ nums.length ≤ 3000", "-10⁵ ≤ nums[i] ≤ 10⁵"],
    starterCode: {
      javascript: `function threeSum(nums) {
  // Write your solution here
  
}

// Test cases
console.log(JSON.stringify(threeSum([-1,0,1,2,-1,-4]))); // Expected: [[-1,-1,2],[-1,0,1]]
console.log(JSON.stringify(threeSum([0,1,1]))); // Expected: []
console.log(JSON.stringify(threeSum([0,0,0]))); // Expected: [[0,0,0]]`,
      python: `def threeSum(nums):
    # Write your solution here
    pass

# Test cases
print(threeSum([-1,0,1,2,-1,-4]))  # Expected: [[-1,-1,2],[-1,0,1]]
print(threeSum([0,1,1]))  # Expected: []
print(threeSum([0,0,0]))  # Expected: [[0,0,0]]`,
      java: `import java.util.*;

class Solution {
    public static List<List<Integer>> threeSum(int[] nums) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(threeSum(new int[]{-1,0,1,2,-1,-4})); // Expected: [[-1,-1,2],[-1,0,1]]
        System.out.println(threeSum(new int[]{0,1,1})); // Expected: []
        System.out.println(threeSum(new int[]{0,0,0})); // Expected: [[0,0,0]]
    }
}`,
    },
    expectedOutput: {
      javascript: "[[-1,-1,2],[-1,0,1]]\n[]\n[[0,0,0]]",
      python: "[[-1, -1, 2], [-1, 0, 1]]\n[]\n[[0, 0, 0]]",
      java: "[[-1, -1, 2], [-1, 0, 1]]\n[]\n[[0, 0, 0]]",
    },
  },

  "rotate-array": {
    id: "rotate-array",
    title: "Rotate Array",
    difficulty: "Medium",
    category: "Array • Math",
    description: {
      text: "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.",
      notes: ["Try to come up with as many solutions as you can. There are at least three different ways to solve this problem.", "Could you do it in-place with O(1) extra space?"],
    },
    examples: [
      {
        input: "nums = [1,2,3,4,5,6,7], k = 3",
        output: "[5,6,7,1,2,3,4]",
        explanation: "rotate 1 step: [7,1,2,3,4,5,6] → rotate 2: [6,7,1,2,3,4,5] → rotate 3: [5,6,7,1,2,3,4]",
      },
      {
        input: "nums = [-1,-100,3,99], k = 2",
        output: "[3,99,-1,-100]",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-2³¹ ≤ nums[i] ≤ 2³¹ - 1", "0 ≤ k ≤ 10⁵"],
    starterCode: {
      javascript: `function rotate(nums, k) {
  // Write your solution here
  
}

// Test cases
let t1 = [1,2,3,4,5,6,7];
rotate(t1, 3);
console.log(JSON.stringify(t1)); // Expected: [5,6,7,1,2,3,4]

let t2 = [-1,-100,3,99];
rotate(t2, 2);
console.log(JSON.stringify(t2)); // Expected: [3,99,-1,-100]`,
      python: `def rotate(nums, k):
    # Write your solution here
    pass

# Test cases
t1 = [1,2,3,4,5,6,7]
rotate(t1, 3)
print(t1)  # Expected: [5, 6, 7, 1, 2, 3, 4]

t2 = [-1,-100,3,99]
rotate(t2, 2)
print(t2)  # Expected: [3, 99, -1, -100]`,
      java: `import java.util.*;

class Solution {
    public static void rotate(int[] nums, int k) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        int[] t1 = {1,2,3,4,5,6,7};
        rotate(t1, 3);
        System.out.println(Arrays.toString(t1)); // Expected: [5, 6, 7, 1, 2, 3, 4]

        int[] t2 = {-1,-100,3,99};
        rotate(t2, 2);
        System.out.println(Arrays.toString(t2)); // Expected: [3, 99, -1, -100]
    }
}`,
    },
    expectedOutput: {
      javascript: "[5,6,7,1,2,3,4]\n[3,99,-1,-100]",
      python: "[5, 6, 7, 1, 2, 3, 4]\n[3, 99, -1, -100]",
      java: "[5, 6, 7, 1, 2, 3, 4]\n[3, 99, -1, -100]",
    },
  },

  "group-anagrams": {
    id: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "Hash Table • String • Sorting",
    description: {
      text: "Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
      notes: [],
    },
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]',
      },
    ],
    constraints: ["1 ≤ strs.length ≤ 10⁴", "0 ≤ strs[i].length ≤ 100", "strs[i] consists of lowercase English letters"],
    starterCode: {
      javascript: `function groupAnagrams(strs) {
  // Write your solution here
  
}

// Test cases
console.log(JSON.stringify(groupAnagrams(["eat","tea","tan","ate","nat","bat"])));
// One valid output: [["eat","tea","ate"],["tan","nat"],["bat"]]
console.log(JSON.stringify(groupAnagrams([""])));
// Expected: [[""]]`,
      python: `def groupAnagrams(strs):
    # Write your solution here
    pass

# Test cases
print(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))
# One valid output: [["eat","tea","ate"],["tan","nat"],["bat"]]
print(groupAnagrams([""]))
# Expected: [[""]]`,
      java: `import java.util.*;

class Solution {
    public static List<List<String>> groupAnagrams(String[] strs) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(groupAnagrams(new String[]{"eat","tea","tan","ate","nat","bat"}));
        System.out.println(groupAnagrams(new String[]{""}));
    }
}`,
    },
    expectedOutput: {
      javascript: '[["eat","tea","ate"],["tan","nat"],["bat"]]\n[[""]]',
      python: "[['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]\n[['']]",
      java: "[[eat, tea, ate], [tan, nat], [bat]]\n[[]]",
    },
  },

  "longest-substring-without-repeating": {
    id: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String • Sliding Window • Hash Table",
    description: {
      text: "Given a string s, find the length of the longest substring without repeating characters.",
      notes: [],
    },
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    constraints: ["0 ≤ s.length ≤ 5 * 10⁴", "s consists of English letters, digits, symbols and spaces"],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  
}

// Test cases
console.log(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
console.log(lengthOfLongestSubstring("bbbbb")); // Expected: 1
console.log(lengthOfLongestSubstring("pwwkew")); // Expected: 3`,
      python: `def lengthOfLongestSubstring(s):
    # Write your solution here
    pass

# Test cases
print(lengthOfLongestSubstring("abcabcbb"))  # Expected: 3
print(lengthOfLongestSubstring("bbbbb"))  # Expected: 1
print(lengthOfLongestSubstring("pwwkew"))  # Expected: 3`,
      java: `class Solution {
    public static int lengthOfLongestSubstring(String s) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
        System.out.println(lengthOfLongestSubstring("bbbbb")); // Expected: 1
        System.out.println(lengthOfLongestSubstring("pwwkew")); // Expected: 3
    }
}`,
    },
    expectedOutput: {
      javascript: "3\n1\n3",
      python: "3\n1\n3",
      java: "3\n1\n3",
    },
  },

  "product-of-array-except-self": {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array • Prefix Sum",
    description: {
      text: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
      },
      {
        input: "nums = [-1,1,0,-3,3]",
        output: "[0,0,9,0,0]",
      },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁵", "-30 ≤ nums[i] ≤ 30", "Product of any prefix or suffix fits in a 32-bit integer"],
    starterCode: {
      javascript: `function productExceptSelf(nums) {
  // Write your solution here
  
}

// Test cases
console.log(JSON.stringify(productExceptSelf([1,2,3,4]))); // Expected: [24,12,8,6]
console.log(JSON.stringify(productExceptSelf([-1,1,0,-3,3]))); // Expected: [0,0,9,0,0]`,
      python: `def productExceptSelf(nums):
    # Write your solution here
    pass

# Test cases
print(productExceptSelf([1,2,3,4]))  # Expected: [24, 12, 8, 6]
print(productExceptSelf([-1,1,0,-3,3]))  # Expected: [0, 0, 9, 0, 0]`,
      java: `import java.util.*;

class Solution {
    public static int[] productExceptSelf(int[] nums) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(productExceptSelf(new int[]{1,2,3,4}))); // Expected: [24, 12, 8, 6]
        System.out.println(Arrays.toString(productExceptSelf(new int[]{-1,1,0,-3,3}))); // Expected: [0, 0, 9, 0, 0]
    }
}`,
    },
    expectedOutput: {
      javascript: "[24,12,8,6]\n[0,0,9,0,0]",
      python: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
      java: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
    },
  },
};

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
};