const utils = require('../../utils');
const Mapper = require('../../Mapper');

const map = new Mapper('input.txt')
const startPos = map.find(c => c === 'S');
const firstBeamPos = {x: startPos.x, y: startPos.y + 1};

let answer1 = 0;
const counts = {}

const addCount = ({x,y}, c) => {
  const key = `${x},${y}`;
  counts[key] = (counts[key] || 0) + c;
}

const getCount = ({x, y}) => {
  const key = `${x},${y}`;
  return counts[key] || 0;
}

function getColsForRow(row) {
  return Object.keys(counts).filter(key => key.endsWith(`,${row}`)).map(key => parseInt(key.split(',')[0]));
}

const getCountsForRow = (row) => {
  return Object.keys(counts).filter(key => key.endsWith(`,${row}`)).map(key => counts[key]).reduce((a, b) => a + b, 0);
}

addCount(firstBeamPos, 1);

for (let row = firstBeamPos.y; row < map.height; row++) {
  for (let x of getColsForRow(row)) {
    const count = getCount({x, y: row});
    if (map.get(x, row) === '^') {
      x > 0 && addCount({x: x - 1, y: row + 1}, count);
      x < map.width - 1 && addCount({x: x + 1, y: row + 1}, count);
      answer1++;
    } else {
      addCount({x, y: row + 1}, count);
    }
  }
}

let answer2 = getCountsForRow(map.height - 1);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 1598 Answer2: 4509723641302
