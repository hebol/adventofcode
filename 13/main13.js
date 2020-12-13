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

//console.log(isSolution(1068781))

console.log(dataList.map(entry => {
  return '(t + ' + entry.delay + ') mod ' + entry.interval + ' = 0';
}).join(','))

// Thank you wolfram!
// https://www.wolframalpha.com/input/?i=%28t+%2B+0%29+mod+17+%3D+0%2C%28t+%2B+7%29+mod+41+%3D+0%2C%28t+%2B+11%29+mod+37+%3D+0%2C%28t+%2B+17%29+mod+367+%3D+0%2C%28t+%2B+36%29+mod+19+%3D+0%2C%28t+%2B+40%29+mod+23+%3D+0%2C%28t+%2B+46%29+mod+29+%3D+0%2C%28t+%2B+48%29+mod+613+%3D+0%2C%28t+%2B+61%29+mod+13+%3D+0
console.log(isSolution(247086664214628))
let current = 0;

// Only handles simple case with few parameters
while (false) {
  if (isSolution(current)) {
    console.log('Solution found', current);
    break;
  } else {
    current += dataList[0].interval
  }
}

/*
// 7,13,x,x,59,x,31,19
t = x1 * 7
t = x2 * 13 - 1
t = x3 * 59 - 5
t = x4 * 31 - 7
t = x5 * 19 - 8


The earliest timestamp that matches the list
17,x,13,19 => 3417 => 3 × 17 × 67
67,7,59,61 => 754018 => 2 × 17 × 67 × 331
67,x,7,59,61 => 779210 => 2 × 5 × 67 × 1163
67,7,x,59,61 => 1261476 => 2 × 2 × 3 × 3 × 67 × 523
1789,37,47,1889 => 1202161486 => 2 × 79 × 1789 × 4253


*/