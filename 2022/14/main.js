const utils = require('../../utils');
const map = {}

const toMapKey = ({x, y}) => x + '-' + y;
const toMapPoint = (key) => {
  const [x, y] = key.split('-').map(entry => parseInt(entry));
  return {x, y};
};

utils.processLine(line => {
  let x, y;
  line.split(' -> ').forEach(pair => {
    const [newX, newY] = pair.split(',').map(Number);
    if (x && y) {
      const path = utils.getPath(x, newX, y, newY);
      for (let i = 0; i < path.steps; i++) {
        map[toMapKey({x:(x + i * path.dx),y:(y + i * path.dy)})] = '#';
      }
    }
    x = newX;
    y = newY;
    map[toMapKey({x,y})] = '#';
  });

},'input2.txt');

let {minX, maxX, maxY} = utils.findMapBounds(map, toMapPoint);

const directions = [[0,1],[-1,1],[1,1]];
const getRestPoint = ({x, y}) => {
  let result;
  while (x >= minX && x <= maxX && y <= maxY) {
    const found = directions.find(([xStep, yStep]) => {
      return !map[toMapKey({x:x+xStep, y:y+yStep})];
    });
    if (found) {
      x += found[0];
      y += found[1];
    } else {
      result = {x, y};
      break;
    }
  }
  return result;
}

while (true) {
  const restPoint = getRestPoint({x:500, y:0});
  if (!restPoint) {
    break;
  }
  map[toMapKey(restPoint)] = 'o';
}

let answer1 = Object.values(map).filter(val => val === 'o').length;
maxY += 2;
minX = 500 - maxY - 2;
maxX = 500 + maxY + 2;

const printMap = () => {
  for (let y = 0 ; y <= maxY; y++) {
    let line = '';
    for (let x = minX ; x < maxX; x++) {
      line += map[toMapKey({x, y})] || '.';
    }
    console.log(line);
  }
  console.log('');
}

for (let x = minX ; x < maxX; x++) {
  map[toMapKey({x, y:maxY})] = '#';
}

while (true) {
  const restPoint = getRestPoint({x:500, y:0});
  map[toMapKey(restPoint)] = 'o';
  if (restPoint.x === 500 && restPoint.y === 0) {
    break;
  }
}

let answer2 = Object.values(map).filter(val => val === 'o').length;
console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 862 Answer2: 28744
