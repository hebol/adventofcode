const utils = require('../../utils');

const findMirror = (aMap, maxErrors = 0) => {
  const width = aMap[0].length;
  for ( let mirrorPos = 1; mirrorPos < aMap[0].length; mirrorPos++) {
    const startX = Math.max(0, mirrorPos - (width - mirrorPos));
    let smudges = 0;

    for (let y = 0; y < aMap.length; y++) {
      for (let x = startX; x < mirrorPos; x++) {
        if (aMap[y][x] !== aMap[y][mirrorPos + (mirrorPos - x - 1)]) {
          smudges++;
        }
      }
      if (smudges > maxErrors) {
        break;
      }
    }
    if (smudges === maxErrors) {
      return mirrorPos;
    }
  }

  return 0;
};

const getResult = (lines, maxErrors = 0) => {
  const map = lines.map((line) => line.split(""));
  return findMirror(map, maxErrors) + 100 * findMirror(utils.transposeMap(map), maxErrors);
}

let filename = "input2.txt";
let answer1 = utils.sumArray(utils.processMultiLine(lines => getResult(lines, 0), filename));
let answer2 = utils.sumArray(utils.processMultiLine(lines => getResult(lines, 1), filename));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 37718 Answer2: 40995
