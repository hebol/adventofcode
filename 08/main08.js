const utils = require('../utils');

const bags = {
};

utils.processLine(line => {
  const match = line.match(/^([a-z]{3}) ([+\-][0-9]+)$/)
})

const containGoldDirectly = Object.values(bags.colors).filter(entry => {
  return Object.values(entry.children).filter(entry => entry.color === 'shiny gold').length > 0;
})
containGoldDirectly.forEach(entry => entry.gold = true);
let modified = true;
do {
  modified = false;
  Object.values(bags.colors).forEach(entry => {
    if (Object.values(entry.children).filter(subEntry => subEntry.gold).length > 0 && !entry.gold) {
      entry.gold = true;
      modified = true;
    }
  })
} while (modified)

const answer1 = Object.values(bags.colors).filter(entry => entry.gold);

//144
console.log('Bags that can contain "shiny gold"', answer1.length);

const processBag = (aBag) => {
  return 1 + aBag.childrenRaw.reduce((rest, subBag) => {
    return rest + subBag.count * processBag(bags.colors[subBag.color]);
  }, 0)
}

// 5956
console.log('Bag count in Shiny gold', processBag(bags.colors['shiny gold']) - 1);
