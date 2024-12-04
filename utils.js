const fs = require('fs');
const path = require('path');
const process = require('process');
const moment = require('moment');
const axios = require('axios');

if (parseInt(require.main.path.split('/').pop()) !== moment().date()) {
  console.log('==> Not todays problem!');
}

let theInterval = 10000;
let now = new Date();

module.exports = {
  readRawFile: (name) => {
    const rawData = fs.readFileSync(name || './input.txt');
    return String(rawData);
  },
  readFile: (name) => {
    const rawData = fs.readFileSync(name || './input.txt');
    const stringData = String(rawData);
    const arrayList = stringData.split('\n');
    return arrayList.filter(entry => entry && entry.trim().length >= 0);
  },
  readFileNoFilter: (name) => {
    const rawData = fs.readFileSync(name || './input.txt');
    const stringData = String(rawData);
    return stringData.split('\n');
  },
  processLine: (handler, name) => {
    const rawData = fs.readFileSync(name || './input.txt');
    const stringData = String(rawData);
    var arrayList = stringData.split('\n');
    return arrayList.filter(entry => entry.length).map(handler);
  },
  processMultiLine: (handler, name) => {
    const rawData = fs.readFileSync(name || './input.txt');
    const stringData = String(rawData);
    const arrayList = stringData.split('\n');
    let sum = [];
    let currentData = [];
    let index = 0;
    while (arrayList.length > 0) {
      const line = arrayList.shift();
      if (line.length > 0) {
        currentData.push(line);
      }
      if (line.length === 0 || arrayList.length === 0) {
        sum.push(handler(currentData, index++));
        currentData = [];
      }
    }
    return sum;
  },
  numericalSort: (a,b)=>a-b,
  sumArray: (array) => { return array.reduce((rest, entry) => rest + parseInt(entry), 0);},
  multiplyArray: (array) => { return array.reduce((rest, entry) => rest * parseInt(entry), 1);},
  setupWatchdog: (interval) => {
    theInterval = interval || theInterval;
    now = new Date();
  },
  watchdog: (count) => {
    if (count) {
      if (theInterval && (count % theInterval === 0)) {
        console.log(new Date(), count);
      }
    } else {
      const newNow = new Date();
      if (newNow.getTime() - 10000 > now.getTime()) {
        console.log(new Date(), count);
        now = newNow;
      }
    }
  },
  checkDataInputFileExists: () => {
    const parts = process.cwd().split(path.sep);
    const day = parts.pop();
    const year = parts.pop();
    if (!fs.existsSync('input.txt')) {

      let url = 'https://adventofcode.com/' + year + '/day/' + parseInt(day) + '/input';
      axios.get(url, {
          headers: {
            Cookie: "session=53616c7465645f5f663fbd54ca32d821ff337d04d046e1686f904610bfe8fcf8e6ddbbcd12a1e346eff2583c24b8dc76c9dc668d0c3939a1462f8730b2cce6f1"
          }
        })
        .then(response => {
          return new Promise((resolve) => {
            console.log('Data written for', {year, day});
            fs.writeFile('input.txt', response.data, resolve);
          })
        })
        .catch(error => {
          console.log('Error reading day', {year, day, url}, error.message);
        });
    } else {
      console.log('Data exists for', {year, day});
      return Promise.resolve();
    }
  },
  splitNumberRow: row => row.split(' ').filter(entry => entry.length).map(value=>parseInt(value)),
  getPath: (fromX, toX, fromY, toY) => {
    const xDiff = toX - fromX;
    const yDiff = toY - fromY;
    let steps = Math.abs(xDiff) + Math.abs(yDiff);
    const dx = xDiff / steps;
    const dy = yDiff / steps;
    return {
      xDiff, yDiff, steps, dx, dy
    }
  },
  findMapBounds: (map, toPoint) => {
    let minX, maxX, minY, maxY;
    Object.keys(map).forEach(key => {
      const {x, y} = toPoint(key);
      maxX = Math.max(maxX, x) || x;
      maxY = Math.max(maxY, y) || y;
      minX = Math.min(minX, x) || x;
      minY = Math.min(minY, y) || y;
    })
    return {minX, maxX, minY, maxY};
  },
  minstaGemensammaNamnaren: numList => {
    function gcd(a, b) {
      while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
      }
      return a;
    }
    function lcm(a, b) {
      return (a * b) / gcd(a, b);
    }
    return numList.reduce((a, b) => lcm(a, b));
  },
  cacheFunction: aFun => {
    const stored = {};

    return (...args) => {
      const key = JSON.stringify(args);
      if (stored.hasOwnProperty(key)) {
        return stored[key];
      }
      const result = aFun(...args);
      stored[key] = result;
      return result;
    };
  },
  transposeMap: map => {
    const result = new Array(map[0].length).fill('').map( () => {
      return new Array(map.length).fill('')
    });
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        result[x][y] = map[y][x];
      }
    }
    return result;
  },
    // Using Pick's Theorem
  perimeterAndPosArrayToArea: (perimeter, posArray) => {
    let a = 0
    for (let i = 0 ; i < posArray.length - 1; i++) {
      a += (posArray[i][1] + posArray[i + 1][1]) * (posArray[i][0] - posArray[i + 1][0])
    }
    return perimeter / 2 + Math.abs(a) / 2 + 1;
  },
  gaussianElimination: (A, b) => {
    let n = A.length;

    for (let i = 0; i < n; i++) {
      let diag = A[i][i];
      for (let j = 0; j < n; j++) {
        A[i][j] /= diag;
      }
      b[i] /= diag;

      for (let j = 0; j < n; j++) {
        if (i !== j) {
          let factor = A[j][i];
          for (let k = 0; k < n; k++) {
            A[j][k] -= factor * A[i][k];
          }
          b[j] -= factor * b[i];
        }
      }
    }
    return b;
  },
  arrayToMap: (array, key) => {
    return array.reduce((map, entry) => {
      map[entry[key]] = entry;
      return map;
    }, {});
  },
}

