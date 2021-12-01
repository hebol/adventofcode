const utils = require('../../utils');
let arrayList = utils.readFile('test.txt')

let lastValue = null;

let increasedSingle = arrayList.reduce((rest, value)=>{
  const wasIncreased = lastValue !== null && lastValue < parseInt(value);
  if (wasIncreased) {
    rest++;
  }
  lastValue = value;
  return rest;
}, 0);

let lastValues = [];

let increasedThreeWindow = arrayList.reduce((rest, value)=> {
  if (lastValues.length === 3) {
    if (lastValues[0] < value) {
      rest++;
    }
    lastValues = lastValues.slice(1);
  }
  lastValues.push(parseInt(value));
  return rest;
}, 0);

console.log({increasedSingle, increasedThreeWindow});
