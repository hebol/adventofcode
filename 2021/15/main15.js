const utils = require('../../utils');
let arrayList = utils.readFile('test.txt').map(line=>line.split('').map(c=>parseInt(c)));

let answer1 = -1, answer2 = -1;

const calculateSums = (x, y, map, cost) => {
  const possible = getPossible(x, y, map, cost);
  for (let y = map.length - 1 ; y > 0 ; y--) {
    for (let x = map[0].length - 1 ; x > 0 ; x--) {
      cost[getKey(x,y)] = map[x+y];
    }
  }
}

function getPossible(x, y, map, visited) {
  const possible = [];
  if (x>0) {possible.push({x:x-1,y});}
  if (y>0) {possible.push({x:x,y:y-1});}
  if (x<map[0].length - 1) {possible.push({x:x+1,y});}
  if (y<map.length - 1) {possible.push({x:x,y:y+1});}

  const filtered = possible.filter(pos => !visited[getKey(pos.x, pos.y)]);
  return filtered;
}

function getKey(x, y) {
  return x + '_' + y;
}

const calculatePath = (map, x, y, visited) => {
  const myVisited = {...visited};
  myVisited[getKey(x, y)] = 1;
  //console.log('Looking at', {x,y}, myVisited);
  if (x === map[0].length - 1 && y === map.length - 1) {
    return {cost: map[x][y], path:[{x,y}], visited:myVisited};
  } else {
    const possible = getPossible(x, y, map, myVisited);
    const cost = possible.map(alt => {
      return calculatePath(map, alt.x, alt.y, myVisited);
    }).filter(res=>res);

    if (cost.length !== 0) {
      cost.sort((a,b) => a.cost-b.cost);
      const selected = cost[0];
      selected.path.push({x,y});
      selected.cost += map[x][y];
      possible.forEach(alt=>myVisited[getKey(alt.x,alt.y)] = 1);
      selected.visited = myVisited;
      console.log('Selected', selected);
      return selected;
    } else {
      return null;
    }
  }
}

answer1 = calculatePath(arrayList, 0, 0, {}).cost;
console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2
