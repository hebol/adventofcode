const utils = require('../utils');

let data = utils.processLine(line => {
  const binary = line.replaceAll(/[BR]/g, '1').replaceAll(/[FL]/g, '0');
  return parseInt(binary, 2)
}).sort((a,b) => a-b);

let found;
data.reduce((rest, now) => {
  if (now > rest + 1) {
    found = rest + 1;
  }
  return now;
}, data.shift());

console.log('Högsta är', Math.max(...data));
console.log('Hittade min plats:', found);

//Högsta är 915
//Hittade min plats: 699
