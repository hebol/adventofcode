const utils = require('../../utils');
let arrayList = utils.readFile('input.txt').map(line => line.trim().split(/ +/));
let operators = arrayList.pop();
arrayList = arrayList.map(array => array.map(Number));

let answer1 = 0;

const processGroup = (vals, op) => {
  return vals.reduce((acc, val) => op === '+' ? acc + val : acc * val, op === '+' ? 0 : 1);
}

while (arrayList[0].length > 0) {
  answer1 += processGroup(arrayList.map(arr => arr.pop()), operators.pop());
}

let arrayList2 = utils.readFileNoFilter('input.txt');
operators = arrayList2.pop().trim().split(/ +/);

const numbers = [];
let subArray = [];
while (arrayList2[0].length > 0) {
  let value = arrayList2.map(line => line.slice(-1)).join('').trim();
  arrayList2 = arrayList2.map(line => line.slice(0, -1));
  if (value.length) {
    subArray.push(Number(value));
  } else {
    numbers.push(subArray);
    subArray = [];
  }
}
if (subArray.length) {
  numbers.push(subArray);
}

let answer2 = 0;
while (numbers.length > 0) {
  answer2 += processGroup(numbers.pop(), operators.shift());
}

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 6503327062445 Answer2: 9640641878593
