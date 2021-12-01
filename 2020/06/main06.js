const utils = require('../utils');

let problem1 = utils.processMultiLine(lines => {
  return Object.keys(lines.reduce((rest, line) => {
    line.split("").forEach(char => rest[char] = char);
    return rest;
  }, {})).length;
});

let problem2 = utils.processMultiLine(lines => {
  let commonKeys = lines.shift().split("");
  lines.forEach(line => {
    commonKeys = commonKeys.filter(char => line.indexOf(char) >= 0);
  })
  return commonKeys.length;
});

console.log(utils.sumArray(problem1));
console.log(utils.sumArray(problem2));
