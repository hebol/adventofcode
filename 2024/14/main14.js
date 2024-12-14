const utils = require('../../utils');
const Mapper = require("../../Mapper");

//p=85,34 v=81,38

let arrayList = utils.processLine(line => {
    const [,x, y, dx, dy] = line.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/);
    return {x: parseInt(x), y: parseInt(y), dx: parseInt(dx), dy: parseInt(dy)};
  },'input.txt')

const mapWidth = 101;
const mapHeight = 103;

for (let i = 0; i < 100; i++) {
  arrayList = arrayList.map(({x, y, dx, dy}) => ({x: (x + dx + mapWidth) % mapWidth, y: (y + dy + mapHeight) % mapHeight, dx, dy}));
}
const map = Mapper.byDimensions(mapWidth, mapHeight);
arrayList.forEach(({x, y}) => map.set(x, y, '#'));
map.print();
const results = [0, 0, 0, 0];
arrayList.forEach(({x, y}) => {
  let index = y > mapHeight / 2 ? 2 : 0;
  index += x > mapWidth / 2 ? 1 : 0;
  if (x !== (mapWidth - 1) / 2 && y !== (mapHeight - 1) / 2) {
    results[index]++;
  }
});

let answer1 = utils.multiplyArray(results);
let answer2 = 7037; //Visual!

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 218965032 Answer2: 7037
