const utils = require('../utils');

const [orgData] = utils.readFile('input.txt');

let state = orgData.split('').map(entry => parseInt(entry));

for (let i = 0 ; i < 100 ; i++) {
  const pickedUp = state.splice(1, 3);
  let current = state[0];
  let destNumber = current - 1;
  let targetIndex;
  //console.log('Before', {current:current, pickedUp, state:state.join('')});
  while (!targetIndex || targetIndex < 0) {
    if (destNumber === 0) {
      destNumber = Math.max(...state);
    }
    targetIndex = state.indexOf(destNumber);
    if (targetIndex < 0) {
      destNumber -= 1;
    }
  }
  state = state.slice(0, targetIndex + 1).concat(pickedUp).concat(state.slice(targetIndex + 1));
  state = state.slice(1).concat([current]);
  const nextIndex = (state.indexOf(current) + 1 % state.length);
  state = state.slice(nextIndex).concat(state.slice(0, nextIndex));
  //console.log('After', {state:state.join('')});
}
const oneIndex = state.indexOf(1);
const lastState = state.slice(oneIndex).concat(state.slice(0, oneIndex));
const answer1 = lastState.slice(1).join('');
console.log({answer1});

