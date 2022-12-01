const utils = require('../../utils');
let answer1 = -1, answer2 = -1;

let partSum = 0;
const sums = [];

utils.readFileNoFilter('input.txt').forEach((line) => {
  if (line.length) {
    partSum += parseInt(line);
  } else {
    sums.push(partSum);
    partSum = 0;
  }
});
answer1 = Math.max(...sums);
answer2 = utils.sumArray(sums.sort(utils.numericalSort).slice(-3));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 69501 Answer2: 202346
