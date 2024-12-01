const utils = require('../../utils');
let arrayList = utils.readFile('input2.txt')
const cmdList = arrayList.map(entry => {
  [cmd, val] = entry.split(' ');
  return {cmd, value: parseInt(val)};
})

let position = cmdList.reduce((rest, {cmd, value}) => {
  switch(cmd) {
    case 'forward':
      rest.pos += value;
      break;
    case 'down':
      rest.depth += value;
      break;
    case 'up':
      rest.depth -= value;
      break;
    default:
      console.log('Unknown', cmd);
  }
  return rest;
}, {depth:0, pos:0});

console.log({position, result1: position.depth * position.pos});
//2117664

let position2 = cmdList.reduce((rest, {cmd, value}) => {
  switch(cmd) {
    case 'forward':
      rest.pos += value;
      rest.depth += value * rest.aim;
      break;
    case 'down':
      rest.aim += value;
      break;
    case 'up':
      rest.aim -= value;
      break;
    default:
      console.log('Unknown', cmd);
  }
  return rest;
}, {depth:0, pos:0, aim: 0});

console.log({position2, result2: position2.depth * position2.pos});
//2073416724
