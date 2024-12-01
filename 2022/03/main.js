const utils = require('../../utils');
let arrayList = utils.readFile('input2.txt')

let answer1 = -1, answer2 = -1;

function stringToMap(s) {
  const result = {};
  for (let i = 0; i < s.length; i++) {
    result[s[i]] = (result[s[i]] || 0) + 1;
  }
  return result;
}

function getScore(inRight) {
  let result;
  if (inRight >= 'a' && inRight <= 'z') {
    result = inRight.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  } else {
    result = inRight.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
  }
  return result;
}

answer1 = utils.sumArray(arrayList.map(line => {
  const left = stringToMap(line.substring(0, line.length / 2));
  const right = stringToMap(line.substring(line.length / 2));
  const leftArray = Object.keys(left);
  const inRight = leftArray.find(key => right[key]);
  return getScore(inRight);
}));

answer2 = 0;
for (let i = 0; i < arrayList.length; i += 3) {
  const leftArray = Object.keys(stringToMap(arrayList[i]));
  const middle = stringToMap(arrayList[i + 1]);
  const right = stringToMap(arrayList[i + 2]);
  const inMiddle = leftArray.filter(key => middle[key]);
  const inRight = leftArray.filter(key => right[key]);
  answer2 += getScore(inRight.find(key => inMiddle.indexOf(key) >= 0));
}

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 8240 Answer2: 2587
