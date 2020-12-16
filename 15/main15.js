const utils = require('../utils');
let spokenNumbers = 0;
let lastSpoken = {};
let lastNumber;

const speakNumber = num => {
  lastNumber = num;
  spokenNumbers++;
}

const spokenCount = () => spokenNumbers;
const startNumbers = utils.readFile('input.txt').pop().split(',').map(entry => parseInt(entry));

console.log('Start', startNumbers);

startNumbers.forEach(entry => {
  let index = 0;
  speakNumber(entry);
  if (index < startNumbers.length - 1) {
    lastSpoken[entry] = index++;
  }
});

function processNumber() {
  let result;

  if (!lastSpoken.hasOwnProperty(lastNumber)) {
    result = 0;
  } else {
    result = spokenCount() - lastSpoken[lastNumber] - 1;
  }
  lastSpoken[lastNumber] = spokenCount() - 1;
  speakNumber(result);
  spokenCount() === 2020 && console.log('Answer 1', lastNumber);
}

let firstChar = '';

while (spokenCount() < 30000000) {
  if (spokenCount() % 100000 === 0) {
    if (Number(spokenCount()).toString()[0] !== firstChar) {
      firstChar = Number(spokenCount()).toString()[0];
      console.log({spokenCount: spokenCount()});
    }
  }
  processNumber();
}

console.log('Answer 2', lastNumber);


