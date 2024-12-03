const utils = require('../../utils');
let data = utils.readFile('input.txt')[0];


const regex = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)|(?<on>do\(\))|(?<off>don\'t\(\))/g;
const matches = data.matchAll(regex);

let sum1 = 0, sum2 = 0;
let enabled = true;

for (const match of matches) {
  if (match.groups.on) {
    enabled = true;
  } else if (match.groups.off) {
    enabled = false;
  } else {
    sum1 += match.groups.a * match.groups.b;
    if (enabled) sum2 += match.groups.a * match.groups.b;
  }
}

console.log('Part 1:', sum1);