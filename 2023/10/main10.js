const utils = require('../../utils');
let map = utils.readFile('input2.txt')

let startPos;
map.forEach((row, index) => {
  const colIndex = row.indexOf('S');
  if (colIndex >= 0) {
    startPos = {x: colIndex, y: index};
  }
});

const path = [startPos];
let nextPos;
const getPossible = ({x,y}, oldPos) => {
  let possible = [];
  const current = map[y][x];
  if (y > 0) {
    const above = map[y - 1][x];
    if ((above === '7' || above === 'F' || above === '|') && "SLJ|".indexOf(current) >= 0) {
      possible.push({x, y: y - 1});
    }
  }
  if (y < map.length - 1) {
    const below = map[y + 1][x];
    if ((below === 'L' || below === 'J' || below === '|') && "SF7|".indexOf(current) >= 0) {
      possible.push({x, y: y + 1});
    }
  }
  if (x > 0) {
    const left = map[y][x-1];
    if ((left === 'L' || left === 'F' || left === '-') && "SJ7-".indexOf(current) >= 0) {
      possible.push({x: x-1, y: y});
    }
  }
  if (x < map[y].length - 1) {
    const right = map[y][x+1];
    if ((right === 'J' || right === '7' || right === '-') && "SLF-".indexOf(current) >= 0) {
      possible.push({x: x+1, y: y});
    }
  }
  possible = possible.filter(pos => {
    return !oldPos || oldPos.x !== pos.x || oldPos.y !== pos.y;
  })
  return possible;
};

do {
  const possible = getPossible(path[path.length - 1], path[path.length - 2]);
  if (possible.length === 0) {
    break;
  } else {
    nextPos = possible[0];
    path.push(nextPos);
  }
  //console.log('Adding', nextPos, 'to', path);
} while (nextPos !== startPos)

//create a map with same size as map but with only '.'
const cleanMap = map.map(row => row.split('').map(() => '.').join(''));

const showMap = (aMap) => {
  console.log('');
  aMap.forEach((row) => {
    console.log(row);
  });
}

const setPosInMapTo = (aMap, {x, y}, char) => {
  aMap[y] = aMap[y].slice(0, x) + char + aMap[y].slice(x+1);
};
path.forEach(({x, y}) => {
  setPosInMapTo(cleanMap, {x, y}, map[y][x]);
});

for (let i = 0; i < cleanMap[0].length ; i++) {
  if (cleanMap[0][i] === '.') {
    setPosInMapTo(cleanMap, {x: i, y: 0}, 'O');
  }
  if (cleanMap[cleanMap.length - 1][i] === '.') {
    setPosInMapTo(cleanMap, {x: i, y: cleanMap.length - 1}, 'O');
  }
}
for (let i = 0; i < cleanMap.length ; i++) {
  if (cleanMap[i][0] === '.') {
    setPosInMapTo(cleanMap, {x: 0, y: i}, 'O');
  }
  if (cleanMap[i][cleanMap[0].length - 1] === '.') {
    setPosInMapTo(cleanMap, {x: cleanMap[0].length - 1, y: i}, 'O');
  }
}
let modified;
do {
  modified = false;
  for (let y = 1; y < cleanMap.length - 1; y++) {
    for (let x = 1; x < cleanMap[0].length - 1; x++) {
      if (cleanMap[y][x] === '.') {
        const above = cleanMap[y - 1][x];
        const below = cleanMap[y + 1][x];
        const left = cleanMap[y][x - 1];
        const right = cleanMap[y][x + 1];
        if (above === 'O' || below === 'O' || left === 'O' || right === 'O') {
          setPosInMapTo(cleanMap, {x, y}, 'O');
          modified = true;
        }
      }
    }
  }
} while (modified);

let answer2 = 0;
const first = path[1];
const last = path[path.length - 1];
const diff = {x: last.x - first.x, y: last.y - first.y};

  // update start pos so that it is the right value
if (Math.abs(diff.y) === 2) {
  setPosInMapTo(cleanMap, startPos, '|');
}  else {
  if (Math.abs(diff.x) === 2) {
    setPosInMapTo(cleanMap, startPos, '-');
  }  else {
    const left = Math.min(last.x, first.x) < startPos.x;
    const up = Math.min(last.y, first.y) < startPos.y;
    const char = left ? (up ? 'J' : '7') : (up ? 'L' : 'F');
    setPosInMapTo(cleanMap, startPos, char);
  }
}
function getSeparatorString(x, y) {
  let leftString = cleanMap[y].slice(0, x).split('').filter(char => char !== '-').join('');
  leftString = leftString.replaceAll('L7', '|');
  return leftString.replaceAll('FJ', '|');
}

for (let y = 1; y < cleanMap.length - 1; y++) {
  for (let x = 1; x < cleanMap[0].length - 1; x++) {
    if (cleanMap[y][x] === '.') {
      let leftString = getSeparatorString(x, y);
      const numSeparators = leftString.split('').filter(char => char === '|').length;
      if (numSeparators % 2 === 1) {
        setPosInMapTo(cleanMap, {x, y}, 'I');
        answer2++;
      } else {
        setPosInMapTo(cleanMap, {x, y}, 'O');
      }
    }
  }
}

let answer1 = path.length / 2;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2: 397 too high
