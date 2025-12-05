const Mapper = require('../../Mapper');
let map = new Mapper('input.txt');

const countAdjacent = (map, x, y, c) => {
  return Mapper.getAllDir().filter(([dx, dy]) => map.get(x + dx, y + dy) === c).length;
}

let answer1 = 0;
for (let x = 0; x < map.width; x++) {
  for (let y = 0; y < map.height; y++) {
    if (map.get(x, y) === '@' && countAdjacent(map, x, y, '@') < 4) {
      answer1++;
    }
  }
}

let answer2 = map.count('@');
let modified;
do {
  modified = false;
  for (let x = 0; x < map.width; x++) {
    for (let y = 0; y < map.height; y++) {
      if (map.get(x, y) === '@' && countAdjacent(map, x, y, '@') < 4) {
        map.set(x, y, '.');
        modified = true;
      }
    }
  }
} while (modified);

answer2 -= map.count('@');

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 1411 Answer2: 3753

