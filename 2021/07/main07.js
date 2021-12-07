const utils = require('../../utils');
let array = utils.readFile('input.txt')[0].split(',').map(x=>parseInt(x));
const posMap = array.reduce((rest,val) => {
    let count = rest[val] || 0;
    rest[val] = ++count;
    return rest;
}, {})


let answer1, answer2;
// Answer1:  Answer2

const stepCounter1 = (target, from) => {
    return Math.abs(target-from);
}

const stepCounter2 = (target, from) => {
    const part = Math.abs(target-from);
    return part * (part + 1) / 2;
}

const getStepsNeeded = (target, map, aFun) => {
    result = Object.keys(map).reduce((rest, key) => {
        return rest + aFun(target, key) * map[key];
    }, 0);
    return result;
}

const caluculateCost = (summer) => {
    let bestSum, bestIndex;
    let max = Math.max(...array);
    let min = Math.min(...array);

    for (let index = min; index <= max; index++) {
        const aSum = getStepsNeeded(index, posMap, summer);
        if (!bestSum || aSum < bestSum) {
            bestSum = aSum;
            bestIndex = index;
        }
    }
    return bestSum;
}

answer1 = caluculateCost(stepCounter1);
answer2 = caluculateCost(stepCounter2);

console.log("Answer1:", answer1, "Answer2", answer2);