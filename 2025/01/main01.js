const utils = require('../../utils');
let answer2 = 0;

const array = utils.readFile('input.txt').map(item => {
  let result = {dir: item[0], count: parseInt(item.substring(1), 10)};
  if (result.count > 100) {
    let fullRevolts = Math.floor(result.count / 100);
    answer2 += fullRevolts;
    result.count = result.count % 100;
  }
  return result;
});

let answer1 = 0;

array.reduce((acc, item) => {
  let result = (acc + (item.dir === 'L' ? -item.count : item.count));

  if ((result < 0) || result > 99) {
    if (acc !== 0) {
      answer2++;
    }
    result = result < 0 ? result + 100 : result - 100;
  } else {
    if (result === 0) {
      answer2++;
    }
  }
  if (result === 0) {
    answer1++;
  }
  return result;
}, 50)


console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 1026 Answer2: 5923
