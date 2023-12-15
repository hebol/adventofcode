const utils = require('../../utils');
const inputs = utils.readFile('input.txt');
function where_to(map, dir) {
  let load = 0;
  for (let y = (dir == "up" ? 0 : map.length - 1); (dir == "up" ? y < map.length : y >= 0); (dir == "up" ? y++ : y--)) {
    for (let x = (dir == "left" ? 0 : map[y].length - 1); (dir == "left" ? x < map[y].length : x >= 0);(dir == "left" ? x++ : x--)) {
      (function move(y, x) {
        let _y, _x;

        switch (dir) {
          case "up":
            _y = y - 1;
            _x = x;
            break;
          case "down":
            _y = y + 1;
            _x = x;
            break;
          case "left":
            _y = y;
            _x = x - 1;
            break;
          case "right":
            _y = y;
            _x = x + 1;
            break;
        }

        if (_y >= 0 && _y < map.length && _x >= 0 && _x < map[y].length && map[y][x] === "O" && map[_y][_x] === ".") {
          map[y] = map[y].substring(0, x) + "." + map[y].substring(x + 1);
          map[_y] = map[_y].substring(0, _x) + "O" + map[_y].substring(_x + 1);
          move(_y, _x);
        }
      })(y, x);
    }
  }

  if (calcPart1 || dir == "right")
    for (let i = 0, multiplier = 1; i < map.length; i++, multiplier++) {
      load += (map[map.length - 1 - i].match(/O/g) || []).length * multiplier;
    }
  return [map, load];
}

let pattern = [];
let calcPart1 = true;
let answer1 = where_to(inputs, "up")[1];

calcPart1 = false;
let upState, leftState, downState;
let answer;

let rightState = [inputs];

while (true) {
  upState    = where_to(rightState[0], "up");
  leftState  = where_to(upState[0], "left");
  downState  = where_to(leftState[0], "down");
  rightState = where_to(downState[0], "right");

  let aMap = rightState[0].join("\n") + "_" + rightState[1].toString();

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
