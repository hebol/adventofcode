const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

function findNumber(line, includeWords) {
  const numberArray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  let part1;

  for (let i = 0; i < line.length; i++) {
    const substring = line.substring(i);
    const charHere = line.charAt(i);
    if (charHere >= '0' && charHere <= '9') {
      part1 = charHere;
      break;
    }
    if (includeWords) {
      const found = numberArray.find(number => substring.startsWith(number));
      if (found) {
        part1 = (numberArray.indexOf(found) + 1);
        break;
      }
    }
  }
  let part2;
  for (let i = 0; i < line.length; i++) {
    const substring = line.substring(0, line.length - i);
    const charHere = line.charAt(line.length - i - 1);
    if (charHere >= '0' && charHere <= '9') {
      part2 = charHere;
      break;
    }
    if (includeWords) {
      const found = numberArray.find(number => substring.endsWith(number));
      if (found) {
        part2 = (numberArray.indexOf(found) + 1) + '';
        break;
      }
    }
  }
  return part1 + part2;
}

let answer1 = arrayList.map(line => findNumber(line, false)).reduce((acc, val) => {
  return acc + parseInt(val);
}, 0);
let answer2 = arrayList.map(line => findNumber(line, true)).reduce((acc, val) => {
  return acc + parseInt(val);
}, 0);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 53921 Answer2: 54676
