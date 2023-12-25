const utils = require('../../utils');
let graph = {};
utils.processLine(line => {
  const [node, rest] = line.split(': ');
  const ends = rest.split(' ');

  ends.forEach(end => {
    if (!graph[node]) {
      graph[node] = [];
    }
    if (!graph[end]) {
      graph[end] = [];
    }

    graph[node].push(end);
    graph[end].push(node);
  })
}, 'input.txt');


function getComponentSize() {
  const start = Object.keys(graph)[0];
  let component = new Set([start]);
  let middleEdges = new Set(graph[start].map(end => JSON.stringify([start, end])));

  while (middleEdges.size > 3) {
    let nextNode = [...middleEdges].map(edge => JSON.parse(edge)[1])
      .reduce((a, b) => {
        let aScore = graph[a].reduce((score, end) => score + (component.has(end) ? -1 : 1), 0);
        let bScore = graph[b].reduce((score, end) => score + (component.has(end) ? -1 : 1), 0);
        return aScore < bScore ? a : b;
      });

    component.add(nextNode);

    graph[nextNode].forEach(end => {
      let edge = JSON.stringify([nextNode, end]);
      let reverseEdge = JSON.stringify([end, nextNode]);
      if (component.has(end)) {
        middleEdges.delete(reverseEdge);
      } else {
        middleEdges.add(edge);
      }
    });
  }

  return component.size;
}

const size = getComponentSize();
let answer1 = size * (Object.keys(graph).length - size);

console.log("Answer1:", answer1);
// Answer1: 596376
