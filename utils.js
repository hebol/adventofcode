const fs = require('fs');
const moment = require('moment');

if (parseInt(require.main.path.split('/').pop()) !== moment().date()) {
  console.log('==> Not todays problem!');
}

let theInterval = 10000;
let now = new Date();

module.exports = {
  readFile: (name) => {
    const rawData = fs.readFileSync(name || './input.txt');
    const stringData = String(rawData);
    var arrayList = stringData.split('\n');
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
    var arrayList = stringData.split('\n');
    let sum = [];
    let currentData = [];
    while (arrayList.length > 0) {
      const line = arrayList.shift();
      if (line.length > 0) {
        currentData.push(line);
      }
      if (line.length === 0 || arrayList.length === 0) {
        sum.push(handler(currentData));
        currentData = [];
      }
    }
    return sum;
  },
  sumArray: (array) => { return array.reduce((rest, entry) => rest + entry, 0);},
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
  }
};