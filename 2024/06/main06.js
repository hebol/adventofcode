const Mapper = require('../../Mapper');

const walkMap = (map) => {
  const dirs = [{dx:0, dy:-1}, {dx:1, dy:0},{dx:0, dy:1},{dx:-1, dy:0}];
  const alreadyWalked = {};
  let currentDir = 0;
  let {x, y} = map.findMultiple(c => c === '^')[0];

  const getKey = () => {
    return x + ',' + y + ',' + currentDir;
  }
  const markPos = () => {
    let key = getKey();
    if (alreadyWalked[key]) {
      return false;
    }
    alreadyWalked[key] = true;
    return true;
  }
  markPos();
  while (true) {
    map.set(x, y, 'X');
    const nextX = x + dirs[currentDir].dx;
    const nextY = y + dirs[currentDir].dy;
    if (!map.isValidPos(nextX, nextY)) {
      break;
    }
    if (map.get(nextX, nextY) === '#') {
      currentDir = (currentDir + 1) % 4;
    } else {
      x = nextX;
      y = nextY;
    }
    if (!markPos()) {
      return null;
    }
  }
  return map;
}

let mapper = new Mapper('input.txt');
const startPos = mapper.findMultiple(c => c === '^')[0];
let map1 = walkMap(mapper.clone());
let answer1 = map1.findMultiple(c => c === 'X').length;
let answer2 = 0;

for (let x = 0 ; x < mapper.width ; x++) {
  for (let y = 0 ; y < mapper.height ; y++) {
    if ((x !== startPos.x || y !== startPos.y) && (map1.get(x, y) === 'X')) {
      const map = mapper.clone();
      map.set(x, y, '#');
      if (!walkMap(map)) {
        answer2++;
      }
    }
  }
}

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 5551 Answer2: 1939
