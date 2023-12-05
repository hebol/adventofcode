const utils = require('../../utils');
let arrayList = utils.readFileNoFilter('test.txt')

const seeds = arrayList[0].split(':')[1].trim().split(' ').map(n => parseInt(n));
const maps = [];
let currentMap;
for (let i = 1; i < arrayList.length; i++) {
  try {
    if (arrayList[i].trim().length === 0) {
      if (arrayList.length <= i + 1) {
        break;
      }
      const row = arrayList[++i];
      const match = row.match(/([a-z\-]+) map:/);
      currentMap = {
        name: match[1],
        maps: [],
      };
      maps.push(currentMap);
    } else {
      const match = arrayList[i].match(/(\d+) (\d+) (\d+)/);
      const aMap = {
        destination: parseInt(match[1]),
        source: parseInt(match[2]),
        length: parseInt(match[3]),
      };
      currentMap.maps.push(aMap);
    }
  } catch (err) {
    console.log('Error on line', i, arrayList[i], arrayList.length);
    throw err;
  }
}
const getValueFromMap = (value, map) => {
  //console.log('Looking at map', map.name, 'for value', value);
  const found = map.maps.find(aMap => {
    let result = value >= aMap.source && value < (aMap.source + aMap.length);
    //console.log('Looking at map', aMap, 'for value', value, '=>', result);
    return result;
  });
  if (found) {
    //console.log('Found', found, 'for value', value, 'in map', map.name);
    return found.destination + (value - found.source);
  } else {
    return value;
  }
}
const answers = seeds.map(seed => {
  return maps.reduce((value, map) => getValueFromMap(value, map), parseInt(seed));
});
console.log(answers);
const answers2 = [];

const cache = {}
for (let i = 0 ; i < seeds.length ; i += 2) {
  console.log(seeds[i], seeds[i+1])
  let min = seeds[i];
  let max = seeds[i+1] + seeds[i] - 1;
  const result1 = maps.reduce((value, map) => getValueFromMap(value, map), max);
  const result2 = maps.reduce((value, map) => getValueFromMap(value, map), min);
  console.log('result1', result1, 'result2', result2)
  answers2.push(Math.min(result1, result2));
}

let answer1 = Math.min(...answers);
let answer2 = Math.min(...answers2);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2: //225784066 too high
