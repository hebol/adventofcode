const utils = require('../../utils');

const nodeMap = utils.processLine(line => {
  const cols = line.split(' ');
  const valve = cols[1];
  const flowRate = parseInt(cols[4].split('=')[1].slice(0, -1));
  const tunnels = cols.slice(9).map(tunnel=>tunnel.split(',')[0]);
  const isLeaf = tunnels.length === 1;
  return {valve, flowRate, tunnels, isLeaf, isOpen: false};
},'test.txt').reduce((acc, connection) => {
  acc[connection.valve] = connection;
  return acc;
}, {});

const createGraphData = (map) => {
  return 'digraph G {\n' + Object.values(map).map(connection => {
    return connection.tunnels.map(tunnel => connection.valve + '->' + tunnel).join('\n') +
      '\n' + connection.valve + ' [label="' + connection.valve + ' ' + (connection.flowRate ? connection.flowRate : '') + '"]\n' ;
  }, '').join('\n') + '}\n';
}

const pathMap = {}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const getPaths = (node, visited) => {
  const isStart = !visited;
  visited = visited || {paths:[]};
  if (!visited.from) {
    visited.from = node;
  }
  visited[node] = true;
  const paths = nodeMap[node].tunnels.map(tunnel => {
    if (!visited[tunnel]) {
      let visitedCopy = deepClone(visited);
      visitedCopy[tunnel] = true;
      visitedCopy.paths.push(tunnel);
      const newNode = nodeMap[tunnel];
      if (newNode.flowRate) {
        visitedCopy.to = tunnel;
        return visitedCopy;
      } else {
        nodeMap[node].tunnels.forEach(tunnel => visitedCopy[tunnel] = true);
        return getPaths(tunnel, visitedCopy)[0];
      }
    }
  }).filter(path => path);
  if (isStart) {
    paths.forEach(path => {
      const nodes = [path.from, path.to].sort().join(',');
      const length = path.paths.length;
      if (!pathMap[nodes] || pathMap[nodes] > length) {
        pathMap[nodes] = length;
      }
    })
  }
  return paths;
}
getPaths('AA');
Object.keys(nodeMap).filter(key => nodeMap[key].flowRate).forEach(node => getPaths(node));

console.log(JSON.stringify(pathMap, null, 2));

function toTarget(nodeName) {
  return (path) => {
    return path.split(',').filter(node => node !== nodeName)[0];
  };
}

function getOpenFlow(map) {
  try {
    let nodes = Object.values(map);
    let flows = nodes.map(node => node.isOpen ? node.flowRate : 0);
    return utils.sumArray(flows);
  } catch (e) {
    console.log(e);
  }
}

const solve = (nodeName, stepIn, aMap, deep) => {
  console.log('solve', {nodeName, stepIn, deep});
  const map = deepClone(aMap);
  const currentNode = map[nodeName];
  let resultIn = 0;
  if (currentNode.flowRate && !currentNode.isOpen && stepIn < 29) {
    resultIn = getOpenFlow(map);
    currentNode.isOpen = true;
    stepIn++;
  }
  let alternatives = Object.keys(pathMap).filter(key => key.indexOf(nodeName) >= 0).map(toTarget(nodeName));
  alternatives = alternatives.filter(target => {
    const targetNode = map[target];
    return !targetNode.isLeaf || !targetNode.isOpen;
  });
  const results = alternatives.map(target => {
    const subMap = deepClone(map);
    const pathLength = pathMap[[nodeName, target].sort().join(',')]
    if (stepIn + pathLength < 29) {
      let subStep = stepIn + pathLength;
      const partResult = resultIn + getOpenFlow(subMap) * pathLength;
      const bestSolution = solve(target, subStep, subMap, deep+1);
      if (bestSolution) {
        const {result, step, map} = bestSolution;
        console.log('Result', {step, result});
        return {result: result+partResult, step, map};
      }
    }
  }).filter(entry => entry).map(({result, step, map}) => {
    result += getOpenFlow(map) * (30 - step);
    return {result, step:30, map};
  }).sort((a,b)=> b.result - a.result);

  if (results.length) {
    return results[0];
  } else {
    return {result: resultIn + getOpenFlow(map) * (30 - stepIn), step: 30, map};
  }
}

let answer1 = solve('AA', 0, nodeMap, 0);
let answer2 = -1;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2:
