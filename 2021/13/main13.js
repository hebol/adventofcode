const utils = require('../../utils');

let arrayList = utils.readFileNoFilter('test.txt');

let answer1 = -1, answer2 = -1;

console.log(arrayList)
const processList = array => {
  let dots = [];
  const folds = [];
  let findFolds = false;
  let width = 0, height = 0;

  function addWidth(anArray, width) {
    return anArray.map(part => {
      if (part.length < width) {
        const newPart = part.concat(Array(width - part.length).fill(' '));
        console.log('Added width', width - part.length)
        part = newPart;
      }
      return part;
    })
  }

  for (let i = 0 ; i < array.length ; i++) {
    const line = array[i];
    if (line.length === 0) {
      findFolds = true;
      continue;
    }
    if (findFolds) {
      const data = line.match(/fold along ([xy])=(\d+)/);
      folds.push({dir:data[1],row:parseInt(data[2])});
    } else {
      const [x,y] = line.split(',');
      console.log({x,y,w:dots.length ? dots[0].length : 0,h:dots.length});
      if (dots.length && x >= dots[0].length) {
        dots = addWidth(dots, parseInt(x) + 1);
      }
      if (y >= dots.length) {
        console.log('Added height', parseInt(y) - dots.length + 1)
        dots = dots.concat(Array(parseInt(y) - dots.length + 1).fill(' '));
        console.log({w:dots[0].length, x:parseInt(x) + 1})
        dots = addWidth(dots, Math.max(dots[0].length, parseInt(x) + 1));
      }
      console.log('Will set', y, x, 'to #', dots, line, i, {w:dots[0].length,h:dots.length, row0:dots[0]});
      dots[y][x] = '#';
      console.log({dots});
    }
  }
  console.log({dots, folds})
}

processList(arrayList);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2
