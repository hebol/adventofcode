const utils = require('../utils');

const [departure, times] = utils.readFile('input.txt');

const timeList = times.split(',').map(entry => parseInt(entry));

const departures = timeList.map(entry => entry - (departure % entry));

console.log('Data', departure, timeList, departures);

const min = Math.min(...departures.filter(entry => !isNaN(entry)));
const index = departures.indexOf(min);

console.log('Answer1', min * timeList[index]);

const max = Math.max(...timeList.filter(entry => !isNaN(entry)));

const dataList = timeList.map(entry => {
  if (!isNaN(entry)) {
    return {
      delay: timeList.indexOf(entry),
      interval: entry
    }
  }
}).filter(entry=>entry);

console.log({max, dataList});

const isSolution = timestamp => {
  return dataList.filter( entry => {
    return (timestamp + entry.delay) % entry.interval === 0;
  }).length === dataList.length
}

let current = 0;
let periodicitet = 1;

dataList.forEach(entry => {
  console.log('Adderar', entry, {current, periodicitet});
  while ((current + entry.delay) % entry.interval !== 0) {
    current += periodicitet;
  }
  periodicitet *= entry.interval;
})
console.log('Hittade', current, '=>', isSolution(current));
