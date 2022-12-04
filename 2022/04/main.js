const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

const answer1 = arrayList.filter(line => {
  const [[start1, end1], [start2, end2]] = line.split(',').map(pair => pair.split('-').map(n => parseInt(n)));

  return (start1 >= start2 && end1 <= end2) || (start2 >= start1 && end2 <= end1);
}).length;

const answer2 = arrayList.filter(line => {
  const [[start1, end1], [start2, end2]] = line.split(',').map(pair => pair.split('-').map(n => parseInt(n)));

  return (start2 <= end1  && end2 >= start1) || (start1 <= end2  && end1 >= start2);
}).length;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 567 Answer2: 907
