const utils = require('./utils');

class Mapper {
  constructor(filename) {
    this.map = utils.readFile(filename).map(line => line.split(''));
    this.width = this.map[0].length;
    this.height = this.map.length;
  }
  get(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return undefined;
    }
    return this.map[y][x];
  }
  findMultiple( aFun) {
    let result = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (aFun(this.get(x, y), x, y)) {
          result.push({x, y});
        }
      }
    }
    return result;
  }
  getAllDir() {
    return [[0, 1, 'S'], [0, -1, 'N'], [1, 0, 'E'], [1, 1, 'SE'], [1, -1, 'NE'], [-1,0, 'W'], [-1, 1, 'SW'], [-1, -1, 'NW']];
  }
  getDiagonalDir() {
    return [[1, 1, 'SE'], [1, -1, 'NE'], [-1, 1, 'SW'], [-1, -1, 'NW']];
  }
  getOrtoDir() {
    return [[0, 1, 'S'], [0, -1, 'N'], [1, 0, 'E'], [-1,0, 'W']];
  }
}

module.exports = Mapper;