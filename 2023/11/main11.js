const utils = require('../../utils');
let map = utils.readFile('input2.txt')

const emptyRows = [];
const emptyCols = [];
const expandEmpty = (aMap) => {
  for (let row = aMap.length - 1; row >= 0 ; row--) {
    if (aMap[row].indexOf('#') === -1) {
      emptyRows.push(row);
    }
  }
  for (let col = aMap[0].length - 1; col >= 0 ; col--) {
    let isEmpty = true;
    for (let row = aMap.length - 1; row >= 0 ; row--) {
      if (aMap[row][col] === '#') {
        isEmpty = false;
        break;
      }
    }
    if (isEmpty) {
      emptyCols.push(col);
    }
  }
}
expandEmpty(map);

const findGalaxies = (aMap) => {
  const result = [];
  for (let row = 0 ; row < aMap.length ; row++) {
    for (let col = 0 ; col < aMap[0].length ; col++) {
      if (aMap[row][col] === '#') {
        result.push({row, col});
      }
    }
  }
  return result;
};

const galaxies = findGalaxies(map);
const getDistances = (emptyDistance) => {
  const distances = {};
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const fromRow = galaxies[i].row;
      const toRow   = galaxies[j].row;
      const fromCol = Math.min(galaxies[i].col, galaxies[j].col);
      const toCol = Math.max(galaxies[i].col, galaxies[j].col);

      const distance = toRow - fromRow + toCol - fromCol;
      const emptyRow = emptyRows.filter(row => row > fromRow && row < toRow).length;
      const emptyCol = emptyCols.filter(col => col > fromCol && col < toCol).length;
      distances[i + ',' + j] = distance + emptyDistance * (emptyRow + emptyCol);
    }
  }
  return utils.sumArray(Object.values(distances));
}

let answer1 = getDistances(1);
let answer2 = getDistances(999999);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 9550717 Answer2: 648458253817
