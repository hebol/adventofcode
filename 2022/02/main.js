const utils = require('../../utils');
let arrayList = utils.readFile('input.txt').map(line => line.split(' '));

let answer1 = -1, answer2 = -1;

const scoreMap = {
  'A': [3, 6, 0],
  'B': [0, 3, 6],
  'C': [6, 0, 3],
}

const optionMap = {
  'A': ['Z', 'X', 'Y'],
  'B': ['X', 'Y', 'Z'],
  'C': ['Y', 'Z', 'X'],
}

function countScore(me, op) {
  return me.charCodeAt(0) - 87 + scoreMap[op][me.charCodeAt(0) - 88];
}

answer1 = utils.sumArray(arrayList.map(([op, me]) => countScore(me, op)));

answer2 = utils.sumArray(arrayList.map(([op, select]) => countScore(optionMap[op][select.charCodeAt(0) - 88], op)));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 14375 Answer2: 10274
