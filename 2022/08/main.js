const utils = require('../../utils');
let heightMap = utils.readFile('input.txt').map(line => line.split('').map(char => parseInt(char)));
let height = heightMap.length;
let width = heightMap[0].length;
let answer1 = -1, answer2 = -1;

const visible = {};

function isVisible(orgRow, orgCol, [dirRow, dirCol]) {
  const treeHeight = heightMap[orgRow][orgCol];
  let row = orgRow;
  let col = orgCol;
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

for (let row = 1 ; row < heightMap.length - 1 ; row++) {
  for (let col = 1 ; col < heightMap[0].length - 1 ; col++) {
    if (isVisible(row, col,  [0, 1]) ||
      isVisible(row, col,  [1, 0]) ||
      isVisible(row, col,  [-1, 0]) ||
      isVisible(row, col,  [0, -1])) {
      visible[row+'-'+col] = true;
    }
  }
}
answer1 = Object.keys(visible).length + 2 * height + 2 * width - 4;

function viewLength(orgRow, orgCol, [dirRow, dirCol]) {
  const treeHeight = heightMap[orgRow][orgCol];
  let row = orgRow;
  let col = orgCol;
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
    const score =
      viewLength(row, col, [0, 1]) *
      viewLength(row, col, [1, 0]) *
      viewLength(row, col, [-1, 0]) *
      viewLength(row, col, [0, -1]);
    answer2 = Math.max(answer2, score);
  }
}


console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 1693 Answer2: 422059
