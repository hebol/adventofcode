const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

const a1 = [], a2 = [];
const cMap = {};
const data = arrayList.map(s => s.split(' ').filter(s => s.length).map(s=>parseInt(s)));
data.forEach(([n1, n2]) => {
  a1.push(n1);
  a2.push(n2);
  cMap[n2] = (cMap[n2] || 0) + 1;
});
a1.sort();
a2.sort();
const answer1 = utils.sumArray(a1.map((n, i) => Math.abs(n - a2[i])));
const answer2 = utils.sumArray(a1.map(n => cMap[n] * n || 0));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 1765812 Answer2: 20520794
