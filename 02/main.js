const utils = require('../utils');
let arrayList = utils.readFile()

const regexp = /(\d+)-(\d+) ([a-zA-Z]): ([a-zA-Z]+)$/

arrayList = arrayList.map(data => {
  try {
    const result = data.match(regexp);
    const returnValue =  {
      min: parseInt(result[1]),
      max: parseInt(result[2]),
      char: result[3],
      password: result[4],
    };
    returnValue.count = (returnValue.password.match(new RegExp(returnValue.char, "g")) || []).length
    //console.log('Res', data, returnValue);
    return returnValue;
  } catch (e) {
    console.log(data, 'SNAFU', e);
  }
});

//arrayList = arrayList.filter(entry => entry.count >= entry.min && entry.count <= entry.max);
arrayList = arrayList.filter(entry => {
  let count = entry.password[entry.min - 1] == entry.char ? 1 : 0;
  count += entry.password[entry.max - 1] == entry.char ? 1 : 0;
  return count === 1;
});
console.log('Now', arrayList.length)

//console.log('Found', arrayList);

