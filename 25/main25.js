const utils = require('../utils');

const [cardPub, doorPub] = utils.readFile('input.txt').map(entry => parseInt(entry));

console.log({cardPub, doorPub});


function calcLoopCount(pub) {
  let subjNum = 1;
  let count = 0;
  while (subjNum !== pub) {
    subjNum = (subjNum * 7) % 20201227;
    count++;
  }
  return count;
}

let cardCount = calcLoopCount(cardPub);
let doorCount = calcLoopCount(doorPub);

console.log({cardCount, doorCount});

const calcEnc = (num, loop) => {
  let result = 1;
  for (let count = 0 ; count < loop ; count++) {
    result = (result * num) % 20201227;
  }
  return result;
}
const encryption = calcEnc(cardPub, doorCount);
console.log({encryption});