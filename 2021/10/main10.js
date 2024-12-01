const utils = require('../../utils');
let arrayList = utils.readFile('input2.txt')

let answer1, answer2;

function removePairs(line) {
    const pairs = ['()', '[]', '{}', '<>'];
    let oldLen = -1;
    let rest = line;
    while (oldLen !== rest.length) {
        oldLen = rest.length;
        pairs.forEach(aPair => {
            rest = rest.replaceAll(aPair, '');
        })
    }
    return rest;
}

const getCorruptScoreForLine = line => {
    const points = {')': 3,']': 57,'}': 1197,'>': 25137};
    const c = removePairs(line).split('').find(c=>points[c]);
    return c ? points[c] : 0;
}

answer1 = utils.sumArray(arrayList.map(getCorruptScoreForLine));
const array2 = arrayList.filter(x=>!getCorruptScoreForLine(x)).map(removePairs);

function calculateScore2(line) {
    const points = {'(': 1,'[': 2,'{': 3,'<': 4};

    return line.split('').reverse().reduce((rest,c)=>{
        return rest * 5 + points[c];
    }, 0);
}

answer2 = array2.map(calculateScore2).sort((a,b)=>a-b)[(array2.length - 1) / 2];
console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 278475 Answer2: 3015539998
