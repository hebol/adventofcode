const utils = require('../../utils');
const Mapper = require("../../Mapper");
const map = Mapper.byDimensions(71, 71);
const blocks = utils.readFile('input.txt').map(line => line.split(',').map(Number));

const fillMap = (from, to) => {
  for (let i = from; i < to; i++) {
    const [x,y] = blocks[i];
    map.set(x, y, '#');
  }
}

const startPos = {x: 0, y: 0, steps:0};
const endPos = {x: map.width - 1, y: map.height - 1};

const investigateMap = end => {
  fillMap(0, end);
  const toInvestigate = [startPos];
  const alreadyTested = {};
  while (toInvestigate.length > 0) {
    const current = toInvestigate.shift();
    const key = `${current.x},${current.y}`;
    if (alreadyTested.hasOwnProperty(key)) {
      continue;
    }
    alreadyTested[key] = current.steps;
    if (current.x !== endPos.x || current.y !== endPos.y) {
      const dirs = Mapper.getOrtoDir();
      const newPos = dirs.filter(([dx, dy]) => {
        let key = `${current.x + dx},${current.y + dy}`;
        return map.isValidPos(current.x + dx, current.y + dy) &&
          map.get(current.x + dx, current.y + dy) !== '#' &&
          !alreadyTested.hasOwnProperty(key) || alreadyTested[key] > current.steps + 1;
      });
      newPos.forEach(([dx, dy]) => {
        toInvestigate.push({x: current.x + dx, y: current.y + dy, steps: current.steps + 1});
      });
    }
  }
  return alreadyTested[`${endPos.x},${endPos.y}`];
}

let answer2 = -1;

let answer1 = investigateMap(1024);
for (let i = 1024; i < blocks.length; i++) {
  if (investigateMap(i) === undefined) {
    const block = blocks[i-1];
    answer2 = block[0] + ',' + block[1];
    break;
  }
}

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 316 Answer2: 45,18
