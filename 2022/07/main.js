const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

let answer1 = -1, answer2 = -1;

let currentDirectory = '';
const data = {'/': {'size': 0, 'children': {}}};
const nodes = {'/': data['/']};

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

for (let i = 0; i < arrayList.length; i++) {
  const line = arrayList[i];
  if (line === '$ ls') {
    continue;
  }
  if (line[0] === '$') {
    const newDir = line.split(' ')[2];
    if (newDir === '/') {
      currentDirectory = '/';
    } else {
      if (newDir === '..') {
        currentDirectory = moveDirUp(currentDirectory);
      } else {
        currentDirectory = cd(currentDirectory, newDir);
      }
    }
  } else {
    const [p1, p2] = line.split(' ');
    if (p1 === 'dir') {
    } else {
      nodes[currentDirectory].size += parseInt(p1);
    }
  }
}

const sumChildren = (node) => {
  node.total = utils.sumArray(Object.values(Object.values(node.children).map(child => sumChildren(child)))) + node.size;
  return node.total;
}

sumChildren(data['/']);
let allSums = Object.values(nodes).map(node => node.total);
const sorted = allSums.filter(value=> value <= 100000);

answer1 = utils.sumArray(sorted);

let used = nodes['/'].total;
const free = (70000000 - used);
const neededSum = 30000000 - free;
let largeEnough = allSums.filter(node => (node >= neededSum)).sort((a, b) => a - b);
answer2 = largeEnough[0];
console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 1182909 Answer2: 2832508


