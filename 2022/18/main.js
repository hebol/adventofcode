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

function setExternal(x, y, z, aMap) {
  if (!aMap[`${x},${y},${z}`]) {
    aMap[`${x},${y},${z}`] = '.';
  }
}

const setExternalFree = (aMap) => {
  for (let i = min; i <= max; i++) {
    for (let j = min; j <= max; j++) {
      setExternal(i, j, min, aMap);
      setExternal(i, j, max, aMap);
      setExternal(i, min, j, aMap);
      setExternal(i, max, j, aMap);
      setExternal(min, i, j, aMap);
      setExternal(max, i, j, aMap);
    }
  }
}
setExternalFree(map);
const analyze = Object.keys(map).filter(key => !(map[key] === '#'));

function isValid(x, y, z) {
  return x >= min && x <= max && y >= min && y <= max && z >= min && z <= max;
}

while (analyze.length) {
  const [x,y,z] = analyze.shift().split(',').map(Number);
  directions.forEach(([dx, dy, dz]) => {
    let newKey = `${x+dx},${y+dy},${z+dz}`;
    if (isValid(x+dx, y+dy, z+dz) && !map[newKey]) {
      map[newKey] = '.';
      analyze.push(newKey);
    }
  })
}
let answer2 = answer1 - countFree(map);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 4536 Answer2: 2606
