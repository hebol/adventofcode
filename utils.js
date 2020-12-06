const fs = require('fs');

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
  sumArray: (array) => { return array.reduce((rest, entry) => rest + entry, 0);}
};