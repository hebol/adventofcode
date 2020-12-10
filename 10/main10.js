const utils = require('../utils');

const lines = [];

utils.processLine(line => {
  lines.push(parseInt(line));
}, 'input.txt');

lines.sort((a,b) => a-b);

console.log('There are', lines.length, 'rows', lines);
