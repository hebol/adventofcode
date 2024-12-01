const utils = require('../../utils');
let arrayList = utils.readFile('input2.txt')

const surrounding = (row, col, array) => {
  const result = [];
  (row > 0)                   && result.push(array[row-1][col]);
  (row < array.length - 1)    && result.push(array[row+1][col]);
  (col > 0)                   && result.push(array[row][col-1]);
  (col < array[0].length - 1) && result.push(array[row][col+1]);

  return result;
}

const surroundingNotNine = (row, col, array) => {
  const result = [];
  (row > 0)                   && array[row-1][col] !== '9' && result.push({row:row-1, col});
  (row < array.length - 1)    && array[row+1][col] !== '9' && result.push({row:row+1, col});
  (col > 0)                   && array[row][col-1] !== '9' && result.push({row:row, col:col-1});
  (col < array[0].length - 1) && array[row][col+1] !== '9' && result.push({row:row, col:col+1});
  return result;
}

function isLowPoint(array, row, col) {
  return array[row][col] < Math.min(...surrounding(row, col, array));
}

const findLowestPoints = array => {
  const result = [];
  for (let row = 0 ; row < array.length ; row++) {
    for (let col = 0 ; col < array[0].length ; col++) {
      if (isLowPoint(array, row, col)) {
        result.push({row, col});
      }
    }
  }
  return result;
}

let answer1, answer2;

answer1 = utils.sumArray(findLowestPoints(arrayList).map(({row,col})=>parseInt(arrayList[row][col])+1));

const findBasins = (points,array) => {
  function pointToCol(point) {
    return point.row + '_' + point.col;
  }

  const result = points.map(point => {
    const basin = {};
    basin[pointToCol(point)] = 1;
    let newPoints = surroundingNotNine(point.row, point.col, array);
    while (newPoints.length > 0) {
      const testPoint = newPoints.pop();
      if (!basin[pointToCol(testPoint)]) {
        basin[pointToCol(testPoint)] = 1;
        newPoints = newPoints.concat(surroundingNotNine(testPoint.row, testPoint.col, array));
      }
    }
    return Object.keys(basin).length;
  });
  return result.sort((a,b)=>a-b).splice(-3).reduce((rest,part)=>rest*part, 1);
}

answer2 = findBasins(findLowestPoints(arrayList), arrayList);

console.log("Answer1:", answer1, "Answer2", answer2);
// Answer1: 577 Answer2 1069200
