const utils = require('../../utils');

function calculateArea(isPart2) {
  let pos = {x: 0, y:0};
  const posArray = [[0, 0]];
  let perimeter = 0;
  utils.processLine(line => {
    let [l, dir, len, cmd] = line.match(/([RLUD]) (\d+) \((.*)\)/);
    if (isPart2) {
      dir = "RDLU"[cmd[6]];
      len = parseInt(cmd.slice(1, -1), 16);
    } else {
      len = parseInt(len);
    }
    perimeter += len;
    const dirs = {R: {x: 1, y: 0}, L: {x: -1, y: 0}, U: {x: 0, y: 1}, D: {x: 0, y: -1}};
    pos.x += len * dirs[dir].x;
    pos.y += len * dirs[dir].y;
    posArray.push([pos.x, pos.y]);
  }, 'input.txt')

  return utils.perimeterAndPosToArea(perimeter, posArray);
}

const answer1 = calculateArea(false);
const answer2 = calculateArea(true);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 41019 Answer2: 96116995735219
