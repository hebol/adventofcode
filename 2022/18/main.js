const utils = require('../../utils');

const map = {}
let max,  min;
utils.processLine(line => {
  const [x,y,z] = line.split(',').map(Number);
  map[`${x},${y},${z}`] = '#';
  max = Math.max(max || x, x);
  max = Math.max(max, y);
  max = Math.max(max, z);
  min = Math.min(min || x, x);
  min = Math.min(min, y);
  min = Math.min(min, z);
},'input.txt')

const directions = [[-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1]];

function countFree(aMap, simple) {
  return utils.sumArray(Object.keys(map).map(key => {
    if (aMap[key] === '#') {
      const [x, y, z] = key.split(',').map(Number);
      return directions.filter(([dx, dy, dz]) => !aMap[`${x + dx},${y + dy},${z + dz}`] &&
        (simple || isValid(x + dx, y + dy, z + dz))).length
    } else {
      return 0;
    }
  }));
}

const answer1 = countFree(map, true)

const analyze = []
const airMap = {};

function set(x, y, z) {
  if (!airMap[`${x},${y},${z}`]) {
    airMap[`${x},${y},${z}`] = '.';
  }
}
const printMap = (aMap) => {
  for (let z = min; z <= max; z++) {
    console.log('z=', z);
    for (let x = min; x <= max; x++) {
      let row = ''
      for (let y = min; y <= max; y++) {
        let key = `${x},${y},${z}`;
        row += aMap[key] ? aMap[key] : ' ';
      }
      console.log(row);
    }
  }
  console.log('');
}

for (let i = min; i <= max; i++) {
  for (let j = min; j <= max; j++) {
    set(i, j, min);
    set(i, j, max);
    set(i, min, j);
    set(i, max, j);
    set(min, i, j);
    set(max, i, j);
  }
}

const sumMap = {...airMap, ...map};
analyze.push(...Object.keys(sumMap).filter(key => !(sumMap[key] === '#')));

function isValid(x, y, z) {
  return x >= min && x <= max && y >= min && y <= max && z >= min && z <= max;
}

while (analyze.length) {
  const [x,y,z] = analyze.shift().split(',').map(Number);
  directions.forEach(([dx, dy, dz]) => {
    let newKey = `${x+dx},${y+dy},${z+dz}`;
    if (isValid(x+dx, y+dy, z+dz) && !sumMap[newKey]) {
      sumMap[newKey] = '.';
      analyze.push(newKey);
    }
  })
}
const part2 = countFree(sumMap)
let answer2 = answer1 - part2;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 4536 Answer2: 2606
