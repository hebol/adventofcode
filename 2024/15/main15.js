const utils = require('../../utils');
const Mapper = require("../../Mapper");
let arrayList = utils.readFileNoFilter('input.txt');
const mapEnd = arrayList.indexOf('');
const map = Mapper.byArray(arrayList.slice(0, mapEnd));
const instructions = arrayList.slice(mapEnd + 1).map(line => line.split('')).flat();

const startPos = map.find(c => c === '@');

const directions = Mapper.getOrtoDir().map(([dx, dy, dir]) => {
  switch (dir) {
    case 'N':
      dir = '^';
      break;
    case 'E':
      dir = '>';
      break;
    case 'S':
      dir = 'v';
      break;
    case 'W':
      dir = '<';
      break;
  }
  return [dx, dy, dir];
});

let pos = startPos;
const canMove = ({dx, dy}) => {
  let tempPos = {x: pos.x + dx, y: pos.y + dy};
  let stepCount = 1;
  while (map.isValidPos(tempPos.x, tempPos.y)) {
    let c = map.get(tempPos.x, tempPos.y);
    if (c === '#') {
      break;
    }
    if (c === '.') {
      return stepCount;
    }
    stepCount++;
    tempPos = {x: tempPos.x + dx, y: tempPos.y + dy};
  }
  return -1;
};

const move = ({dx, dy}, stepCount) => {
  let c = '@';
  let oldPos = pos;
  for (let i = 0; i < stepCount; i++) {
    const newPos = {x: oldPos.x + dx, y: oldPos.y + dy};
    let newC = map.get(newPos.x, newPos.y);
    map.set(newPos.x, newPos.y, c);
    c = newC;
    oldPos = newPos;
  }
  map.set(pos.x, pos.y, '.');
  pos = {x: pos.x + dx, y: pos.y + dy};
};

instructions.forEach(instruction => {
  const [dx, dy, ] = directions.find(([,, dir]) => dir === instruction);
  let stepCount = canMove({dx, dy});
  if (stepCount > 0) {
    move({dx, dy}, stepCount);
  }
})

const answer1 = utils.sumArray(map.findMultiple(c => c === 'O').map(({x, y}) => 100 * y + x));


let answer2 = -1;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2:
