const utils = require('../../utils');

function dist(p1, p2) {
  return (p1 < p2) ? p2 - p1 : p1 - p2;
}

//const row = 10, maxSearch = 20, file = 'test.txt';
const row = 2000000, maxSearch = 4000000, file = 'input.txt';

const beacons = utils.processLine(line => {
  const pattern = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
  const match = line.match(pattern).map(Number);
  const [,sx,sy,bx,by] = match;
  return {sx, sy, bx, by, dist: dist(sx, bx) + dist(sy,by)};
  }, file)

const bounds = beacons.reduce((acc, beacon) => {
  acc.maxX = Math.max(acc.maxX, beacon.sx + beacon.dist) || beacon.sx + beacon.dist;
  acc.maxY = Math.max(acc.maxY, beacon.sy + beacon.dist) || beacon.sy + beacon.dist;
  acc.minX = Math.min(acc.minX, beacon.sx - beacon.dist) || beacon.sx - beacon.dist;
  acc.minY = Math.min(acc.minY, beacon.sy - beacon.dist) || beacon.sy - beacon.dist;
  return acc;
}, {});

let answer1 = 0;
for (let x = bounds.minX ; x <= bounds.maxX; x++) {
  if (beacons.find(beacon => dist(x, beacon.sx) + dist(row, beacon.sy) <= beacon.dist)) {
    if (!beacons.find(beacon => x === beacon.sx && row === beacon.sy) &&
      !beacons.find(beacon => x === beacon.bx && row === beacon.by)) {
      answer1++;
    }
  }
}

let answer2 = -1;

const map = new Array(maxSearch + 1).fill().map(() => []);
for (const { sx, sy, bx, by } of beacons) {
  map.forEach((ranges, y) => {
    const distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y);
    if (distance >= 0) {
      ranges.push([sx - distance, sx + distance])
    };
    if (by === y) {
      ranges.push([bx, bx]);
    }
  });
}
for (let y = 0; y < map.length; y++) {
  let possible = 0;
  for (const range of map[y].sort((a, b) => a[0] - b[0])) {
    if (range[0] <= possible && range[1] >= possible) {
      possible = range[1] + 1;
    }
  }
  if (possible <= maxSearch) {
    answer2 = possible * 4000000 + y;
    break;
  };
}

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 6124805 Answer2: 12555527364986
