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
      if (Math.abs(newHeight - posHeight) <= 1) {
        let explore = false;
        if (!visited[newKey]) {
          visited[newKey] = {};
          explore = true;
        } else {
          if (visited[newKey].steps > steps + 1) {
            explore = true;
          }
        }
        if (explore) {
          visited[newKey].steps = steps + 1;
          findAlternatives(newPos, visited, steps + 1, newHeight);
        }
      }
    }
  })
}

function findPath(start, end) {
  let currentPos = {...start};
  let currentHeight = 'a'.charCodeAt(0);
  let visited = {};
  visited[start.row + ',' + start.col] = {steps: 0};
  findAlternatives(currentPos, visited, 0, currentHeight);
  console.log(visited);
  for (let row = 0; row <mapHeight; row++) {
    let map = '';
    for (let col = 0; col < mapWidth; col++) {
      map += (visited[row + ',' + col]) ? '.' : ' ';
    }
    console.log(map);
  }

  return visited[end.row + ',' + end.col].steps;
}

console.log(start, end);

const answer1 = findPath(start, end);

let answer2 = -1;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2
