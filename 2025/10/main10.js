const utils = require('../../utils');

const arrayList = utils.processLine(line => {
  let [,target,buttons, code] = line.match(/^\[([.#]+)]\s+((?:\(\d+(?:,\d+)*\)\s*)+)\{(\d+(?:,\d+)*)}$/);
  buttons = buttons.match(/\d+(?:,\d+)*/g).map(btn => btn.split(',').map(Number));
  code = code.split(',').map(Number);
  return {target,buttons,code};
}, 'input.txt');

const pressButton = (numList, aState) => {
  //console.log('Pressing', {numList});
  const arr = aState.split('');
  for (const num of numList) {
    arr[num] = arr[num] === '.' ? '#' : '.';
  }
  return arr.join('');
};

const pressButton2 = (numList, aState, targetNum) => {
  const arr = aState.split(',').map(Number);
  for (const num of numList) {
    arr[num] += 1;
    if (arr[num] > targetNum[num]) {
      return '';
    }
  }
  return arr.join(',');
};

let answer1 = utils.sumArray(arrayList.map(a => {
  const start = a.target.replaceAll('#', '.');
  const processed = {};
  let states = new Set([start]);
  let solved = false;
  let count = 0;
  while (!solved) {
    count++;
    const newStates = new Set();
    for (const state of states) {
      for (const button of a.buttons) {
        const newState = pressButton(button, state);
        if (!processed[newState]) {
          newStates.add(newState);
          processed[newState] = true;
        }
      }
    }
    if (newStates.has(a.target)) {
      solved = true;
      break;
    } else {
      states = newStates;
    }
  }
  return count;
}));

let answer2 = utils.sumArray(arrayList.map(a => {
  const start = new Array(a.code.length).fill(0).join(',');
  const targetNum = a.code.slice(0);
  const target = a.code.join(',');
  console.log(`Will solve ${a.code.join(',')}`);

  const processed = {};
  processed[target] = true;
  processed[''] = true;
  let states = new Set([start]);
  let solved = false;
  let count = 0;
  while (!solved) {
    count++;
    console.log(`Round ${count}, states:`, states);
    const newStates = new Set();
    for (const state of states) {
      for (const button of a.buttons) {
        const newState = pressButton2(button, state, targetNum);
        if (!processed[newState]) {
          newStates.add(newState);
          processed[newState] = true;
        }
      }
    }
    if (newStates.has(target)) {
      solved = true;
      break;
    } else {
      states = newStates;
    }
  }
  console.log(`Solved ${a.code.join(',')} in ${count} steps`);
  return count;
}));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2:

