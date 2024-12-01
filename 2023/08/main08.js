const utils = require('../../utils');
let arrayList = utils.readFile('input2.txt')

const directions = arrayList[0].split('');
const map = arrayList.slice(1).reduce((rest, line) => {
  const match = line.match( /(.*) = \((.*), (.*)\)/);
  rest[match[1]] = { left: match[2], right: match[3]};
  return rest;
}, {});

const travelPath = (pos) => {
  let steps = 0;
  while (pos[2] !== 'Z') {
    const direction = directions[steps++ % directions.length];
    pos = direction === 'R' ? map[pos].right : map[pos].left;
  }
  return {steps, pos};
}

let answer1 = travelPath('AAA').steps;

const startList = Object.keys(map).filter(key => key[2] === 'A');
const answer2 = utils.minstaGemensammaNamnaren(startList.map(start => travelPath(start).steps));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 20569 Answer2: 21366921060721
