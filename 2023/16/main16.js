const utils = require('../../utils');
let map = utils.readFile('input2.txt')

const moveBeam = (beam) => {
  switch (beam.dir) {
    case 'e':
      beam.x++;
      break;
    case 'w':
      beam.x--;
      break;
    case 'n':
      beam.y--;
      break;
    case 's':
      beam.y++;
      break;
  }
  return !(beam.x < 0 || beam.y < 0 || beam.x >= map[0].length || beam.y >= map.length);
};

const traverse = (x, y, dir) => {
  const visited = {}
  let beams = [{x, y, dir}];
  const handleSplit = (split, beam, beams) => {
    if (split.length > 1) {
      beam.dir = split[0];
      let newBeam = {x: beam.x, y: beam.y, dir: split[1]};
      if (moveBeam(newBeam)) {
        let key = `${beam.x},${beam.y},${split[1]}`;
        if (!visited[key]) {
          visited[key] = true;
          beams.push(newBeam);
        }
      }
    }
  };
  while (beams.length > 0) {
    const beam = beams.pop();
    let key = `${beam.x},${beam.y},${beam.dir}`;
    if (!visited[key]) {
      visited[key] = true;
      switch (map[beam.y][beam.x]) {
        case '.':
          break;
        case '/':
          beam.dir = {e: 'n', w: 's', n: 'e', s: 'w'}[beam.dir];
          break;
        case '\\':
          beam.dir = {e: 's', w: 'n', n: 'w', s: 'e'}[beam.dir];
          break;
        case '|':
          handleSplit( {e: 'ns', w: 'ns', n: 'n', s: 's'}[beam.dir], beam, beams);
          break;
        case '-':
          handleSplit( {e: 'e', w: 'w', n: 'ew', s: 'ew'}[beam.dir], beam, beams);
          break;
      }
      if (moveBeam(beam) === true) {
        beams.push(beam);
      }
    }
  }
  const visitedMap = {};
  Object.keys(visited).forEach(str => {
    visitedMap[str.slice(0, -2)] = true;
  });
  return Object.keys(visitedMap).length;
}

let max = -1;
for (let x = 0 ; x < map[0].length; x++) {
  max = Math.max(max, traverse(x, 0, 's'));
  max = Math.max(max, traverse(x, map.length - 1, 'n'));
}
for (let y = 0 ; y < map.length; y++) {
  max = Math.max(max, traverse(0, y, 'e'));
  max = Math.max(max, traverse(map[0].length - 1, y, 'w'));
}

let answer1 = traverse(0, 0, 'e');
let answer2 = max;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 7870 Answer2: 8143
