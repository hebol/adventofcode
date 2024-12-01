const utils = require('../../utils');
let heightMap = utils.readFile('input2.txt').map(line => line.split('').map(char => parseInt(char)));
let height = heightMap.length;
let width = heightMap[0].length;
let answer1, answer2 = -1;

const visible = {};
const directions = [[0,1], [1,0], [0,-1], [-1,0]];

function isVisible(row, col, [dirRow, dirCol]) {
  const treeHeight = heightMap[row][col];
  while (true) {
    row += dirRow;
    col += dirCol;
    if ( row < 0 || col < 0 || row >= height || col >= width) {
      return true;
    }
    if (heightMap[row][col] >= treeHeight) {
      return false;
    }
  }
}

function viewLength(row, col, [dirRow, dirCol]) {
  const treeHeight = heightMap[row][col];
  let steps = 0;
  while (true) {
    row += dirRow;
    col += dirCol;
    if ( row < 0 || col < 0 || row >= height || col >= width) {
      return steps;
    }
    steps++;
    if ( heightMap[row][col] >= treeHeight) {
      return steps;
    }
  }
}


for (let row = 1 ; row < heightMap.length - 1 ; row++) {
  for (let col = 1 ; col < heightMap[0].length - 1 ; col++) {
    if (directions.find(dir => isVisible(row, col, dir))) {
      visible[row+'-'+col] = true;
      const score = directions.reduce((acc, dir) => acc * viewLength(row, col, dir), 1);
      answer2 = Math.max(answer2, score);
    }
  }
}
answer1 = Object.keys(visible).length + 2 * height + 2 * width - 4;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 1693 Answer2: 422059
