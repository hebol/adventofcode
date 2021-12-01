const utils = require('../utils');

const lines = [];

utils.processLine(line => {
  lines.push(parseInt(line));
}, 'input.txt');

console.log('There are', lines.length, 'rows');

function findPair(array, target) {
  return array.filter(number => array.indexOf(target - number) >= 0 && 2*number !== target).length;
}

//Hittade inget par för  258585477
const process = preamble => {
  for (var i = preamble ; i < lines.length ; i++) {
    if (!findPair(lines.slice(i - preamble, i), lines[i])) {
      console.log('Hittade inget par för ', lines[i]);
      return lines[i];
    }
  }
}

const sum = process(25);

function findSum(aSum) {
  for (var i = 0 ; i < lines.length - 1 ; i++) {
    let currentSum = 0;
    for (var j = i ; j < lines.length ; j++) {
      currentSum += lines[j];
      if (currentSum === aSum) {
        let solution = lines.slice(i, j + 1);
        const min = Math.min(...solution);
        const max = Math.max(...solution);
        console.log('Lösning 2 hittad', solution, {min, max});
        return min+max;
      }
    }
  }
}
//Lösning 2 36981213
console.log('Lösning 2', findSum(sum));