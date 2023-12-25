const utils = require('../../utils');
let stoneArray = utils.processLine(line => {
  const [l, x, y, z, dx, dy, dz] = line.match(/(\d+), +(\d+), +(\d+) +@ +(-?\d+), +(-?\d+), +(-?\d+)/).map(Number);
  return {x, y, z, dx, dy, dz};
}, 'input.txt')

const compareLines = (min, max) => {
  return (l1, l2) => {
    let denominator = l1.dx * l2.dy - l1.dy * l2.dx;
    if (denominator !== 0) {
      let t1 = ((l2.x - l1.x) * l2.dy + (l1.y - l2.y) * l2.dx) / denominator;
      let t2 = ((l1.x - l2.x) * l1.dy + (l2.y - l1.y) * l1.dx) / -denominator;

      let intersects = isFinite(t1) && isFinite(t2);
      if (intersects) {
        const x = l1.x + l1.dx * t1;
        const y = l1.y + l1.dy * t1;
        return x >= min && x <= max && y >= min && y <= max && t1 >= 0 && t2 >= 0;
      }
      return false;
    }
  }
};

let aMin = 7, aMax = 27;
if (stoneArray.length > 9) {
  aMin = 200000000000000;
  aMax = 400000000000000;
}
const intersections = stoneArray.map(l1 => {
  return stoneArray.filter(l => l !== l1).filter(l2 => compareLines(aMin,aMax)(l1, l2)).length;
});

let answer1 = utils.sumArray(intersections) / 2;

console.log("Answer1:", answer1);
// Answer1:  16812
