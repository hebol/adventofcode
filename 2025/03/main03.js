const utils = require('../../utils');
let arrayList = utils.readFile('input.txt').map(line => line.split('').map(Number));

const findHighest = (line, len) => {
  const subline = line.slice(0, line.length - len);
  const max = Math.max(...subline);
  const foundAt = line.indexOf(max);
  let rest = len > 0 ? findHighest(line.slice(foundAt + 1), len - 1) : 0;
  let high = max * Math.pow(10, len);
  return high + rest;
}

const answer1 = utils.sumArray(arrayList.map(arr => findHighest(arr, 1)));

let answer2 = utils.sumArray(arrayList.map(arr => findHighest(arr, 11)));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 16887 Answer2:
