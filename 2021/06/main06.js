const utils = require('../../utils');
let dayFishList = utils.readFile('input2.txt')[0].split(',').reduce((rest,day) => {
    rest[day] += 1;
    return rest;
}, Array(9).fill(0))

let answer1, answer2;

function processListForDays(array, days) {
    const anArray = [...array];
    for (let day = 0; day < days; day++) {
        const birthers = anArray.shift();
        anArray[6] += birthers;
        anArray.push(birthers);
    }
    return utils.sumArray(anArray);
}

answer1 = processListForDays(dayFishList, 80);
answer2 = processListForDays(dayFishList, 256);

// Answer1: 366057 Answer2 1653559299811

console.log("Answer1:", answer1, "Answer2", answer2);
