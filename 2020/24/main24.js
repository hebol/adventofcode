const utils = require('../utils');

const movesList = utils.processLine(line => {
  let restOfLine = line, dir;
  const moves = [];
  while (restOfLine.length) {
    if (restOfLine[0] === 'n' || restOfLine[0] === 's') {
      dir = restOfLine.substring(0, 2);
    } else {
      dir = restOfLine.substring(0, 1);
    }
    restOfLine = restOfLine.substring(dir.length);
    moves.push(dir);
  }
  return moves;
}, 'input2.txt');

const tiles = {};

function dirToSteps(dir) {
  const result = {x:0, y:0};
  switch (dir) {
    case 'w':
      result.x = -1;
      break;
    case 'e':
      result.x = 1;
      break;
    case 'ne':
      result.y = 1;
      break;
    case 'nw':
      result.x = -1;
      result.y = 1;
      break;
    case 'se':
      result.y = -1;
      result.x = 1;
      break;
    case 'sw':
      result.y = -1;
      break;
  }
  return result;
}

function toggleTile(x, y, aState) {
  const coord = x + '_' + y;
  const newTile = !(aState[coord] || false);
  if (newTile) {
    aState[coord] = newTile;
  } else {
    delete aState[coord];
  }
}

function countBlack(aState) {
  return Object.values(aState).reduce((rest, part) => rest + (part ? 1 : 0), 0);
}

movesList.forEach(moves => {
  let x = 0, y = 0;
  moves.forEach( move => {
    const ret = dirToSteps(move);
    x += ret.x;
    y += ret.y;
  });
  toggleTile(x,y,tiles)
});

const answer1 = countBlack(tiles);

const countNeighbours = (aState, x, y) => {
  const result = ['w', 'nw', 'ne', 'e', 'se', 'sw'].reduce((rest,part) => {
    const offset = dirToSteps(part);
    return rest + (aState[(x + offset.x) + '_' + (y + offset.y)] ? 1 : 0);
  }, 0);
  //console.log({x, y, result})
  return result;
}

function getLimits(aState) {
  const keys = Object.keys(aState);
  let [x, y] = keys[0].split('_');
  const result = {
    xMin: parseInt(x),
    xMax: parseInt(x),
    yMin: parseInt(y),
    yMax: parseInt(y),
  };
  keys.forEach(coord => {
    [x, y] = coord.split('_');
    result.xMin = Math.min(result.xMin, x);
    result.yMin = Math.min(result.yMin, y);
    result.xMax = Math.max(result.xMax, x);
    result.yMax = Math.max(result.yMax, y);
  })
  result.xMin -= 1;
  result.xMax += 1;
  result.yMin -= 1;
  result.yMax += 1;
  return result;
}

function processStates(aState) {
  const limits = getLimits(aState);
  const newState = {}
  for (let x = limits.xMin ; x <= limits.xMax ; x++) {
    for (let y = limits.yMin ; y <= limits.yMax ; y++) {
      const key = x+'_'+y;
      const isBlack = aState[key];
      const neighbours = countNeighbours(aState, x, y);
      let willBeBlack = isBlack;
      if (!isBlack && neighbours === 2) {
        willBeBlack = true;
      } else {
        if (isBlack && (neighbours === 0 || neighbours > 2)) {
          willBeBlack = false;
        }
      }
      if (willBeBlack) {
        newState[key] = true;
      }
    }
  }
  return newState;
}

let current = JSON.parse(JSON.stringify(tiles));
for (let i = 0 ; i < 100 ; i++) {
  current = processStates(current);
}

//{ answer1: 320, answer2: 3777 }
const answer2 = countBlack(current);
console.log({answer1, answer2});
