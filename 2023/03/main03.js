const utils = require('../../utils');
const {sumArray} = require("../../utils");
let arrayList = utils.readFile('input.txt')

function getCharAt(col, row, aMap) {
  return row >=  0 && row < aMap.length && col >= 0 && col < aMap[row].length ? aMap[row][col] : '.';
}

const findNumbers = aMap => {
  const result = [];

  for (let row = 0 ; row < aMap.length ; row++) {
    let foundNumberAt = -1;
    for (let col = -1 ; col <= aMap[row].length ; col++) {
      const char = getCharAt(col, row, aMap);
      const isDigit = char >= '0' && char <= '9';
      if (foundNumberAt < 0 && isDigit) {
        foundNumberAt = col;
      } else {
        if (foundNumberAt >= 0 && !isDigit) {
          let foundNumber = aMap[row].substring(foundNumberAt, col);
          result.push({row, col: foundNumberAt, number: foundNumber});
          foundNumberAt = -1;
        }
      }
    }
  }
  return result;
}

const foundNumbers = findNumbers(arrayList);
const isConnected = (aMap) => {
  return ({row, col, number}) => {
    for (let aCol = col - 1; aCol <= col + number.length ; aCol++) {
      if ( getCharAt(aCol, row - 1, aMap) !== '.' || getCharAt(aCol, row + 1, aMap) !== '.' ) {
        return true;
      }
    }
    return getCharAt(col - 1, row, aMap) !== '.' || getCharAt(col + number.length, row, aMap) !== '.';
  };
};

const findStars = aMap => {
  const result = [];

  for (let row = 0 ; row < aMap.length ; row++) {
    for (let col = -1 ; col <= aMap[row].length ; col++) {
      if (getCharAt(col, row, aMap) === '*') {
        result.push({row, col});
      }
    }
  }
  return result;
}

let answer1 = sumArray(foundNumbers.filter(isConnected(arrayList)).map(a => parseInt(a.number)));

const answer2 = sumArray(findStars(arrayList).map(({row, col}) => {
  const nearNumbers = foundNumbers.filter(({row: numRow, col: numCol, number}) => {
    const toRight = numRow === row && col === numCol - 1;
    const toLeft = numRow === row && numCol + number.length === col;
    const above = numRow + 1 === row && numCol <= col + 1 && numCol + number.length >= col;
    const below = numRow - 1 === row && numCol <= col + 1 && numCol + number.length >= col;

    return toRight || toLeft || above || below;
  });
  if (nearNumbers.length === 2) {
    return parseInt(nearNumbers[0].number) * parseInt(nearNumbers[1].number);
  } else {
    return 0;
  }
}));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 556057 Answer2: 82824352
