const utils = require('./utils');

class Mapper {
  constructor(filename) {
    this.map = filename ? utils.readFile(filename).map(line => line.split('')) : [[]];
    this.width = this.map[0].length;
    this.height = this.map.length;
    this.counts = {};
    this.visited = {}
  }
  static byArray(array) {
    const map = new Mapper();
    map.map = array.map(line => line.split(''));
    map.width = map.map[0].length;
    map.height = map.map.length;
    return map;
  }
  static byDimensions(width, height, c = '.') {
    const map = new Mapper();
    map.map = Array(height).fill().map(() => Array(width).fill(c));
    map.width = width;
    map.height = height;
    return map;
  }
  clone() {
    const map = new Mapper();
    map.map = this.map.map(row => [...row]);
    map.width = this.width;
    map.height = this.height;
    map.visited = {...this.visited};
    map.counts = {...this.counts};
    return map;
  }
  get(x, y) {
    if (!this.isValidPos(x, y)) {
      return undefined;
    }
    return this.map[y][x];
  }

  isValidPos(x, y) {
    return !(x < 0 || x >= this.width || y < 0 || y >= this.height);
  }

  transform(aFun) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.set(x, y, aFun(this.get(x, y), x, y));
      }
    }
    return this;
  }

  set(x, y, c) {
    if (!this.isValidPos(x, y)) {
      return undefined;
    }
    const oldC = this.map[y][x];
    this.map[y][x] = c;
    return oldC;
  }
  print(title, aSecondMap) {
    const aMap = aSecondMap || this.map;
    const contentWidth = this.width;
    const titleWidth = title ? title.length : 0;
    const totalWidth = Math.max(contentWidth, titleWidth);

    if (title) {
      const padding = Math.floor((totalWidth - titleWidth) / 2);
      console.log(' '.repeat(padding) + title + ' '.repeat(totalWidth - titleWidth - padding));
    }

    const rowPadding = ' '.repeat(Math.floor((totalWidth - contentWidth) / 2));
    const horizontalBorder =  rowPadding + '+' + '-'.repeat(contentWidth) + '+';
    console.log(horizontalBorder);

    if (typeof aMap[0] === 'string') {
      aMap.forEach(row => {
        console.log(rowPadding + '|' + row + '|');
      });
    } else {
      aMap.forEach(row => {
        console.log(rowPadding + '|' + row.join('') + '|');
      });
    }

    console.log(horizontalBorder);
    console.log('\n');
    return this;
  }

  count(aChar) {
    let result = 0;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.get(x, y) === aChar) {
          result++;
        }
      }
    }
    return result;
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
  find( aFun) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (aFun(this.get(x, y), x, y)) {
          return {x, y};
        }
      }
    }
    return undefined;
  }

  addCount(x,y, c){
    const key = `${x},${y}`;
    this.counts[key] = (this.counts[key] || 0) + c;
  }

  getCount(x, y) {
    const key = `${x},${y}`;
    return this.counts[key] || 0;
  }

  getColsForRow(row) {
    return Object.keys(this.counts).filter(key => key.endsWith(`,${row}`)).map(key => parseInt(key.split(',')[0]));
  }

  getCountsForRow(row) {
    return Object.keys(this.counts).filter(key => key.endsWith(`,${row}`)).map(key => this.counts[key]).reduce((a, b) => a + b, 0);
  }

  static getAllDir() {
    return [[0, -1, 'N'], [1, -1, 'NE'], [1, 0, 'E'], [1, 1, 'SE'], [0, 1, 'S'], [-1, 1, 'SW'], [-1,0, 'W'], [-1, -1, 'NW']];
  }
  getDiagonalDir() {
    return [[1, 1, 'SE'], [1, -1, 'NE'], [-1, 1, 'SW'], [-1, -1, 'NW']];
  }
  static getOrtoDir() {
    return [[0, -1, 'N'], [1, 0, 'E'], [0, 1, 'S'], [-1,0, 'W']];
  }
  static getOrtoDirMap() {
    return {N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0]};
  }
  hasVisited = (x, y) => {
    return this.visited[x + ',' + y];
  };
  setVisited = (x, y) => {
    this.visited[x + ',' + y] = true;
  };
}

module.exports = Mapper;

if (__filename === require.main.filename) {
  const map = Mapper.byDimensions(3, 3, '.');
  map.set(1, 1, 'X');
  map.print("Small test");
}
