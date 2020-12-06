const utils = require('../utils');

let problem1 = utils.processMultiLine(null, lines => {
  return Object.keys(lines.reduce((rest, line) => {
    line.split("").forEach(char => rest[char] = char);
    return rest;
  }, {})).length;
});

let problem2 = utils.processMultiLine(null, lines => {
  var commonKeys = lines.shift().split("");
  lines.forEach(line => {
    commonKeys = commonKeys.filter(char => line.indexOf(char) >= 0);
  })
  return commonKeys.length;
});

console.log(problem1.reduce((rest, entry) => rest + entry, 0));
console.log(problem2.reduce((rest, entry) => rest + entry, 0));
