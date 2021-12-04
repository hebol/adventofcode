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
  sumArray: (array) => { return array.reduce((rest, entry) => rest + parseInt(entry), 0);},
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
            Cookie: "session=53616c7465645f5f0796b1144e30c8e87a016951cc82c96bf7753e6e6a8e2bd75f95c44e30eb78a1ba6f81f420996b51"
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
};
