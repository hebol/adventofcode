const utils = require('../utils');
//let arrayList = utils.readFileNoFilter('test1.txt')
//let arrayList = utils.readFileNoFilter('inputt2.txt')
let arrayList = utils.readFileNoFilter()

let current = null
let sum = 0;
while (arrayList.length > 0) {
  const line = arrayList.shift();
  if (line.length > 0) {
    if (true) {
      current = current || {};
      line.split("").forEach(char => current[char] = char);
    } else {
      if (current) {
        let common = Object.keys(current).filter(char => line.indexOf(char) >= 0);
        current = common.reduce((rest, char) => {
          rest[char] = char;
          return rest;
        }, {})
      } else {
        current = {};
        line.split("").forEach(char => current[char] = char);
      }
    }
  } else {
    !current && console.log('Line', line);
    if (current) {
      sum += Object.keys(current).length;
    }
    current = null;
  }
}
console.log('Result', sum);
