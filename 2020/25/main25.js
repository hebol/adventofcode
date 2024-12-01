const utils = require('../utils');

const [cardPub, doorPub] = utils.readFile('input2.txt').map(entry => parseInt(entry));

function calcLoopCount(pub) {
  let result = 1;
  let count = 0;
  while (result !== pub) {
    result = (result * 7) % 20201227;
    count++;
  }
  return count;
}

let doorCount = calcLoopCount(doorPub);

const calcEnc = (num, loop) => {
  let result = 1;
  for (let count = 0 ; count < loop ; count++) {
    result = (result * num) % 20201227;
  }
  return result;
}
const answer1 = calcEnc(cardPub, doorCount);
console.log({answer1});
