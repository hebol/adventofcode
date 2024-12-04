const utils = require('../../utils');
let map = utils.readFile('input.txt').map(line => line.split(''));

let startPosList = []
let startPosList2 = []
for (let x = 0; x < map[0].length; x++) {
  for (let y = 0; y < map.length; y++) {
    if (map[y][x] === 'X') {
      startPosList.push({x, y});
    }
    if (map[y][x] === 'A') {
      startPosList2.push({x, y});
    }
  }
}

const words = startPosList.map(({x:startX, y:startY}) => {
  const directions = [[0, 1], [0, -1], [1,0], [1, 1], [1, -1], [-1,0], [-1, 1], [-1, -1]]
  const wordParts = "MAS".split('');
  return directions.filter(dir => {
    let result = true;
    for (let i = 1 ; i <= wordParts.length; i++) {
      const x = dir[0] * i + startX;
      const y = dir[1] * i + startY;
      if (x < 0 || x >= map[0].length || y < 0 || y >= map.length || map[y][x] !== wordParts[i-1]) {
        result = false;
        break
      }
    }
    return result;
  })
})

const words2 = startPosList2.filter(({x:startX, y:startY}) => {
  if (startX === 0 || startY === 0 || startX === map[0].length - 1 || startY === map.length - 1) {
    return false;
  }
  const str1 = (map[startY - 1][startX - 1] + map[startY + 1][startX + 1]).split('').sort().join('');
  const str2 = (map[startY + 1][startX - 1] + map[startY - 1][startX + 1]).split('').sort().join('');
  return str1 === 'MS' && str2 === 'MS';
})

let answer1 = utils.sumArray(words.map(array => array.length));
let answer2 = words2.length;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 2536 Answer2: 1875
