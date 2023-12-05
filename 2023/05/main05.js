const utils = require('../../utils');

let seeds;
const maps = utils.processMultiLine((lines, index) => {
  if (!seeds) {
    seeds = lines[0].split(':')[1].trim().split(' ').map(n => parseInt(n));
  } else {
    const map = { name: lines[0].match(/([a-z\-]+) map:/)[1], maps: []};

    for (let i = 1; i < lines.length; i++) {
      const match = lines[i].match(/(\d+) (\d+) (\d+)/);
      map.maps.push({
        destination: parseInt(match[1]),
        source: parseInt(match[2]),
        length: parseInt(match[3]),
      });
    }
    return map;
  }
}, 'input.txt');
maps.shift(); // Empty map at the beginning since seeds are read there

const getValueFromMap = (value, map) => {
  const found = map.maps.find(aMap => value >= aMap.source && value < (aMap.source + aMap.length));
  return found ? found.destination + (value - found.source) : value;
}

let answer1 = Math.min(...seeds.map(seed => maps.reduce((value, map) => getValueFromMap(value, map), seed)));

let answer2 = Number.POSITIVE_INFINITY;
for (let i = 0 ; i < seeds.length ; i += 2) {
  console.log('turn', (i / 2) + 1, seeds[i], seeds[i+1], 'min was', answer2);
  for (let j = 0 ; j < seeds[i+1] ; j++) {
    answer2 = Math.min(maps.reduce((value, map) => getValueFromMap(value, map), seeds[i] + j), answer2);
  }
}

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 322500873 Answer2: 108956227

