const utils = require('../utils');

const visitedLines = {
};

utils.processLine(line => {
  const match = line.match(/^([a-z]{3}) ([+\-][0-9]+)$/);
  console.log(match)
}, 'test1.txt');

//const answer1 = Object.values(bags.colors).filter(entry => entry.gold);
//console.log('Bag count in Shiny gold', processBag(bags.colors['shiny gold']) - 1);
