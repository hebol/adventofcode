const utils = require('../../utils');
const Mapper = require("../../Mapper");

const map = new Mapper('input.txt');

const starts = map.findMultiple((c) => parseInt(c) === 0);

const th = starts.map(({x, y}) => {
  const directions = map.getOrtoDir();
  let availablePos = {};
  availablePos[x + ',' + y] = 1;

  function arrayToObject(anArray) {
    return anArray.reduce((acc, [x, y,r]) => {
      acc[x + ',' + y] = (acc[x + ',' + y] || 0) + r;
      return acc;
    }, {});
  }

  function objectToArray(obj) {
    return Object.entries(obj).map(([key, value]) => [...key.split(',').map(s => parseInt(s)), value]);
  }
  for (let current = 1 ; current <= 9; current++) {
    availablePos = objectToArray(availablePos);
    availablePos = availablePos.map(([x,y, r]) => {
      return directions.map(([dx,dy]) => [x+dx, y+dy, r]).filter(([x,y]) => map.isValidPos(x,y));
    }).flat().filter(([x,y]) => parseInt(map.get(x, y)) === current);
    availablePos = arrayToObject(availablePos);
  }
  return objectToArray(availablePos).map(([,,r]) => r);
});

let answer1 = utils.sumArray(th.map(a=>a.length));
let answer2 = utils.sumArray(th.map(utils.sumArray));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 733 Answer2: 1514
