const utils = require('../../utils');

let answer1, answer2;

let currentDirectory = '';
const nodes = {'/': {'size': 0, 'children': {}}};

function moveDirUp(aDir) {
  aDir = aDir.substring(0, aDir.lastIndexOf('/'));
  if (aDir === '') {
    aDir = '/';
  }
  return aDir;
}

function cd(current, newDir) {
  const result = (current === '/' ? '': current) + '/' + newDir;
  if (!nodes[result]) {
    nodes[current].children[newDir] = {'size': 0, 'children': {}};
    nodes[result] = nodes[current].children[newDir];
  }
  return result;
}

utils.processLine(line => {
  const parts = line.split(' ');
  if (parts[0] === '$' && parts[1] === 'cd') {
    if (parts[2] === '/') {
      currentDirectory = '/';
    } else {
      currentDirectory = (parts[2] === '..') ? moveDirUp(currentDirectory) : cd(currentDirectory, parts[2]);
    }
  } else {
    if (parts[0] !== 'dir') {
      nodes[currentDirectory].size += parseInt(parts[1]);
    }
  }
}, 'input2.txt')

const sumChildren = (node) => {
  node.total = utils.sumArray(Object.values(Object.values(node.children).map(child => sumChildren(child)))) + node.size;
  return node.total;
}

sumChildren(nodes['/']);
let allSums = Object.values(nodes).map(node => node.total);

answer1 = utils.sumArray(allSums.filter(value=> value <= 100000));

let used = nodes['/'].total;
const free = (70000000 - used);
const neededSum = 30000000 - free;
answer2 = allSums.filter(node => (node >= neededSum)).sort((a, b) => a - b)[0];
console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 1182909 Answer2: 2832508


