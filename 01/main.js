const utils = require('../utils');
let arrayList = utils.readFile()

arrayList = arrayList.map(data => parseInt(data));
arrayList.sort((a,b) => a-b);
const hash = arrayList.reduce((old, val) => {old[val] = val; return old;}, {});

const findPair = (array, sum) => {
  const result = array.filter(entry => hash.hasOwnProperty(sum - entry));
  if (result.length > 0) {
    console.log('Sum', sum, 'is from', result);
  }
  //console.log('Found', result);
  return result;
}

const result = findPair(arrayList, 2020);
console.log('Found', result);
console.log('Found', result[0] * result[1]);

const result2 = arrayList.filter(entry => findPair(arrayList, 2020 - entry).length > 0);
console.log('Found', result2);
console.log('Found', result2[0] * result2[1] * result2[2]);
