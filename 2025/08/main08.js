const utils = require('../../utils');
const arrayList = utils.readFile('input.txt').map(line => line.split(',').map(Number));
const distHeap = require('./distHeap');
const heap = new distHeap(20000);

const distanceMap = {};
const connectedMap = {};
const posToKey = (data) => {
  if (typeof data !== 'string') {
    const [x, y, z] = data;
    return `${x},${y},${z}`;
  } else {
    return data;
  }
}
const posToKeys = (pos1, pos2) => {
  return [posToKey(pos1), posToKey(pos2)].sort();
}
const setArray = [];

const isConnected = (pos1, pos2) => {
  const key1 = posToKey(pos1);
  const key2 = posToKey(pos2);
  const keys = [key1, key2].sort();
  return connectedMap[keys[0]] && connectedMap[keys[0]][keys[1]];
}

const setConnected = (pos1, pos2) => {
  const key1 = posToKey(pos1);
  const key2 = posToKey(pos2);
  const keys = [key1, key2].sort();
  connectedMap[keys[0]] = connectedMap[keys[0]] || {};
  connectedMap[keys[0]][keys[1]] = true;

  let allSets = setArray.filter( s => keys.find( p => s.has(p)))
  let aSet;
  switch (allSets.length) {
    case 0:
      aSet = new Set();
      setArray.push(aSet);
      break;
    case 1:
      aSet = allSets[0];
      break;
    case 2:
      allSets[1].forEach( p => allSets[0].add(p));
      const index = setArray.indexOf(allSets[1]);
      setArray.splice(index, 1);
      aSet = allSets[0];
  }
  aSet.add(keys[0]);
  aSet.add(keys[1]);

  //console.log("Connecting:", keys[0], "<->", keys[1]);
}

const getDistance = (pos1, pos2) => {
  const key1 = posToKey(pos1);
  const key2 = posToKey(pos2);
  const keys = [key1, key2].sort();
  distanceMap[keys[0]] = distanceMap[keys[0]] || {};
  if (distanceMap[keys[0]][keys[1]] !== undefined) {
    return distanceMap[keys[0]][keys[1]];
  } else {
    const dist = Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) +
      Math.pow(pos1[1] - pos2[1], 2) +
      Math.pow(pos1[2] - pos2[2], 2)
    );

    distanceMap[keys[0]][keys[1]] = dist;
    return dist;
  }
}

  // Calculate all distances
arrayList.forEach(p1 => {
  arrayList.filter(p2 => p2 !== p1 && !isConnected(p1, p2)).forEach( p2 => {
    const [pos1, pos2] = posToKeys(p1, p2);
    const distance = getDistance(p1, p2);
    heap.updateResults({pos1,pos2, distance});
  })
})


const firstBatchLen = 1000;
let startBatch = heap.getTopResults().slice(0, firstBatchLen);
startBatch.forEach(results => setConnected(results.pos1, results.pos2))

const sizes = setArray.map(aSet => aSet.size);
sizes.sort( (a,b) => b - a);

let answer1 = sizes[0] * sizes[1] * sizes[2];

const restToCheck = heap.getTopResults().slice(firstBatchLen);

let entry;
while (setArray.length > 1 || setArray[0].size !== firstBatchLen) {
  entry = restToCheck.shift();
  setConnected(entry.pos1, entry.pos2);
}

let answer2 = entry.pos1.split(',').map(Number)[0] * entry.pos2.split(',').map(Number)[0];

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 84968 Answer2: 8663467782
