const utils = require('../utils');
let arrayList = utils.readFile();

console.log('Data is:', arrayList);

let data = arrayList.map(entry => entry.replaceAll(/[BR]/g, '1').replaceAll(/[FL]/g, '0'));
data = data.map(entry => parseInt(entry, 2));
data = data.sort((a,b) => a-b);

let found;
data.reduce((rest, now) => {
  if (rest === -1) {
    return now;
  } else {
    if (now > rest + 1) {
      found = rest + 1;
    }
    return now;
  }
}, -1);
console.log('Högsta är', Math.max(...data));
console.log('Hittade min plats:', found);
