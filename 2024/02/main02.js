const utils = require('../../utils');
let arrayList = utils.readFile('input.txt').map(s => s.split(' ').map(n => parseInt(n, 10)));

const isSafe = okRemoveOne => {
  return (array) => {
    function isOk(anArray) {
      const factor = anArray[0] > anArray[1] ? 1 : -1;
      for (let i = 0; i < anArray.length - 1; i++) {
        const diff = (anArray[i] - anArray[i + 1]) * factor;
        if (diff < 0 || diff === 0 || diff > 3) {
          return false;
        }
      }
      return true;
    }

    let result = isOk(array);
    if (!result && okRemoveOne) {
      let numbers = Array.from(Array(array.length).keys());
      return numbers.find(i => {
        return isOk(array.toSpliced(i, 1));
      }) !== undefined;
    }
    return result;
  }
}

let answer1 = arrayList.filter(isSafe(false)).length;
let answer2 = arrayList.filter(isSafe(true)).length;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 390 Answer2: 439
