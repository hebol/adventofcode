const utils = require('../utils');

const rules = {}

let array = utils.readFile('input.txt');
let rawRules = array.slice(0, array.indexOf('your ticket:'));
const yourTicket = array[array.indexOf('your ticket:') + 1].split(',');
const nearby = array.slice(array.indexOf('your ticket:') + 3).map(entry => entry.split(',').map(text => parseInt(text)));
rawRules.forEach(line => {
  const match = line.match(/([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/);
  rules[match[1]] = {
    name: match[1],
    limits: [[parseInt(match[2]), parseInt(match[3])], [parseInt(match[4]), parseInt(match[5])]]
  }
});

function ruleMatchesNumber(number) {
  return rule => {
    return (rule.limits[0][0] <= number && rule.limits[0][1] >= number) ||
      (rule.limits[1][0] <= number && rule.limits[1][1] >= number);
  };
}

const failedList = nearby.map(entry => {
  return entry.filter(number => {
    return Object.values(rules).find( ruleMatchesNumber(number)) === undefined
  })
});

console.log('Answer 1:', [].concat.apply([], failedList).reduce((rest, part) => rest + part, 0));

const okTickets = nearby.filter(entry => {
  return entry.find(number => {
    return !Object.values(rules).find( rule => ruleMatchesNumber(number)(rule))
  }) === undefined;
});

const labels = {};
let colCount = okTickets[0].length;
let cols = [...Array(colCount).keys()]

while (cols.length > 0) {
  cols.forEach(col => {
    const colData = okTickets.map(entry => entry[col]);
    const found = Object.values(rules).filter(rule => {
      return colData.find(number => {
        return !ruleMatchesNumber(number)(rule);
      }) === undefined;
    });
    if (found.length === 1) {
      delete rules[found[0].name];
      const index = cols.indexOf(col);
      cols = cols.slice(0, index).concat(cols.slice(index + 1));
      found[0].col = col;
      labels[found[0].name] = found[0];
    }
  });
}

const answer2 = Object.values(labels).filter(rule => rule.name.indexOf('departure') === 0).reduce((rest, entry) => {
  return rest * yourTicket[entry.col];
}, 1);

console.log('Answer 2:', answer2);

//Answer 1: 20048
//Answer 2: 4810284647569
