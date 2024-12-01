const utils = require('../../utils');
let id = 0;
let bricks = utils.processLine(line => {
  const [l, startX, startY, startZ, endX, endY, endZ] = line.match(/(\d+),(\d+),(\d+)~(\d+),(\d+),(\d+)/);
  return { startX: parseInt(startX), startY: parseInt(startY), startZ: parseInt(startZ),
    endX: parseInt(endX), endY: parseInt(endY),endZ: parseInt(endZ),
    id:id++
  };
}, 'input.txt');

const maxZ = bricks.reduce((max, brick) => Math.max(max, brick.endZ), 0);
const brickMap = utils.arrayToMap(bricks, 'id');

const getBrickAt = (x, y, z) => {
  return bricks.find(brick => brick.startX <= x && brick.endX >= x &&
    brick.startY <= y && brick.endY >= y &&
    brick.startZ <= z && brick.endZ >= z);
};
const isFreeBelow = (aBrick) => {
  for (let x = aBrick.startX ; x <= aBrick.endX ; x++) {
    for ( let y = aBrick.startY ; y <= aBrick.endY ; y++) {
      if (getBrickAt(x, y, aBrick.startZ - 1)) {
        return false;
      }
    }
  }
  return true;
};

for (let i = 1 ; i <= maxZ ; i++) {
  let layer = bricks.filter(brick => brick.startZ === i);
  for (const brick of layer) {
    while (isFreeBelow(brick) && brick.startZ > 1) {
      brick.startZ--;
      brick.endZ--;
    }
  }
}

for (let aBrick of bricks) {
  aBrick.supports = {};
  for (let x = aBrick.startX ; x <= aBrick.endX ; x++) {
    for ( let y = aBrick.startY ; y <= aBrick.endY ; y++) {
      const found = getBrickAt(x, y, aBrick.endZ + 1);
      if (found) {
        aBrick.supports[found.id] = true;
        found.supportedBy ??= {};
        found.supportedBy[aBrick.id] = true;
      }
    }
  }
}

const safeToRemove = bricks.filter(brick => {
  if (Object.keys(brick.supports).length === 0) {
    return true;
  } else {
    return Object.keys(brick.supports).filter(key => Object.keys(brickMap[key].supportedBy).length === 1).length === 0;
  }
});

const safeToRemoveMap = utils.arrayToMap(safeToRemove, 'id');
const soloSupporters = bricks.filter(brick => Object.keys(brick.supports).length > 0 && !safeToRemoveMap[brick.id]);

const fallen = soloSupporters.map(brick => {
  const removed = {};
  removed[brick.id] = true;
  const toInvestigate = Object.keys(brick.supports);

  while (toInvestigate.length > 0) {
    const id = toInvestigate.shift();
    if (Object.keys(brickMap[id].supportedBy).filter(bId => !removed[bId]).length === 0) {
      removed[id] = true;
      toInvestigate.push(...Object.keys(brickMap[id].supports));
    }
  }
  return Object.keys(removed).length - 1;
});

let answer1 = safeToRemove.length;
let answer2 = utils.sumArray(fallen);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 503 Answer2: 98431
