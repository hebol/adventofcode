const utils = require('../../utils');
const inputs = utils.readFile('input.txt');
function tiltTo(map, dir) {
  let load = 0;
  for (let y = (dir == "north" ? 0 : map.length - 1); (dir == "north" ? y < map.length : y >= 0); (dir == "north" ? y++ : y--)) {
    for (let x = (dir == "west" ? 0 : map[y].length - 1); (dir == "west" ? x < map[y].length : x >= 0);(dir == "west" ? x++ : x--)) {
      function move(x, y) {
        let [toX, toY] = { "north": [x, y-1], "south": [x, y+1], "west": [x-1, y], "east": [x+1, y]}[dir];

        if (toY >= 0 && toY < map.length && toX >= 0 && toX < map[y].length && map[y][x] === "O" && map[toY][toX] === ".") {
          map[y]   = map[y].substring(0, x) +     "." + map[y].substring(x + 1);
          map[toY] = map[toY].substring(0, toX) + "O" + map[toY].substring(toX + 1);
          move(toX, toY);
        }
      }
      move(x, y);
    }
  }

  if (calcPart1 || dir == "east")
    for (let i = 0, multiplier = 1; i < map.length; i++, multiplier++) {
      load += (map[map.length - 1 - i].match(/O/g) || []).length * multiplier;
    }
  return [map, load];
}

let pattern = [];
let calcPart1 = true;
let answer1 = tiltTo(inputs, "north")[1];

calcPart1 = false;
let northState, westState, southState;
let answer;

let eastState = [inputs];

while (true) {
  northState = tiltTo(eastState[0], "north");
  westState  = tiltTo(northState[0], "west");
  southState = tiltTo(westState[0], "south");
  eastState  = tiltTo(southState[0], "east");

  let aMap = eastState[0].join("\n") + "_" + eastState[1].toString();

  if (pattern.includes(aMap)) {
    answer = [pattern.indexOf(aMap), pattern.length];
    break;
  } else {
    pattern.push(aMap);
  }
}

let repeatsFrom = answer[0];
let cycleLength = answer[1] - repeatsFrom;
let modulo = (999999999 - repeatsFrom) % cycleLength;

let answer2 = pattern[repeatsFrom + modulo].split("_")[1];

console.log("Answer1:", answer1, "Answer2:", answer2);
//Answer1: 109424 Answer2: 102509
