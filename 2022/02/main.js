const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

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
  let point = 0;
  switch (me) {
    case 'X':
      point = 1;
      break;
    case 'Y':
      point = 2;
      break;
    case 'Z':
      point = 3;
      break;
  }
  return point + scoreMap[op][me.charCodeAt(0) - 88];
}

const scores = arrayList.map(line => {
  const [op, me] = line.split(' ');
  return countScore(me, op);
});

const scores2 = arrayList.map(line => {
  const [op, select] = line.split(' ');
  return countScore(optionMap[op][select.charCodeAt(0) - 88], op);
})

answer1 = utils.sumArray(scores);
answer2 = utils.sumArray(scores2);
console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 14375 Answer2: 10274
