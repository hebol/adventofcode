const utils = require('../utils');

const lines = [];

utils.processLine(line => {
  lines.push(parseInt(line));
}, 'input.txt');

lines.sort((a,b) => a-b);

lines.push(Math.max(...lines) + 3);

console.log('There are', lines.length, 'rows', lines);
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

console.log('Answer1', steps[1]* steps[3], steps);
console.log(diffSteps)

const diffStepCopy = diffSteps.slice();
let oneLen = 0;
let stepGroups = [[]];
diffSteps.forEach(entry => {
  if (entry === 3) {
    stepGroups.push([]);
  } else {
    stepGroups[stepGroups.length - 1].push(entry)
  }
})
stepGroups = stepGroups.filter(entry => entry.length);
console.log(stepGroups)

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
// wrong 21134460321792

/*
1 => 1 => 1
2 => 2 => 2, 1+1
3 => 4 => 3, 1+2, 2+1, 1+1+1
4 => 7 => 1+3, 2+2, 3+1, 1+1+2, 2+1+1, 1+2+1, 1+1+1+1

0, 1, 2, 5

0, 2, 5
0, 1, 2, 5

start, 1, 1, 1, end
 */