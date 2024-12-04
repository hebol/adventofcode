const utils = require('../../utils');
const Mapper = require('../../Mapper');
let map = new Mapper('input.txt');

let startPosList = map.findMultiple((c) => c === 'X');
let startPosList2 = map.findMultiple((c) => c === 'A');

const words = startPosList.map(({x:startX, y:startY}) => {
  const directions = map.getAllDir();
  const wordParts = "MAS".split('');
  return directions.filter(dir => {
    let result = true;
    for (let i = 1 ; i <= wordParts.length; i++) {
      const x = dir[0] * i + startX;
      const y = dir[1] * i + startY;
      if (map.get(x, y) !== wordParts[i-1]) {
        result = false;
        break
      }
    }
    return result;
  })
})

const words2 = startPosList2.filter(({x:startX, y:startY}) => {
  const str1 = (map.get(startX - 1, startY - 1) + map.get(startX + 1, startY + 1)).split('').sort().join('');
  const str2 = (map.get(startX - 1, startY + 1) + map.get(startX + 1, startY - 1)).split('').sort().join('');
  return str1 === 'MS' && str2 === 'MS';
})

let answer1 = utils.sumArray(words.map(array => array.length));
let answer2 = words2.length;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 2536 Answer2: 1875
