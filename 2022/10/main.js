const utils = require('../../utils');
const xVal = []
let x = 1;
utils.processLine(line => {
  const [op, val] = line.split(' ');
  xVal.push(x);
  if (op === 'addx') {
    xVal.push(x);
    x += parseInt(val);
  }
},'input2.txt')

const posArray = [20, 60, 100, 140, 180, 220];

const answer1 = utils.sumArray(posArray.map(pos => {
  return pos * xVal[pos-1];
}));

const image = new Array(6).fill(new Array(40).fill(' ').join(''));
for (let i = 0; i < image.length * image[0].length; i++) {
  const col = i % 40;
  const row = Math.floor(i / 40);
  if (Math.abs(xVal[i] - col) <= 1) {
    image[row] = image[row].substring(0, col) + '#' + image[row].substring(col + 1);
  }
}
image.forEach(row => console.log(row));

console.log("Answer1:", answer1, "Answer2:", 'RFKZCPEF');
// Answer1:  Answer2: RFKZCPEF
