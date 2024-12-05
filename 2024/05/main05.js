const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

const rules = arrayList.filter(s => s.indexOf('|') >= 0).map(s => s.split('|').map(s=>parseInt(s)));
const tc = arrayList.filter(s => s.indexOf('|') < 0).map(s => s.split(',').map(s=>parseInt(s)));

const ok = tc.filter(t => {
  return rules.find(([first, second]) => {
    const i1 = t.indexOf(first);
    const i2 = t.indexOf(second);
    if (i1 >= 0 && i2 >= 0) {
      return i1 > i2;
    } else {
      return false;
    }
  }) === undefined;
});
const error = tc.filter(t => ok.indexOf(t) < 0);

let answer2 = error.reduce((total, update) => {
    const sortedUpdate = [...update].sort((p1,p2) => {
      return rules.some(rule => rule[0] === p1 && rule[1] === p2) ? -1 : 1
    })
    return total + sortedUpdate[Math.floor(update.length / 2)]
  }, 0)

let answer1 = utils.sumArray(ok.map(a => a[Math.floor(a.length / 2)]));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2:
