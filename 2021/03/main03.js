const utils = require('../../utils');

let arrayList = utils.readFile('input.txt')

const getFactors = ((anArray, evenValue) => {
    const countArray = Array(arrayList[0].length).fill(0);
    anArray.forEach(value=>value.split('').forEach((el,index) => countArray[index] += value[index] === '1' ? 1 : -1));

    const gamma   = countArray.map(value => value === 0 ? evenValue : value > 0 ? "1" : "0").join('');
    const epsilon = countArray.map(value => value === 0 ? evenValue : value > 0 ? "0" : "1").join('');
    return {gamma, epsilon};
});

const {gamma, epsilon} = getFactors(arrayList, null);
const answer1 = parseInt(gamma, 2) * parseInt(epsilon, 2);

let tempArray = [...arrayList];
for (let index = 0 ; index < arrayList[0].length ; index++) {
    const target = getFactors(tempArray, "1");
    tempArray = tempArray.filter(entry => entry[index] === target.gamma[index]);
}
let answer21 = tempArray[0];
tempArray = [...arrayList];
for (let index = 0 ; index < arrayList[0].length && tempArray.length > 1 ; index++) {
    const target = getFactors(tempArray, "0");
    tempArray = tempArray.filter(entry => entry[index] === target.epsilon[index]);
}
let answer22 = tempArray[0];
const answer2 = parseInt(answer21, 2) * parseInt(answer22, 2);

console.log({answer1, answer2});
// { answer1: 775304, answer2: 1370737 }
