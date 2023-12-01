const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

function findNumber(line, includeWords) {
  const numberArray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const numbers = [];

  for (let i = 0; i < line.length; i++) {
    const substring = line.substring(i);
    const charHere = line.charAt(i);
    if (charHere >= '0' && charHere <= '9') {
      numbers.push(charHere);
    }
    if (includeWords) {
      const found = numberArray.find(number => substring.startsWith(number));
      if (found) {
        numbers.push((numberArray.indexOf(found) + 1) + '');
      }
    }
  }
  return parseInt(numbers[0] + numbers[numbers.length -1]);
}

let answer1 = utils.sumArray(arrayList.map(line => findNumber(line, false)));
let answer2 = utils.sumArray(arrayList.map(line => findNumber(line, true)));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 53921 Answer2: 54676
