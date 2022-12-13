const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')
const mapHeight = arrayList.length;
const mapWidth = arrayList[0].length;

function findChar(s) {
  for (let row = 0; row < mapHeight; row++) {
    const found = arrayList[row].indexOf(s);
    if (found >= 0) {
      return {row, col:found};
    }
  }
}

const start = findChar('S', arrayList);
const end   = findChar('E', arrayList);

const directions = {'^': [0,-1], 'v': [0,1], '<': [-1,0], '>': [1,0]};
const directionsArray = Object.values(directions);

function getHeight(pos) {
  let result = arrayList[pos.row][pos.col];
  if (result === 'E') {
    return 'z'.charCodeAt(0);
  }
  if (result === 'S') {
    return 'a'.charCodeAt(0);
  }
  return result.charCodeAt(0);
}

function findAlternatives(pos, visited, steps, posHeight) {
  directionsArray.forEach(dir => {
    const newPos = {row: pos.row + dir[0], col: pos.col + dir[1]};
    if (newPos.row >= 0 && newPos.row < mapHeight && newPos.col >= 0 && newPos.col < mapWidth) {
      const newHeight = getHeight(newPos);
      let newKey = newPos.row + ',' + newPos.col;
      if (newHeight + 1 >= posHeight) {
        visited[newKey] = visited[newKey] || {};
        if (!visited[newKey].steps || (visited[newKey].steps > steps + 1)) {
          visited[newKey].steps = steps + 1;
          findAlternatives(newPos, visited, steps + 1, newHeight);
        }
      }
    }
  })
}

function findPath(start, end) {
  let visited = {};
  visited[end.row + ',' + end.col] = {steps: 0};
  findAlternatives(end, visited, 0, getHeight(end));
  let minSteps = 99999;
  for (let row = 0; row < mapHeight; row++) {
    for (let col = 0; col < mapWidth; col++) {
      if (arrayList[row][col] === 'a' && visited[row + ',' + col]?.steps) {
        minSteps = Math.min(minSteps, visited[row + ',' + col].steps);
      }
    }
  }

  return {answer2:minSteps, answer1: visited[start.row + ',' + start.col].steps};
}

console.log("Answers:", findPath(start, end));
// Answers: { answer2: 454, answer1: 456 }
