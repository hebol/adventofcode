const utils = require('../../utils');
const {printMap} = require("../../utils");
const orgMap = utils.readFile('test.txt').map(line => line.split(''));
let map = JSON.parse(JSON.stringify(orgMap));

const tiltNorth = utils.cacheFunction(map => {
  for (let col = 0; col < map[0].length; col++) {
    let nextMoveTo = undefined;
    for (let row = 0; row < map.length; row++) {
      switch (map[row][col]) {
        case 'O':
          if (nextMoveTo >= 0) {
            //console.log('Move', {nextMoveTo, row, col})
            map[nextMoveTo][col] = 'O';
            map[row][col] = '.';
            for (let i = nextMoveTo + 1 ; i < map.length ; i++) {
              if (map[i][col] === '.') {
                nextMoveTo = i;
                //console.log('Found Empty', {nextMoveTo});
                break;
              }
            }
          }
          break;
        case '#':
          nextMoveTo = undefined;
          break;
        case '.':
          nextMoveTo = nextMoveTo >= 0 ? nextMoveTo : row;
          //console.log('Found Empty', {nextMoveTo});
          break;
      }
    }
  }
  return map;
})


const turnRight = utils.cacheFunction(map => {
  let orgWidth = map[0].length;
  let orgHeight = map.length;
  const result = new Array(orgWidth).fill(0).map(() => new Array(orgHeight).fill('.'));
  for (let row = 0; row < orgHeight; row++) {
    for (let col = 0; col < orgWidth; col++) {
      result[col][orgHeight - row - 1] = map[row][col];
    }
  }
  return result;
});

const aMap = tiltNorth(map);
const calculateWeight = (aMap) => {
  let result = 0;
  const height = aMap.length;
  for (let col = 0; col < map[0].length; col++) {
    for (let row = 0; row < map.length; row++) {
      if (aMap[row][col] === 'O') {
        result += height - row;
      }
    }
  }
  return result;
};

const oldStates = {};
const foundStates = [];
let cycleLength;
const cycle = (aMap, anIndex) => {
  let key = JSON.stringify(aMap);
  if (oldStates.hasOwnProperty(key)) {
    let {anIndex:oldStateIndex, foundMap} = oldStates[key];
    if (!cycleLength) {
      if (foundStates.indexOf(oldStateIndex) >= 0) {
        console.log({foundStates})
        cycleLength = foundStates.length;
        utils.printMap(foundMap, 'Found Map')
      } else {
        foundStates.push(oldStateIndex);
      }
    }
    return foundMap;
  } else {
    for (let i = 0; i < 4; i++) {
      aMap = tiltNorth(aMap);
      aMap = turnRight(aMap);
    }
    oldStates[key] = {anIndex, foundMap:JSON.parse(JSON.stringify(aMap))};
  }
  return aMap;
};

let targetRounds = 1e9;
for (let i = 0; i < targetRounds; i++) {
  if (cycleLength && targetRounds - i > cycleLength) {
    const stepsLeft = targetRounds - i;
    let skipSteps = stepsLeft - (stepsLeft % cycleLength);
    console.log('Skipping', {i, cycleLength, skipSteps})
      // BROKEN
    i += skipSteps;
  }
  console.log('Cycle: ' + i, calculateWeight(map));
  if (i % 10000 === 0) {
    console.log('Cycle', i);
  }
  map = cycle(map, i);
}

let answer1 = calculateWeight(map);

let answer2 = -1;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2:
