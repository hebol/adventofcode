const utils = require('../../utils');

const map = {}
let maxX,  minX;
utils.processLine(line => {
  const [x,y,z] = line.split(',').map(Number);
  map[`${x},${y},${z}`] = true;
  maxX = Math.max(maxX || x, x);
  maxX = Math.max(maxX, y);
  maxX = Math.max(maxX, z);
  minX = Math.min(minX || x, x);
  minX = Math.min(minX, y);
  minX = Math.min(minX, z);
},'input.txt')

const directions = [[-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1]];

function countFree(aMap) {
  return utils.sumArray(Object.keys(map).map(key => {
    const [x, y, z] = key.split(',').map(Number);
    let result = directions.filter(([dx, dy, dz]) => !aMap[`${x + dx},${y + dy},${z + dz}`]).length;
    if (result) {
      aMap[key] = true;
    }
    return result;
  }));
}

const answer1 = countFree(map)

const analyze = []
const airMap = {};
for (let i = minX - 1; i <= maxX + 1; i++) {
  for (let j = minX - 1; j <= maxX + 1; j++) {
    airMap[`${i},${j},${minX - 1}`] = '.';
    airMap[`${i},${j},${maxX + 1}`] = '.';
    airMap[`${i},${minX - 1},${j}`] = '.';
    airMap[`${i},${maxX + 1},${j}`] = '.';
    airMap[`${minX - 1},${i},${j}`] = '.';
    airMap[`${maxX + 1},${i},${j}`] = '.';
  }
}
analyze.push(...Object.keys(airMap));
const sumMap = {...airMap, ...map};

function isValid(x, y, z) {
  return x >= minX && x <= maxX && y >= minX && y <= maxX && z >= minX && z <= maxX;
}

console.log(minX, maxX);

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
