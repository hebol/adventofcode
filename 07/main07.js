const utils = require('../utils');

//pale cyan bags contain 5 dull gray bags, 3 posh olive bags, 2 striped silver bags.

const bags = {
  colors: {},
  createColor: (color, children) => {
    bags.colors[color] = bags.colors[color] || {color:color}

      if (Array.isArray(color)) {
        console.log('SNAFU?');
      }

    if (children) {
      const childList = {};
      children.forEach(entry => {
        childList[entry.color] = bags.createColor(entry.color);
      });
      bags.colors[color].children = childList;
      bags.colors[color].childrenRaw = children;
    }

    return bags.colors[color];
  }
};

utils.processLine(line => {
  const match = line.match(/^(.*) bags contain (.*).$/)
  const children = match[2].split(',').map(part => {
    if (part !== 'no other bags') {
      const partMatch = part.match(/([0-9]+) (.*) bags?/);
      !partMatch && console.log('Failed parse', part);
      return {color: partMatch[2], count: parseInt(partMatch[1])};
    } else {
      return null;
    }
  }).filter(child => child);
  bags.createColor(match[1], children);
})

//console.log('Data is:', bags.colors);

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

// 144
console.log('has gold', answer1.length);

const gold = bags.colors['shiny gold'];
console.log(gold);

const processBag = (aBag) => {
  return 1 + aBag.childrenRaw.reduce((rest, subBag) => {
    console.log('Will have', subBag.count, subBag.color, 'bags');
    return rest + subBag.count * processBag(bags.colors[subBag.color]);
  }, 0)
}

console.log('Bag count', processBag(gold) - 1);
