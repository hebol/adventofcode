const utils = require('../utils');

let direction = 'E';
let x = 0;
let y = 0;

utils.processLine(line => {
  const match = line.match(/([A-Z]])([0-9]+)/)

  console.log(match[1], match[2]);
}, 'test1.txt');

console.log('Distance is', x+y);