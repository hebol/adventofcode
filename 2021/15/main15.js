const utils = require('../../utils');
let arrayList = utils.readFile('input.txt').map(line=>line.split('').map(c=>parseInt(c)));

let answer1 = -1, answer2 = -1;

const calculateSums = (map) => {
  const cost = {}
  let modified = false;
  cost[getKey(map.width-1, map.height - 1)] = map.getCost(map.width - 1, map.height - 1);
  let recalcs = getPossible(map.width-1, map.height - 1, map).reduce((rest,pos) =>{
    rest[getKey(pos.x,pos.y)] = 1;
    return rest
  }, {});

  while (Object.keys(recalcs).length > 0) {
    const currentCalcs = recalcs;
    recalcs = {};
    Object.keys(currentCalcs).forEach(pos => {
      const [x,y] = pos.match(/(\d+)_(\d+)/).slice(1).map(x=>parseInt(x));
      const currentCost = cost[getKey(x, y)];
      const possible = getPossible(x, y, map, cost);
      const surrounding = possible.map(pos => cost[getKey(pos.x, pos.y)] + map.getCost(x,y));
      const minSurrounding = Math.min(...surrounding);
      if (!currentCost || minSurrounding < currentCost) {
        cost[getKey(x,y)] = minSurrounding;
        getPossible(x, y, map).forEach(pos =>{
          recalcs[getKey(pos.x, pos.y)] = 1;
        });
      }
    });
  }

  do {
    modified = false;
    for (let y = map.height - 1 ; y >= 0 ; y--) {
      for (let x = map.width - 1 ; x >= 0 ; x--) {
      }
    }
  } while (modified);
  return cost[getKey(0, 0)] - map.getCost(0,0);
}

function getPossible(x, y, map, cost) {
  const possible = [];
  if (x>0) {possible.push({x:x-1,y});}
  if (y>0) {possible.push({x:x,y:y-1});}
  if (x<map.width - 1) {possible.push({x:x+1,y});}
  if (y<map.height - 1) {possible.push({x:x,y:y+1});}

  if (cost) {
    return possible.filter(pos => cost[getKey(pos.x, pos.y)]);
  } else {
    return possible;
  }
}

function getKey(x, y) {
  return x + '_' + y;
}

const map1 = {
  width: arrayList[0].length,
  height: arrayList.length,
  getCost: (x,y) => {
    return arrayList[x][y]
  }
};

const map2 = {
  width: arrayList[0].length * 5,
  height: arrayList.length * 5,
  getCost: (x,y) => {
    const xRolls = Math.floor(x / arrayList[0].length);
    const yRolls = Math.floor(y / arrayList.length);

    const anX = x % arrayList[0].length;
    const anY = y % arrayList.length;
    let result = (arrayList[anX][anY] + xRolls + yRolls);
    return result > 9 ? result - 9 : result;
  }
};

answer1 = calculateSums(map1);
answer2 = calculateSums(map2);
console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 604 Answer2: 2907
