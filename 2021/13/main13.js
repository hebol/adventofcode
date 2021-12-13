const utils = require('../../utils');

let arrayList = utils.readFileNoFilter('input.txt');

let answer1 = -1, answer2 = -1;

const displayGrid = grid => {
  grid.forEach(line => {
    console.log(line.map(c => c === '#' ? '#' : '.').join(''));
  })
  console.log('');
}

function foldRowAt(row, pos) {
  const result = JSON.parse(JSON.stringify(row.slice(0, pos - 1)));
  for (let i = 0 ; i < pos ; i++) {
    const newChar = row[i] === '#' || row[row.length - i - 1] === '#' ? '#' : '.';
    result[i] = newChar;
  }
  return result;
}

function foldAt(array, pos) {
  const result = JSON.parse(JSON.stringify(array.slice(0, pos)));

  for (let row = 0 ; row < array.length - pos - 1 ; row++) {
    for (let c = 0 ; c < array[row].length ; c++) {
      const newChar = array[row][c] === '#' || array[array.length - row - 1][c] === '#' ? '#' : '.';
      result[row][c] = newChar;
    }
  }
  return result;
}

const processList = (array,foldCount) => {
  const folds    = [];
  const startPos = [];
  let findFolds  = false;

  array.forEach(line => {
    if (line.length === 0) {
      findFolds = true;
    } else {
      if (findFolds) {
        const data = line.match(/fold along ([xy])=(\d+)/);
        folds.push({dir:data[1],pos:parseInt(data[2])});
      } else {
        const [x,y] = line.split(',');
        startPos.push({x,y});
      }
    }
  });

  const rows = startPos.reduce((rest,{x,y}) => Math.max(y,rest), 0) + 1;
  const cols = startPos.reduce((rest,{x,y}) => Math.max(x,rest), 0) + 1;
  let map = new Array(rows);
  for(let r = 0 ; r < rows ; r++) {
    map[r] = new Array(cols).fill('.');
  }
  startPos.forEach(pos => map[pos.y][pos.x] = '#');

  folds.slice(0, foldCount).forEach(fold => {
    if (fold.dir === 'x') {
      map = map.map(row => foldRowAt(row, fold.pos));
    } else {
      map = foldAt(map, fold.pos);
    }
  });
  !foldCount && displayGrid(map);
  return map.reduce((rest,line) => rest + line.filter(c => c === '#').length, 0)
}

answer1 = processList(arrayList, 1);
answer2 = processList(arrayList);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2
