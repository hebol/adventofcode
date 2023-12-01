const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

let answer1 /*= arrayList.map(line => {
  const match1 = line.match(/^[^0-9]*([0-9]).*([0-9])[^0-9]*$/);
  let result;
  if (match1) {
    result = match1[1] + match1[2];
  } else {
    const match2 = line.match(/([0-9])/);
    result = match2[1] + match2[1];
  }
  return result;
}).reduce((acc, val) => {
  return acc + parseInt(val);
}, 0);*/

let answer2 = arrayList.map(line => {
  const orgLine = line;
  const numberArray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const lowestNumber = numberArray.reduce((acc, val) => {
    const found = line.indexOf(val);
    if (found >= 0 && (acc === -1 || found < acc)) {
      return found;
    }
    return acc;
  }, -1);
  console.log(lowestNumber);
  for (let i = 0; i < line.length && (i <= lowestNumber && lowestNumber >= 0); i++) {
    const substring = line.substring(i);
    const found = numberArray.find(number => substring.startsWith(number));
    if (found) {
      line = line.substring(0, i) + (numberArray.indexOf(found) + 1) + line.substring(i + found.length);
      break;
    }
  }
  const highestNumber = numberArray.reduce((acc, val) => {
    const found = line.lastIndexOf(val);
    if (found >= 0) {
      return Math.max(acc, found);
    }
    return acc;
  }, -1);

  const firstIndex = numberArray.map((number, index) => {
    let found = line.lastIndexOf(number);
    if (found >= 0) {
      return {found, val:index+1}
    }
  });
  const highest = firstIndex.reduce((acc, val) => {
    if (val && val.found > acc.found) {
      return val;
    }
    return acc;
  }, {found:-1, val:-1});
  if (highest.found >= 0 && highest.found >= highestNumber) {
    line = line.substring(0, highest.found) + highest.val + line.substring(highest.found + numberArray[highest.val-1].length);
  }

  const match1 = line.match(/^[^0-9]*([0-9]).*([0-9])[^0-9]*$/);
  let result;
  if (match1) {
    result = match1[1] + match1[2];
  } else {
    const match2 = line.match(/([0-9])/);
    result = match2[1] + match2[1];
  }
  console.log(orgLine, line, result);
  return result;
}).reduce((acc, val) => {
  return acc + parseInt(val);
}, 0);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2: //NOT: 54669, 54683
