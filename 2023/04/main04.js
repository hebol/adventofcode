const utils = require('../../utils');

const result = utils.processLine(line => {
  const match = line.match(/Card\s+(\d+): (.*)\|(.*)/);
  const card = {
    number: match[1],
    numbers: match[2].split(' ').filter(n=>n.length).map(n => parseInt(n)),
    winners: match[3].split(' ').filter(n=>n.length).map(n => parseInt(n)),
  }
  return card.numbers.filter(n => card.winners.includes(n)).length;
}, 'input.txt');

const counts = new Array(result.length).fill(1);
for ( let i = 0 ; i < result.length; i++) {
  for (let j = 1 ; j <= result[i] ; j++) {
    counts[i+j] += counts[i];
  }
}

let answer1 = utils.sumArray(result.map(c => c ? 2**(c-1) :0));
let answer2 = utils.sumArray(counts);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 18619 Answer2: 8063216
