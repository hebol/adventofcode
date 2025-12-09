const utils = require('../../utils');
let arrayList = utils.readFile('input.txt').map(line => line.split(',').map(Number))
let rectangles = [];

for (let row1 = 0; row1 < arrayList.length - 1; row1++) {
  for (let row2 = row1 + 1; row2 < arrayList.length; row2++) {
    const area =
      (Math.abs(arrayList[row1][0] - arrayList[row2][0]) + 1) *
      (Math.abs(arrayList[row1][1] - arrayList[row2][1]) + 1);
    rectangles.push({
      range: [
        Math.min(arrayList[row1][0], arrayList[row2][0]),
        Math.max(arrayList[row1][0], arrayList[row2][0]),
        Math.min(arrayList[row1][1], arrayList[row2][1]),
        Math.max(arrayList[row1][1], arrayList[row2][1]),
      ],
      area,
    });
  }
}

rectangles = rectangles.sort((a, b) => b.area - a.area);

const answer1 = rectangles[0].area;

let answer2 = -1;
const isWithin = (pos, rect) => {
  return pos[0] > rect.range[0] && pos[0] < rect.range[1] && pos[1] > rect.range[2] && pos[1] < rect.range[3];
};

const isLineCrossingX = (pos1, pos2, rect) => {
  return Math.min(pos1[0], pos2[0]) <= rect.range[0] && Math.max(pos1[0], pos2[0]) >= rect.range[1] &&
    pos1[1] > rect.range[2] && pos1[1] < rect.range[3] && pos2[1] > rect.range[2] && pos2[1] < rect.range[3];
};

const isLineCrossingY = (pos1, pos2, rect) => {
  return Math.min(pos1[1], pos2[1]) <= rect.range[0] && Math.max(pos1[1], pos2[1]) >= rect.range[3] &&
    pos1[0] > rect.range[0] && pos1[0] < rect.range[1] && pos2[0] > rect.range[0] && pos2[0] < rect.range[1];
};

for (const rect of rectangles) {
  let isOk = true;
  for (let index1 = 0; index1 < arrayList.length; index1++) {
    const index2 = index1 === arrayList.length - 1 ? 0 : index1 + 1;

    if (isWithin(arrayList[index1], rect) || isLineCrossingX(arrayList[index1], arrayList[index2], rect) ||
      isLineCrossingY(arrayList[index1], arrayList[index2], rect)) {
      isOk = false;
      break;
    }
  }

  if (isOk) {
    answer2 = rect.area;
    break;
  }
}

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 4725826296 Answer2: 1637556834
