const utils = require('../utils');

const data = {
  lines: []
};

utils.processLine(line => {
  data.lines.push(parseInt(line));
}, 'input.txt');

console.log('There are', data.lines.length, 'rows');

function findPair(array, target) {
  let result = false;
  return array.filter(number => array.indexOf(target - number) >= 0 && 2*number !== target).length;
}

//Hittade inget par för  258585477
const process = preamble => {
  for (var i = preamble ; i < data.lines.length ; i++) {
    if (!findPair(data.lines.slice(i - preamble, i), data.lines[i])) {
      console.log('Hittade inget par för ', data.lines[i]);
      return data.lines[i];
    }
  }
}

const sum = process(25);

function findSum(aSum) {
  for (var i = 0 ; i < data.lines.length - 1 ; i++) {
    let currentSum = 0;
    for (var j = i ; j < data.lines.length ; j++) {
      currentSum += data.lines[j];
      if (currentSum === aSum) {
        let solution = data.lines.slice(i, j + 1);
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