const utils = require('../../utils');
let data = utils.readRawFile('input.txt');

const re = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)|(?<on>do\(\))|(?<off>don\'t\(\))/g;
const matches = data.matchAll(re);

let enabled = true;
let answer1 = 0, answer2 = 0;

for (const match of matches) {
  enabled = (match.groups.on) ? true : (match.groups.off) ? false : enabled;
  let answer = match.groups.a * match.groups.b;
  if (answer) {
    answer1 += answer;
    if (enabled) {
      answer2 += answer;
    }
  }
}

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 175700056 Answer2: 71668682
