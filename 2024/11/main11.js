const utils = require('../../utils');
let start = utils.readRawFile('input.txt').split(' ').map(Number).reduce((acc, entry) => {
  acc[entry] = 1;
  return acc;
}, {})

let current = {...start}
const processEntry = (key) => {
  if (key === 0) {
    return [1];
  } else {
    const stringKey = (key + '')
    if (stringKey.length % 2 === 0) {
      return [stringKey.substring(0, stringKey.length / 2), stringKey.substring(stringKey.length / 2)];
    } else {
      return [key * 2024];
    }
  }
};

let answer1;

for (let i = 0 ; i < 75 ; i++) {
  current = Object.entries(current).reduce((acc, [key, count]) => {
    processEntry(parseInt(key)).forEach((number) => {
      acc[number] = (acc[number] || 0) + count;
    });
    return acc;
  }, {});
  if (i === 24) {
    answer1 = utils.sumArray(Object.values(current));
  }
}

let answer2 = utils.sumArray(Object.values(current));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 231278 Answer2: 274229228071551
