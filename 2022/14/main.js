const utils = require('../../utils');
const map = {}

const toKey = (x, y) => x + '-' + y;
const toPoint = (key) => {
  const [x, y] = key.split('-').map(entry => parseInt(entry));
  return {x, y};
};

utils.processLine(line => {
  let x, y;
  line.split(' -> ').forEach(pair => {
    const [newX, newY] = pair.split(',').map(Number);
    if (x && y) {
      const path = utils.getPath(newX, x, newY, y);
      for (let i = 0; i < path.steps; i++) {
        map[(x + i * path.dx) + '-' + (y + i * path.dy)] = '#';
      }
    }
    map[ newX + '-' + newY] = '#';
    x = newX;
    y = newY;
  });

},'input.txt');

let {minX, maxX, maxY} = utils.findBounds(map, toPoint);

const directions = [[0,1],[-1,1],[1,1]];
const getRestPoint = (x, y) => {
  let result;
  while (x >= minX && x <= maxX && y <= maxY) {
    const found = directions.find(([xStep, yStep]) => {
      return !map[toKey(x+xStep, y+yStep)];
    });
    if (found) {
      x += found[0];
      y += found[1];
    } else {
      result = [x, y];
      break;
    }
  }
  return result;
}

while (true) {
  const restPoint = getRestPoint(500, 0);
  if (!restPoint) {
    break;
  }
  map[toKey(restPoint[0],restPoint[1])] = 'o';
}

let answer1 = Object.values(map).filter(val => val === 'o').length;

maxY += 2;
minX = 500 - maxY - 2;
maxX = 500 + maxY + 2;

const printMap = () => {
  for (let y = 0 ; y <= maxY; y++) {
    let line = '';
    for (let x = minX ; x < maxX; x++) {
      line += map[toKey(x, y)] || '.';
    }
    console.log(line);
  }
  console.log('');
}

for (let x = minX ; x < maxX; x++) {
  map[toKey(x,maxY)] = '#';
}

while (true) {
  const restPoint = getRestPoint(500, 0);
  map[toKey(restPoint[0],restPoint[1])] = 'o';
  if (restPoint[0] === 500 && restPoint[1] === 0) {
    break;
  }
}

let answer2 = Object.values(map).filter(val => val === 'o').length;
console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 862 Answer2: 28744
