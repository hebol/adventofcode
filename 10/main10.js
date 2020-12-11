const utils = require('../utils');

const lines = [];

utils.processLine(line => {
  lines.push(parseInt(line));
}, 'input.txt');

lines.sort((a,b) => a-b);

lines.push(Math.max(...lines) + 3);

console.log('There are', lines.length, 'rows');
const steps = {
  1: 0,
  2: 0,
  3: 0
}

let current = 0;
let diffSteps = [];
lines.forEach(entry => {
  steps[entry - current] += 1;
  diffSteps.push(entry - current);
  current = entry;
})

//Answer1 2272 { '1': 71, '2': 0, '3': 32 }

console.log('Answer1', steps[1]* steps[3], steps);

let stepGroups = [[]];
diffSteps.forEach(entry => {
  if (entry === 3) {
    stepGroups.push([]);
  } else {
    stepGroups[stepGroups.length - 1].push(entry)
  }
})
stepGroups = stepGroups.filter(entry => entry.length);
//console.log(stepGroups)

const map = {
  '[1]': 1,
  '[1,1]': 2,
  '[1,1,1]': 4,
  '[1,1,1,1]': 7
}

function combinations(entry) {
  return map[JSON.stringify(entry)];
}

console.log('Answer 2', stepGroups.reduce((rest,entry) => combinations(entry) * rest, 1));
// Answer 2 84627647627264
/*
1 => 1 <= 1
2 => 2 <= 2, 1+1
3 => 4 <= 3, 1+2, 2+1, 1+1+1
4 => 7 <= 1+3, 2+2, 3+1, 1+1+2, 2+1+1, 1+2+1, 1+1+1+1
 */

const calculateCombinations = array => {
  const alternatives = [1, 2, 3];

  function extractRestFromArray(steps, array) {
    let sum = 0, numSteps = 0;
    array.forEach(step => {
      if (sum !== steps) {
        sum += step;
        numSteps += 1;
      }
    }, []);
    return sum === steps ? array.slice().splice(numSteps) : null;
  }

  return  alternatives.reduce((rest, entry) => {
    const tail = extractRestFromArray(entry, array);
    let result = rest + (tail ? 1 : 0);
    result += (tail && tail.length && calculateCombinations(tail) - 1);
//    console.log('Post =>', {entry, rest, array, tail, result});
    return result;
  }, 0);
}

//const alternatives = [[1],[1,2,1],[1,2],[1,1],[1,1,1],[1,1,1,1],[1,1,1,1,1],[1,1,1,1,1,1]];
const alternatives = [];
alternatives.forEach(entry => {
  console.log(JSON.stringify(entry), '=>', calculateCombinations(entry));
});
