const utils = require('../../utils');

const findMirror = (aMap, maxSmudges = 0) => {
  const columns = aMap[0].length;
  for ( let mirrorPosition = 1; mirrorPosition < aMap[0].length; mirrorPosition++) {
    const startX = Math.max(0, mirrorPosition - (columns - mirrorPosition));
    let smudges = 0;

    for (let y = 0; y < aMap.length; y++) {
      for (let x = startX; x < mirrorPosition; x++) {
        if (aMap[y][x] !== aMap[y][mirrorPosition + (mirrorPosition - x - 1)]) {
          smudges++;
        }
      }
      if (smudges > maxSmudges) {
        break;
      }
    }
    if (smudges === maxSmudges) {
      return mirrorPosition;
    }
  }

  return 0;
};

const getResult = (lines, smudges = 0) => {
  const map = lines.map((line) => line.split(""));
  const transposed = utils.transposeMap(map);
  return findMirror(map, smudges) + 100 * findMirror(transposed, smudges);
}

let filename = "input.txt";
let answer1 = utils.sumArray(utils.processMultiLine(lines => getResult(lines, 0), filename));
let answer2 = utils.sumArray(utils.processMultiLine(lines => getResult(lines, 1), filename));


console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 37718 Answer2: 40995
