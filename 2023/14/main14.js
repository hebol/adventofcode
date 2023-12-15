const utils = require('../../utils');
const inputs = utils.readFile('input.txt').map(row => row.split(''));
function tiltTo(map, dir, doCalc) {
  let load = 0;
  for (let y = (dir === "north" ? 0 : map.length - 1); (dir === "north" ? y < map.length : y >= 0); (dir === "north" ? y++ : y--)) {
    for (let x = (dir === "west" ? 0 : map[y].length - 1); (dir === "west" ? x < map[y].length : x >= 0);(dir === "west" ? x++ : x--)) {
      function move(x, y) {
        let [toX, toY] = { "north": [x, y-1], "south": [x, y+1], "west": [x-1, y], "east": [x+1, y]}[dir];

        if (toY >= 0 && toY < map.length && toX >= 0 && toX < map[y].length && map[y][x] === "O" && map[toY][toX] === ".") {
          map[y][x] = '.';
          map[toY][toX] = 'O';
          move(toX, toY);
        }
      }
      move(x, y);
    }
  }

  if (doCalc) {
    for (let i = 0 ; i < map.length; i++) {
      load += utils.sumArray(map[map.length - 1 - i].map((c) => c === 'O' ? (i+1): 0));
    }
  }

  return [map, load];
}

let answer1 = tiltTo(inputs, "north", true)[1];

const runPart2 = () => {
  let pattern = [];
  let state = [inputs];

  while (true) {
    state = tiltTo(state[0], "north");
    state = tiltTo(state[0], "west");
    state = tiltTo(state[0], "south");
    state = tiltTo(state[0], "east", true);

    let aMap = state[0].join("\n") + "_" + state[1].toString();

    if (pattern.includes(aMap)) {
      const repeatsFrom = pattern.indexOf(aMap);
      const patternLength =  pattern.length;
      let cycleLength = patternLength - repeatsFrom;
      let modulo = (999999999 - repeatsFrom) % cycleLength;

      return pattern[repeatsFrom + modulo].split("_")[1];
    } else {
      pattern.push(aMap);
    }
  }
}

let answer2 = runPart2();

console.log("Answer1:", answer1, "Answer2:", answer2);
//Answer1: 109424 Answer2: 102509
