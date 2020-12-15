const utils = require('../utils');
let spokenNumbers = [];
let lastSpoken = {};

const speakNumber = num => {
  spokenNumbers.push(num);
}

const spokenCount = () => spokenNumbers.length;
const lastNumber = () => spokenNumbers[spokenNumbers.length - 1];
const startNumbers = utils.readFile('input.txt').pop().split(',').map(entry => parseInt(entry));

console.log('Start', startNumbers);

var index = 0;
startNumbers.forEach(entry => {
  speakNumber(entry);
  if (index < startNumbers.length - 1) {
    lastSpoken[entry] = index++;
  }
});

function processNumber() {
  let last = lastNumber();
  let result;

  if (!lastSpoken.hasOwnProperty(last)) {
    result = 0;
  } else {
    result = spokenCount() - lastSpoken[last] - 1;
  }
  lastSpoken[last] = spokenCount() - 1;
  speakNumber(result);
  spokenCount() === 2020 && console.log('Answer 1', spokenNumbers[2019]);
}

while (spokenCount() < 30000000) {
  processNumber();
}

console.log('Answer 2', spokenNumbers[30000000 - 1]);
