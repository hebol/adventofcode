const utils = require('../../utils');
const Mapper = require('../../Mapper');
let map = new Mapper('input.txt');

const answer1 = utils.sumArray(map.findMultiple((c) => c === 'X')
  .map(({x:startX, y:startY}) => {
    const wordParts = "MAS".split('');
    return map.getAllDir().filter(dir => {
      for (let i = 1 ; i <= wordParts.length; i++) {
        if (map.get(dir[0] * i + startX, dir[1] * i + startY) !== wordParts[i-1]) {
          return false;
        }
      }
      return true;
    }).length;
}));

const answer2 = map.findMultiple((c) => c === 'A')
  .filter(({x:startX, y:startY}) => {
    const str1 = (map.get(startX - 1, startY - 1) + map.get(startX + 1, startY + 1)).split('').sort().join('');
    const str2 = (map.get(startX - 1, startY + 1) + map.get(startX + 1, startY - 1)).split('').sort().join('');
    return str1 === 'MS' && str2 === 'MS';
}).length;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 2536 Answer2: 1875
