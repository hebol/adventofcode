const utils = require('../utils');

let currentState = [];

let y = 0;
utils.processLine(line => {
  for (var x = 0 ; x < line.length ; x++) {
    if (line[x] === '#') {
      currentState.push({x, y, z:0, w:0});
    }
  }
  y += 1;
}, 'input2.txt');

const originalState = currentState.slice();

function printState(aState, title) {
  title && console.log(title);
  const limits = getNewLimits(aState);
  for (let w = limits.wMin + 1 ; w <= limits.wMax - 1 ; w++) {
    for (let z = limits.zMin + 1; z <= limits.zMax - 1; z++) {
      console.log('z=', z, 'w=', w);
      for (let y = limits.yMin + 1; y <= limits.yMax - 1; y++) {
        let line = '';
        for (let x = limits.xMin + 1; x <= limits.xMax - 1; x++) {
          line += isSet(x, y, z, w, aState) ? '#' : '.';
        }
        console.log(line);
      }
      console.log('');
    }
  }
}

const getNewLimits = (aState, dim4) => {
  const result = {};
  let dimList = ['x', 'y', 'z', 'w'];
  aState.forEach(statePart => {
    dimList.forEach(dim => {
      result[dim + 'Min'] = Math.min(result[dim + 'Min'] ||0, statePart[dim])
      result[dim + 'Max'] = Math.max(result[dim + 'Max'] ||0, statePart[dim])
    })
  });
  dimList.forEach( dim => {
    result[dim + 'Min'] = result[dim + 'Min'] - 1;
    result[dim + 'Max'] = result[dim + 'Max'] + 1;
  })
  if (!dim4) {
    result.wMin = 0;
    result.wMax = 0;
  }
  return result;
};

printState(currentState, 'Initial currentState');

function isSet(x, y, z, w, aState) {
  const result = aState.find(partState => partState.x === x && partState.y === y && partState.z === z && partState.w === w) !== undefined;
  //console.log({x, y, z, w}, '=>', result);
  return result;
}

function calculateNeighbours(x, y, z, w, aState) {
  let neighbours = 0;
  for (let x1 = x-1 ; x1 <= x+1 ; x1++) {
    for (let y1 = y-1; y1 <= y+1; y1++) {
      for (let z1 = z-1; z1 <= z+1; z1++) {
        for (let w1 = w-1; w1 <= w+1; w1++) {
          if ((x !== x1 || y !== y1 || z !== z1 || w !== w1) && isSet(x1, y1, z1, w1, aState)) {
            neighbours++;
          }
        }
      }
    }
  }
  //console.log({x, y, z, w},'=> Neighbours', neighbours)
  return neighbours;
}

function calculateNextState(aState, dim4) {
  const limits = getNewLimits(aState, dim4);
  const newState = [];
  for (let x = limits.xMin ; x <= limits.xMax ; x++) {
    for (let y = limits.yMin ; y <= limits.yMax ; y++) {
      for (let z = limits.zMin ; z <= limits.zMax ; z++) {
        for (let w = limits.wMin ; w <= limits.wMax ; w++) {
          const neighbours = calculateNeighbours(x, y, z, w, aState);
          let active = false;
          if (isSet(x, y, z, w, aState)) {
            active = (neighbours === 3) || (neighbours === 2);
          } else {
            active = neighbours === 3;
          }
          active && newState.push({x, y, z, w});
        }
      }
    }
  }
  return newState;
}

for (let count = 0 ; count < 6 ; count++) {
  currentState = calculateNextState(currentState);
}

console.log('Answer1', currentState.length);

currentState = originalState;

for (let count = 0 ; count < 6 ; count++) {
  currentState = calculateNextState(currentState, true);
}

console.log('Answer2', currentState.length);
