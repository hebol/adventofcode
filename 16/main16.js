const utils = require('../utils');

const fields = {}

let array = utils.readFile('test2.txt');
let rules = array.slice(0, array.indexOf('your ticket:'));
const yourTicket = array[array.indexOf('your ticket:') + 1].split(',');
const nearby = array.slice(array.indexOf('your ticket:') + 3).map(entry => entry.split(',').map(text => parseInt(text)));
rules.forEach(line => {
  const match = line.match(/([a-z]+): (\d+)-(\d+) or (\d+)-(\d+)/);
  //console.log(match);
  fields[match[1]] = {
    rules: [[parseInt(match[2]), parseInt(match[3])], [parseInt(match[4]), parseInt(match[5])]]
  }
});

//console.log({rules, yourTicket, nearby, fields:JSON.stringify(fields, 2)});

const list = nearby.map(entry => {
  return entry.filter(number => {
    return !Object.values(fields).find( rule => {
      return (rule.rules[0][0] <= number && rule.rules[0][1] >= number) ||
        (rule.rules[1][0] <= number && rule.rules[1][1] >= number);
    })
  })
});

console.log('Answer 1', [].concat.apply([], list).reduce((rest, part) => rest + part, 0));

const okTickets = nearby.filter(entry => {
  return !entry.find(number => {
    return !Object.values(fields).find( rule => {
      return (rule.rules[0][0] <= number && rule.rules[0][1] >= number) ||
        (rule.rules[1][0] <= number && rule.rules[1][1] >= number);
    })
  })
});

console.log({okTickets});