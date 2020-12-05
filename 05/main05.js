const utils = require('../utils');
let arrayList = utils.readFile();

console.log('Data is:', arrayList);

let data = arrayList.map(entry => entry.replaceAll(/[BR]/g, '1').replaceAll(/[FL]/g, '0'));
data = data.map(entry => {return {row: entry.substring(0,7), col: entry.substring(7)}});
data = data.map(entry => {return {row: parseInt(entry.row, 2), col: parseInt(entry.col, 2)}});
data = data.map(entry => entry.row * 8 + entry.col);
console.log('Result', data, Math.max(...data));
data = data.sort((a,b) => a-b);
console.log('Result', data);
data.reduce((rest, now) => {
  if (rest === -1) {
    return now;
  } else {
    if (now > rest + 1) {
      console.log('Found it!!', rest + 1);
    }
    return now;
  }
}, -1);
