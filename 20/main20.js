const utils = require('../utils');

const tiles = [];

function stringToNumber(string) {
  let converted = string.replaceAll('.', '0').replaceAll('#', '1');
  const num1 = parseInt(converted, 2);
  const num2 = parseInt(converted.split('').reverse().join(''), 2);

  return ('' + Math.min(num1, num2)).padStart(4, '0');
}

function extractCol(col, rows) {
  return rows.map(row => row[col]).join('');
}

function calculateSideNumbers(tile) {
  let colMax = tile.rows.length - 1;
  tile.numbers = [
    stringToNumber(tile.rows[0]),
    stringToNumber(extractCol(colMax, tile.rows)),
    stringToNumber(tile.rows[colMax]),
    stringToNumber(extractCol(0, tile.rows))];
}

utils.processMultiLine(parts => {
  const tile = {
    number: parseInt(parts[0].match(/Tile (\d+):/)[1]),
    rows: parts.slice(1)
  };
  calculateSideNumbers(tile);
  tiles.push(tile);
}, 'test1.txt');

const printTile = tile => {
  console.log('Tile' + tile.number);
  console.log('        (' + tile.numbers[0] + ')');
  console.log('(' + tile.numbers[3] + ')' + tile.rows[0] + '(' + tile.numbers[1] + ')');
  tile.rows.slice(1).forEach(row => console.log(row.padStart(16, ' ')));
  console.log('        (' + tile.numbers[2] + ')');
  console.log('');
}

const numbers = tiles.map(tile => tile.numbers).flat().sort();
const freq = numbers.reduce((rest,part) => {
  rest[part] = (rest[part] || 0) + 1;
  return rest;
}, {})

const getCount = num => freq[num];

tiles.forEach(tile => {
  tile.matchCount = tile.numbers.reduce((rest,part) => getCount(part) + rest, 0);
})

let corners = tiles.filter(tile => tile.matchCount === 6);
const answer1 = corners.reduce((rest, tile) => rest*tile.number, 1);

let sideLen = Math.sqrt(tiles.length);
console.log({tileCount:tiles.length, sideLen});
console.log({answer1});

const positions = {};
const firstCorner = corners.pop();
const cornerSides = firstCorner.numbers.filter(num => getCount(num) === 1)

const flipTileH = tile => {
  const result = JSON.parse(JSON.stringify(tile));
  result.rows = result.rows.reverse();
  calculateSideNumbers(result);
  return result;
}

const flipTileV = tile => {
  const result = JSON.parse(JSON.stringify(tile));
  result.rows = result.rows.map(row => row.split('').reverse().join(''));
  calculateSideNumbers(result);
  return result;
}

function findDirection(tile, num) {
  return ['n', 'e', 's', 'w'][tile.numbers.indexOf(num)];
}

function rotateTileR(tile) {
  const newRows = [];
  for (let col = 0 ; col < tile.rows[0].length ; col++) {
    newRows.push(tile.rows.map(row => row[col]).reverse().join(''))
  }
  tile.rows = newRows;
  calculateSideNumbers(tile);
  return tile;
}

function rotateTileL(tile) {
  const newRows = [];
  for (let col = tile.rows[0].length - 1 ; col >= 0 ; col--) {
    newRows.push(tile.rows.map(row => row[col]).join(''))
  }
  tile.rows = newRows;
  calculateSideNumbers(tile);
  return tile;
}

function flipTileMatching(tile, north, west) {
  let result = tile;
  switch (findDirection(tile, north)) {
    case "n":
      break;
    case "w":
      result = rotateTileR(tile);
      break;
    case "e":
      result = rotateTileL(tile);
      break;
    case "s":
      result = flipTileH(tile);
      break;
  }
  switch (findDirection(result, west)) {
    case "w":
      break;
    case "e":
      result = flipTileV(result);
      break;
    case "n":
    case "s":
      console.log('SNAFU shouldn\'t find side here!');
      break;
  }
  return result;
}

const topLeft = flipTileMatching( firstCorner, cornerSides[0], cornerSides[1])

console.log({cornerSides});
positions['0_0'] = topLeft;

function findTileWithNumberIgnoring(num, tileNum) {
  return tiles.find(tile => tile.numbers.indexOf(num) >= 0 && tile.number !== tileNum);
}

function findOpposingSideTo(tile, sideNum) {
  return tile.numbers[[2,3,0,1][tile.numbers.indexOf(sideNum)]];
}

function findEdgeNumberIgnoring(tile, ignoreNum) {
  return tile.numbers.find(num => getCount(num) === 1 && num !== ignoreNum)
}

console.log('Cols');
for (let col = 1; col < sideLen ; col++) {
  let leftTile = positions['0_' + (col - 1)];
  let westNum = leftTile.numbers[1];
  let tile = findTileWithNumberIgnoring(westNum, leftTile.number);
  const opposingNumber = findOpposingSideTo(tile, westNum);
  const northNum = findEdgeNumberIgnoring(tile, opposingNumber);
  tile = flipTileMatching(tile, northNum, westNum);
  positions['0_' + col] = tile;
}

console.log('Rows');
for (let row = 1; row < sideLen ; row++) {
  let topTile = positions[(row - 1) + '_0'];
  let northNum = topTile.numbers[2];
  let tile = findTileWithNumberIgnoring(northNum, topTile.number);
  const opposingNumber = findOpposingSideTo(tile, northNum);
  const westNum = findEdgeNumberIgnoring(tile, opposingNumber);
  tile = flipTileMatching(tile, northNum, westNum);
  positions[row + '_0'] = tile;
}

for (let row = 1; row < sideLen ; row++) {
  for (let col = 1; col < sideLen ; col++) {
    let leftTile = positions[row + '_' + (col - 1)];
    let topTile  = positions[(row - 1) + '_' + col];
    let westNum  = leftTile.numbers[1];
    let northNum = topTile.numbers[3];

    let tile = findTileWithNumberIgnoring(westNum, leftTile.number);
    tile = flipTileMatching(tile, northNum, westNum);
    positions[row + '_' + col] = tile;
  }
}

let totalMap = []

for (let row = 0; row < sideLen ; row++) {
  const partRows = positions[row + '_0'].rows.slice();
  for (let col = 1; col < sideLen ; col++) {
    const tile = positions[row + '_' + col];
    for (let subRow = 0; subRow < tile.rows.length ; subRow++) {
      partRows[subRow] = partRows[subRow] + tile.rows[subRow];
    }
  }
  partRows.forEach(row => totalMap.push(row));
}

console.log({totalMap});