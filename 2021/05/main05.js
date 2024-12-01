const utils = require('../../utils');
let arrayList = utils.readFile('input2.txt').map(row => {
  const [total, x1, y1, x2, y2] = row.match(/(\d+),(\d+) -> (\d+),(\d+)/);
  return {x1:parseInt(x1),y1:parseInt(y1), x2:parseInt(x2), y2:parseInt(y2)};
});

const calculateCrossings = list => {
  const set = {}

  function addPos(x, y) {
    const key = x + '_' + y;
    let currentValue = set[key] || 0;
    currentValue += 1;
    set[key] = currentValue;
    //console.log('Setting', {x, y});
  }

  list.forEach(entry => {
    const dx = entry.x2 - entry.x1;
    const dy = entry.y2 - entry.y1;

    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const xStep = dx !== 0 ? dx / Math.abs(dx) : 0;
    const yStep = dy !== 0 ? dy / Math.abs(dy) : 0;
    let x = entry.x1;
    let y = entry.y1;
    for (let index = 0 ; index <= steps ; index++,x += xStep, y += yStep) {
      addPos(x, y);
    }
  });
  return Object.values(set).filter(entry => entry > 1).length;
}

let answer1, answer2;
// Answer1: 6548 Answer2 19663

const filteredList = arrayList.filter(entry => entry.x1 ===entry.x2 || entry.y1 ===entry.y2)

answer1 = calculateCrossings(filteredList);
answer2 = calculateCrossings(arrayList);

console.log("Answer1:", answer1, "Answer2", answer2);
