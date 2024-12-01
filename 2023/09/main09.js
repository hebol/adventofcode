const utils = require('../../utils');

let arrayList = utils.processLine(line => {
  const numbers = line.split(' ').map(Number);
  const results = [numbers];
  while (results[results.length - 1].find(n => n !== 0)) {
    const row = results[results.length - 1];
    const next = [];
    for (let i = 0; i < row.length - 1; i++) {
      next.push(row[i + 1] - row[i]);
    }
    results.push(next);
  }
  for (let i = results.length - 1 ; i >= 0 ; i--) {
    const oldLast = i < results.length - 1 ? results[i + 1][results[i + 1].length - 1] : 0;
    const oldFirst = i < results.length - 1 ? results[i + 1][0] : 0;
    results[i].push( results[i][results[i].length - 1] + oldLast);
    results[i].unshift( results[i][0] - oldFirst);
  }

  return {first: results[0][0], last: results[0][results[0].length - 1]};
}, 'input2.txt');

let answer1 = utils.sumArray(arrayList.map(({first}) => first));
let answer2 = utils.sumArray(arrayList.map(({last}) => last));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 1129 Answer2: 1934898178
