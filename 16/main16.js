const utils = require('../utils');

const fields = {}

let array = utils.readFile('test1.txt');
let rules = array.slice(0, array.indexOf('your ticket:'));
const yourTicket = array[array.indexOf('your ticket:') + 1];
const nearby = array.slice(array.indexOf('your ticket:') + 3);
rules.forEach(line => {
  const match = line.match(/([a-z]+): (\d+)-(\d+) or (\d+)-(\d+)/);
  console.log(match);
})

console.log({rules, yourTicket, nearby});
