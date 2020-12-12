const utils = require('../utils');

let direction = 'E';
let x = 0;
let y = 0;

const directions = ['N', 'E', 'S', 'W'];

function turn(number) {
  const index = directions.indexOf(direction);
  let newIndex = (index + number / 90) % 4;
  while (newIndex < 0) {
    newIndex += 4;
  }
  const newDir = directions[newIndex];
  if (!newDir) {
    console.log('SNAFU!', {number, index, newIndex, newDir});
  }
  return newDir;
}

function doProcess(dir, steps, stepsProcessor, turner) {
  switch (dir) {
    case 'E':
      x += steps;
      break;
    case 'N':
      y += steps;
      break;
    case 'W':
      x -= steps;
      break;
    case 'S':
      y -= steps;
      break;
    case 'L':
      direction = turner(-steps);
      break;
    case 'R':
      direction = turner(steps);
      break;
    case 'F':
      stepsProcessor(direction, steps);
      break;
  }
  //console.log({dir, steps, x, y, direction});
}

utils.processLine(line => {
  const match = line.match(/([A-Z])([0-9]+)/)
  doProcess(match[1], parseInt(match[2]), doProcess, turn);
}, 'input.txt');

console.log('Answer1', Math.abs(x)+Math.abs(y));

x = 10;
y = 1;
let x2 = 0;
let y2 = 0;
utils.processLine(line => {
  const match = line.match(/([A-Z])([0-9]+)/)

  doProcess(match[1], parseInt(match[2]), (dir, steps) => {
    x2 += x * steps;
    y2 += y * steps;
    //console.log({dir, steps, x, y, x2, y2})
  }, (steps) => {
    while (steps > 0) {
      steps -= 90;
      const temp = y;
      y = -x;
      x = temp;
    }
    while (steps < 0) {
      steps += 90;
      const temp = x;
      x = -y;
      y = temp;
    }
    return direction;
  });
}, 'input.txt');

console.log('Answer2', Math.abs(x2)+Math.abs(y2));