const utils = require('../../utils');
let map = utils.readFile('input.txt').map(row=>row.split('').map(Number));

const dirLeftMap = {'east': 'north', 'north': 'west', 'west': 'south', 'south': 'east'};
const dirRightMap = {'east': 'south', 'north': 'east', 'west': 'north', 'south': 'west'};
const moveMap = {'east': {row:0, col: 1}, 'north': {row:-1, col: 0}, 'west': {row:0, col: -1}, 'south': {row:1, col: 0}};
const turnLeft = dir => dirLeftMap[dir];
const turnRight = dir => dirRightMap[dir];
const move = (pos, dir) => {
  const diff = moveMap[dir];
  return {row: pos.row + diff.row, col: pos.col + diff.col};
};

const validPos = (pos) => {
  return pos.row >= 0 && pos.row < map.length && pos.col >= 0 && pos.col < map[0].length;
};

function tryMove(basePath, dir, context) {
  const candidate = {
    pos: move(basePath.pos, dir), dir, dist: dir === basePath.dir ? basePath.dist + 1 : 1,
  };
  if (validPos(candidate.pos)) {
    const stateKey = [candidate.pos.row, candidate.pos.col, candidate.dir, candidate.dist].join();
    if (!context.seen[stateKey]) {
      context.seen[stateKey] = true;
      const newHeatLoss = context.heatLoss + map[candidate.pos.row][candidate.pos.col];
      context.queue[newHeatLoss] ??= [];
      context.queue[newHeatLoss].push(candidate);
    }
  }
}

function runPart1() {
  let queue = [[{ pos: {row:0, col:0}, dir: 'east', dist: 0}]];

  const context = { queue, seen: {}, heatLoss: 0, complete: false};
  while (!context.complete) {
    for (const path of queue[context.heatLoss] ?? []) {
      if (path.pos.row === map.length - 1 && path.pos.col === map[0].length - 1) {
        context.complete = true;
        return context.heatLoss;
      }
      if (path.dist < 3) {
        tryMove(path, path.dir, context);
      }
      tryMove(path, turnLeft(path.dir), context);
      tryMove(path, turnRight(path.dir), context);
    }

    context.heatLoss++;
  }
}
const answer1 = runPart1();

function runPart2() {
  let queue = [[{ pos: {row:0, col:0}, dir: 'east', dist: 0, path:[]}, { pos: {row:0, col:0}, dir: 'south', dist: 0, path:[]}]];
  const context = { queue, seen: {}, heatLoss: 0, complete: false};

  while (!context.complete) {
    for (const path of queue[context.heatLoss] ?? []) {
      if (path.pos.row === map.length - 1 && path.pos.col === map[0].length - 1 && path.dist >= 4) {
        context.complete = true;
        return context.heatLoss;
      }
      if (path.dist < 10) {
        tryMove(path, path.dir, context);
      }
      if (path.dist >= 4) {
        tryMove(path, turnLeft(path.dir), context);
        tryMove(path, turnRight(path.dir), context);
      }
    }
    context.heatLoss++;
  }
}

let answer2 = runPart2();

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 886 Answer2: 1055
