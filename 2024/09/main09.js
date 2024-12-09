const utils = require('../../utils');
let string = utils.readRawFile('input.txt')

let result = [];
for (let i = 0 ; i < string.length; i++) {
  let value = '.';
  let number = parseInt(string[i]);
  if ( i % 2 === 0) {
    value = i / 2;
  }
  for (let j = 0 ; j < number; j++) {
    result.push(value);
  }
}

function calcChecksum(aResult) {
  let result = 0;
  for (let i = 0; i < aResult.length; i++) {
    let resultElement = aResult[i] !== '.' ? parseInt(aResult[i]) : 0;
    result += resultElement * i;
  }
  return result;
}

const calc1 = (aResult) => {
  let result = [...aResult]
  for (let i = 0; i < result.length; i++) {
    if (result[i] === '.') {
      result[i] = result[result.length - 1];
      result.length = result.length - 1;
      while (result[result.length - 1] === '.') {
        result.length = result.length - 1;
      }
    }
  }
  return calcChecksum(result);
}

const calc2 = (aResult) => {
  let result = [...aResult];
  let startPos = result.length - 1;
  const getFile = (aPos) => {
    for (let i = aPos; i >= 0; i--) {
      if (result[i] !== result[aPos]) {
        return result.slice(i + 1, aPos + 1);
      }
    }
    return null;
  };

  const removeFile = (file, pos) => {
    for (let i = 0; i < file.length; i++) {
      result[pos + i] = '.';
    }
  };
  const moveIfFits = (file, endPos) => {
    for (let i = 0; i < endPos; i++) {
      if (result[i] === '.') {
        let foundSpot = true;
        for (let j = 1; j < file.length ; j++) {
          if (result[i + j] !== '.') {
            foundSpot = false;
            break;
          }
        }
        if (foundSpot) {
          for (let j = 0; j < file.length; j++) {
            result[i + j] = file[j];
          }
          return true
        }
      }
    }
    return false;
  };

  let file = getFile(startPos);
  while (file !== null) {
    if (moveIfFits(file, startPos - file.length)) {
      removeFile(file, startPos - file.length + 1);
    } else
    startPos -= file.length;
    while (result[startPos] === '.') {
      startPos--;
    }
    file = getFile(startPos);
  }
  return calcChecksum(result);
}

let answer1 = calc1(result);
let answer2 = calc2(result);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 6607511583593 Answer2: 6636608781232
