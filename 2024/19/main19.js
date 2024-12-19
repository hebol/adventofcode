const utils = require('../../utils');
let targets = utils.readFile('input.txt');

const parts = targets.shift().split(',').map(s=>s.trim());

const solutions = {};
const canBeSolved = (parts, remaining, solution) => {
  if (remaining.length === 0) {
    return 1;
  } else {
    if (solutions[remaining] !== undefined) {
      return solutions[remaining];
    } else {
      const result = utils.sumArray(parts.map((p) => {
        if (remaining.startsWith(p)) {
          return canBeSolved(parts, remaining.slice(p.length), [...solution, p]);
        } else {
          return 0;
        }
      }));
      solutions[remaining] = result;
      return result;
    }
  }
};
let solutionList = targets.map(t => canBeSolved(parts, t, []));
let answer1 = solutionList.filter(r => r > 0).length;
let answer2 = utils.sumArray(solutionList);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 298 Answer2: 572248688842069
