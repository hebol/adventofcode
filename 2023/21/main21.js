const utils = require('../../utils');
let map = utils.readFile('input.txt').map(item => item.split(''));
let startRow = map.findIndex(item => item.indexOf('S') >= 0);
let startCol = map[startRow].indexOf('S');
map[startRow][startCol] = '.';
let possiblePos = {};
possiblePos[startRow + '_' + startCol] = {row:startRow, col:startCol};
const counts = [];
const isValid = (row, col) => {
  let aCol = col % map[0].length;
  let aRow = row % map.length;
  if (aCol < 0) {
    aCol += map[0].length;
  }
  if (aRow < 0) {
    aRow += map.length;
  }

  return map[aRow][aCol] !== '#';
}

for (let i = 0 ; i < 65 + 2 * 131 ; i++) {
  const dirs = {N: {row:-1, col:0}, S: {row:1, col:0}, W: {row:0, col:-1}, E: {row:0, col:1}};
  const options = Object.values(possiblePos);
  possiblePos = {};
  for (let pos of options) {
    for (let dir of Object.values(dirs)) {
      const newRow = pos.row + dir.row;
      const newCol = pos.col + dir.col;
      if (isValid(newRow, newCol)) {
        possiblePos[newRow + '_' + newCol] = {row:newRow, col:newCol};
      }
    }
  }
  counts[i] = Object.values(possiblePos).length;
}
const solveSecondGradeEquation = (values) => {
    // 0, 1, 2
  return {
    a: values[0] / 2 - values[1] + values[2] / 2,
    b: -3 * (values[0] / 2) + 2 * values[1] - values[2] / 2,
    c: values[0],
  };
};

let answer1 = counts[63];
let a0 = counts[65 - 1];
let a1 = counts[65 + 131 - 1];
let a2 = counts[65 + 2 * 131 - 1];
const poly = solveSecondGradeEquation([a0, a1, a2]);
const target = (26501365 - 65) / 131;
let answer2 =  poly.a * target * target + poly.b * target + poly.c;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 3853 Answer2: 639051580070841
