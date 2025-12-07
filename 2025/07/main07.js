const Mapper = require('../../Mapper');

const map = new Mapper('input.txt')
const startPos = map.find(c => c === 'S');
const firstBeamPos = {x: startPos.x, y: startPos.y + 1};

let answer1 = 0;

map.addCount(firstBeamPos.x, firstBeamPos.y, 1);

for (let row = firstBeamPos.y; row < map.height; row++) {
  for (let x of map.getColsForRow(row)) {
    const count = map.getCount(x, row);
    if (map.get(x, row) === '^') {
      x > 0 && map.addCount(x - 1, row + 1, count);
      x < map.width - 1 && map.addCount(x + 1, row + 1, count);
      answer1++;
    } else {
      map.addCount(x, row + 1, count);
    }
  }
}

let answer2 = map.getCountsForRow(map.height - 1);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 1598 Answer2: 4509723641302
