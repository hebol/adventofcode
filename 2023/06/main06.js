const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

const times = arrayList[0].match(/Time:(.*)/)[1].trim().split(/\s+/).map(Number);
const distance = arrayList[1].match(/Distance:(.*)/)[1].trim().split(/\s+/).map(Number);

const runs = []
for (let i = 0; i < times.length; i++) {
  runs.push({time: times[i], distance: distance[i]});
}

const results = runs.map(run => calculateRun(run.time, run.distance));

const time2 = parseInt(arrayList[0].match(/Time:(.*)/)[1].trim().replaceAll(' ', ''));
const distance2 = parseInt(arrayList[1].match(/Distance:(.*)/)[1].trim().replaceAll(' ', ''));

function calculateRun(maxTime, winnerDistance) {
  let result = 0;
  for (let i = 1; i < maxTime - 1; i++) {
    if ((maxTime - i) * i > winnerDistance) {
      result++
    }
  }
  return result;
}

let answer1 = utils.multiplyArray(results);
let answer2 = calculateRun(time2, distance2);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 3317888 Answer2: 24655068
