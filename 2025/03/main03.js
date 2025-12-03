const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

console.log(arrayList)

const answer1 = utils.sumArray(arrayList.map(array => {
  const line = array.split('').map(Number);
  const max = Math.max(...line);
  const foundAt = line.indexOf(max);
  if (foundAt === line.length - 1) {
    const max2 = Math.max(...line.slice(0, line.length - 1));
    return max2 * 10 + max;
  } else {
    const max2 = Math.max(...line.slice(foundAt + 1, line.length));
    return max * 10 + max2;
  }
}))

let answer2 = -1;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 16887 Answer2:
