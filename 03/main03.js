const utils = require('../utils');
let arrayList = utils.readFile()

const isTree = (x, y) => {
  if (y < arrayList.length) {
    return arrayList[y][x] === '#';
  } else {
    return false;
  }
}

const findTree = (xStep, yStep) => {
  let x = 0, y = 0;

  let count = 0;
  while (y < arrayList.length) {
    x = (x + xStep) % arrayList[0].length;
    y += yStep;
    count += isTree(x, y) ? 1 : 0;
  }

  console.log('Is now on row', y, 'found', count, 'trees, using', {xStep, yStep});
  return count;
}

const array = [
  findTree(1, 1),
  findTree(3, 1),
  findTree(5, 1),
  findTree(7, 1),
  findTree(1, 2)
];

console.log('Result', array, array.reduce((rest, now) => rest * now), 1);
