const utils = require('../utils');

const [orgData] = utils.readFile('input.txt');

function pickup(node) {
  const result = node.next;
  node.next = node.next.next.next.next
  result.next.next.next = null;
  return result;
}

function isIn(num, node) {
  while (node) {
    if (node.num === num) {
      return true;
    } else {
      node = node.next;
    }
  }
  return false;
}

function linkAfter(node, list) {
  const temp = node.next;
  node.next = list;
  let currentNode = list;
  while (currentNode.next) {
    currentNode = currentNode.next;
  }
  currentNode.next = temp;
}

function nodeToString(node) {
  let currentNode = node;
  let result = '';
  while (currentNode && currentNode.next !== node) {
    result += currentNode.num;
    currentNode = currentNode.next;
  }
  return result;
}

function simulateCrabs(state, rounds, maxNumber) {
  const indexMap = state.reduce((rest, part) => {
    rest[part] = {num:part};
    return rest;
  },{})
  for (let i = 0 ; i < state.length ; i++) {
    indexMap[state[i]].next = indexMap[state[(i + 1) % state.length]];
  }

  let current = indexMap[state[0]];
  for (let i = 0; i < rounds; i++) {
    if (i % 100000 === 0) {
      console.log('Ping', i, new Date());
    }
    const pickedUp = pickup(current);
    //console.log({state: nodeToString(current), selected: current.num, pickedUp: nodeToString(pickedUp)});

    let destNumber = current.num - 1;
    while (destNumber < 1 || isIn(destNumber, pickedUp)) {
      if (destNumber < 1) {
        destNumber = maxNumber;
      } else {
        destNumber -= 1;
      }
    }
    let target = indexMap[destNumber];
    linkAfter(target, pickedUp);

    current = current.next;
  }
  return indexMap[1].next;
}

let result = simulateCrabs(orgData.split('').map(entry => parseInt(entry)), 100, 9);

let answer1 = nodeToString(result).substring(0, 8);
console.log({answer1});

let newState = orgData.split('').map(entry => parseInt(entry));
let bigArray = [...Array(1000001).keys()];
bigArray.splice(0, 1);
newState = newState.concat(bigArray.slice(newState.length))
const result2 = simulateCrabs(newState, 10000000, newState.length);
const answer2 = result2.num *  result2.next.num;
console.log({answer2, result2});
