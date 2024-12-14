const utils = require('../../utils');

let priceList = utils.processMultiLine(lines => {
  const [dxA, dyA] = lines[0].match(/(\d+)/g).map(Number);
  const [dxB, dyB] = lines[1].match(/(\d+)/g).map(Number);
  const [px, py] = lines[2].match(/(\d+)/g).map(Number);
  return {dxA, dyA, dxB, dyB, px, py};
}, 'input.txt')

const calculateAnswers = (offset) => {
  let result = 0;
  priceList.forEach(({dxA, dyA, dxB, dyB, px, py}) => {
    px += offset;
    py += offset;

    const a = (px * (dxB - dyB) - dxB * (px - py)) / (dxA * (dxB - dyB) + dxB * (dyA - dxA));
    const b = (px - dxA * a) / dxB;
    if (a === Math.floor(a) && b === Math.floor(b)) {
      result += a * 3 + b
    }
  })
  return result;
}

let answer1 = calculateAnswers(0);
let answer2 = calculateAnswers(10000000000000);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 26810 Answer2: 108713182988244
