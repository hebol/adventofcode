const utils = require('../../utils');
let map = utils.readFile('test.txt').map(line => line.split(''));

const startPosX = map[0].indexOf('.');
const endPosX = map[map.length - 1].indexOf('.');


const isValid = ({visited, x, y, dir}) => {
  const within = x >= 0 && x < map[0].length && y >= 0 && y < map.length;
  if (within) {
    let tile = map[y][x];
    const valid = !visited[x + '-' + y] && (tile === '.' || dirTiles.includes(tile));
      //tile === '^' || tile === 'v' || tile === '<' || tile === '>');
    return valid;
  }
  return false;
};

const dirs = [[0, 1, 'v'], [0, -1, '<'], [1, 0, '>'], [-1, 0, '^']];
const dirTiles = dirs.map(([dx, dy, dir]) => dir);
function findLongestPath(startX, startY, visited) {
  let stack = [{ x: startX, y: startY, visited, len: 0 }];
  let maxLength = -1;
  let finalVisited = {};

  while (stack.length > 0) {
    let { x, y, visited, len } = stack.pop();

    // If we've reached the end, update the max length and continue
    if (y === map.length - 1 && x === endPosX) {
      if (len > maxLength) {
        maxLength = len;
        finalVisited = visited;
      }
      continue;
    }

    for (const [dx, dy, dir] of dirs) {
      let newX = x + dx;
      let newY = y + dy;
      if (isValid({visited, x:newX, y:newY, dir})) {
        stack.push({ x: newX, y: newY, visited: { ...visited, [newX + '-' + newY]: true }, len: len + 1 });
      }
    }
  }

  return { len: maxLength, newVisited: finalVisited };
}

console.log({startPosX, endPosX});
const answer1 = findLongestPath(startPosX, 0, {[startPosX + '-0']: true}).len;
let answer2 = -1;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2:
