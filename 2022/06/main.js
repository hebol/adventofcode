const utils = require('../../utils');
let message = utils.readFile('input.txt')[0];

let answer1 = -1, answer2 = -1;

function findUniqueLenFrom(len, start) {
  for (let i = start; i < message.length - len; i++) {
    let found = true;
    for (let j = 0; j < len; j++) {
      if (message.substring(i, i + len).indexOf(message[i + j]) !== j) {
        found = false;
        break;
      }
    }
    if (found) {
      return i + len;
    }
  }
}

answer1 = findUniqueLenFrom(4,3);
answer2 = findUniqueLenFrom(14, answer1 + 4);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 1042 Answer2: 2980
