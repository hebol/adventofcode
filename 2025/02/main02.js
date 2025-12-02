const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')[0].split(',');

arrayList = arrayList.map((item) => {
  const [from,to] = item.split('-').map(Number);
  return { from, to };
});

const calcResult = onlyHalf => {
  return utils.sumArray(arrayList.map((item) => {
    let result = 0;
    for (let index = item.from; index <= item.to; index++) {
      let s = index.toString();
      if (!onlyHalf || s.length % 2 === 0){
        const stepArray  = onlyHalf ? [Math.floor(s.length / 2)] : [1,2,3,4,5];
        const found = stepArray.find(step => {
          if (s.length / step === Math.floor(s.length / step) && s.length !== step) {
            let isIllegalId = true;
            for (let i = 0; i < (s.length / step) - 1 && isIllegalId; i++) {
              if (s.substring(step * i, step * (i+1)) !== s.substring(step * (i+1), step * (i+2))) {
                isIllegalId = false;
              }
            }
            if (isIllegalId) {
              return true;
            }
          }
          return false;
        })
        if (found) {
          result += index;
        }
      }
    }
    return result;
  }));
}


let answer1 = calcResult(true);
let answer2 = calcResult(false);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 31839939622 Answer2: 41662374059
