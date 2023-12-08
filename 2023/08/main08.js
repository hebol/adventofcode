const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

const directions = arrayList[0].trim().split('');
const map = arrayList.slice(1).reduce((rest, line) => {
  const match = line.match( /(.*) = \((.*), (.*)\)/);
  rest[match[1]] = {
    left: match[2],
    right: match[3]
  };
  return rest;
}, {});

function travelPath(startList) {
  let current = startList;
  let steps = 0;
  while (current.filter(c => c[2] !== 'Z').length > 0) {
    const direction = directions[steps++ % directions.length];
    current = current.map(aC => (direction === 'R') ? map[aC].right : map[aC].left);
  }
  return {steps, current};
}

let answer1 = travelPath(['AAA']).steps;

const startList = Object.keys(map).filter(key => key[2] === 'A');
const steps = startList.map(start => travelPath([start]));
let answer2 = utils.minstaGemensammaNamnaren(steps.map(({steps}) => steps));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 20569 Answer2: 21366921060721
