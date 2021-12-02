const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

let position = arrayList.reduce((rest, value) => {
  [dir, speed] = value.split(' ');
  switch(dir) {
    case 'forward':
      rest.pos += parseInt(speed);
      break;
    case 'down':
      rest.depth += parseInt(speed);
      break;
    case 'up':
      rest.depth -= parseInt(speed);
      break;
    default:
      console.log('Unknown', dir);
  }
  return rest;
}, {depth:0, pos:0});

let position2 = arrayList.reduce((rest, value) => {
  [dir, speed] = value.split(' ');
  switch(dir) {
    case 'forward':
      rest.pos += parseInt(speed);
      rest.depth += parseInt(speed) * rest.aim;
      break;
    case 'down':
      rest.aim += parseInt(speed);
      break;
    case 'up':
      rest.aim -= parseInt(speed);
      break;
    default:
      console.log('Unknown', dir);
  }
  return rest;
}, {depth:0, pos:0, aim: 0});

console.log({position, result1: position.depth * position.pos});
console.log({position2, result2: position2.depth * position2.pos});
