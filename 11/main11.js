const utils = require('../utils');

//const start = utils.readFile('test2-1.txt');
//const start = utils.readFile('test1.txt');
const start = utils.readFile();

const printGrid = (array, title) => {
  console.log(title || '');
  array.forEach(row => console.log(row));
  console.log('');
}

function get(array, row, col) {
  return array[row][col];
}

function isChair(array, row, col) {
  const char = get(array, row, col);
  return char === '#' || char === 'L';
}

const offsets = [[-1, -1], [ 0, -1], [ 1, -1],
                 [-1,  0],           [ 1,  0],
                 [-1,  1], [ 0,  1], [ 1,  1]]

function isValid(array, row, col) {
  return row >= 0 && col >= 0 && row < array.length && col < array[row].length;
}

function countNeigbours(array, row, col) {
  return offsets.reduce((rest, pos) => {
    const r = row + pos[1];
    const c = col + pos[0];
    let result = isValid(array, r, c) && get(array, r, c) === '#' ? 1 : 0;
    return rest + result;
  }, 0)
}

function countNeigbours2(array, row, col) {
  return offsets.reduce((rest, pos) => {
    let r = row;
    let c = col;
    let char = '.';
    while (char === '.') {
      r += pos[1];
      c += pos[0];
      char = isValid(array, r, c) ? get(array, r, c) : 'L';
    }
    let result = char === '#' ? 1 : 0;
    //console.log({row, col, r, c, char, result})
    return rest + result;
  }, 0)
}

//printGrid(start, 'Start');
//console.log(countNeigbours2(start, 9, 2));

const processStep = (input, counter, limit) => {
  const result = [];
  for (var row = 0 ; row < input.length ; row++) {
    result.push("");
    for (var col = 0 ; col < input[row].length ; col++) {
      let nextChar = '.';
      if (isChair(input, row, col)) {
        const count = counter(input, row, col);
        //console.log({row, col, count})
        if (count === 0) {
          nextChar = '#';
        } else {
          if (count >= limit) {
            nextChar = 'L';
          } else {
            nextChar = get(input, row, col);
          }
        }
      }
      result[row] += nextChar;
    }
  }
  return result;
};

function countOccupied(array) {
  return array.join().match(/#/g).length;
}

const runTest = (counter, limit) => {
  let oldStep;
  let newStep = JSON.stringify(start);
  let stepCount = 0;
  do {
    oldStep = newStep;
    stepCount++;
    newStep = JSON.stringify(processStep(JSON.parse(oldStep), counter, limit));
    //printGrid(JSON.parse(newStep), 'Step: ' + stepCount);
  } while (newStep !== oldStep)

  return countOccupied(JSON.parse(oldStep))
}

//2299
console.log('Answer 1:', runTest(countNeigbours, 4));

//2047
console.log('Answer 2:', runTest(countNeigbours2, 5));

