const ExpressError = require('./errorClass');

//function to validate query and return the numbers as an array
function validateAndReturnNumsArray(data) {
  if (!data) {
    throw new ExpressError('Numbers required', 400);
  };
  const nums = data.split(',').map((n) => {
    if (!parseInt(n)) {  //take string and turn into a number 
      throw new ExpressError(`${n} is not a number`, 400)  //throw error if value can not be converted
    };
    return parseInt(n);  //returns array of integers
  });
  return nums;
}



function findMean(nums) {
    const total = nums.reduce((acc, c) => acc + c, 0);  //add all numbers of array using reduce
    return total / nums.length;  //divide by # of numbers
}

function findMedian(arr) {
  const mid = Math.floor(arr.length / 2);  //find index of middle number
  const nums = [...arr].sort((a, b) => a - b);  // sort array in order
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;  // handle even vs odd # of nums- if odd, average middle two nums
}

function createFrequencyCounter(arr) {  // count occurrances of a number and return count key/values in an array
  return arr.reduce(function(acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

function findMode(arr) {
  let freqCounter = createFrequencyCounter(arr);  //get key value pairs

  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
    }
  }

  return +mostFrequent;  //returns key of most frequent number (which is a string and turns it into an integer with '+')
}

//export functions
module.exports = {
  validateAndReturnNumsArray,
  findMean,
  findMedian,
  findMode
}
