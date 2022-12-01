const utils = require('../../utils');

let arrayList = utils.readFileNoFilter('input.txt')

let answer1 = -1, answer2 = -1;

let partSum = 0;
const sums = [];

arrayList.forEach((line) => {
  if (line.length) {
    partSum += parseInt(line);
  } else {
    sums.push(partSum);
    partSum = 0;
  }
});
answer1 = Math.max(...sums);
answer2 = sums.sort((a,b)=>a-b).slice(-3).reduce((a, b) => a + b, 0);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2
