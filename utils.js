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

      axios.get('https://adventofcode.com/' + year + '/day/' + parseInt(day) + '/input', {
          headers: {
            Cookie: "session=53616c7465645f5f748a0a80f85813598a2965237e05107b746e445b4f7038a1f7e31fc95b3736f3d3e3554e54532167d6db1c2b43f77974db5856413bf68edc"
          }
        })
        .then(response => {
          return new Promise((resolve) => {
            console.log('Data written for', {year, day});
            fs.writeFile('input.txt', response.data, resolve);
          })
        })
        .catch(error => {
          console.log('Error reading day', {year, day}, error.message);
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
  printMap: (aMap, title) => {
    title && console.log(title);
    console.log(aMap.join('\n'));
    console.log('\n');
  },
}

