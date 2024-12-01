const utils = require('../../utils');
let array = utils.readFile('input2.txt')[0].split(',').map(x=>parseInt(x));
const posMap = array.reduce((rest,val) => {
    let count = rest[val] || 0;
    rest[val] = ++count;
    return rest;
}, {})


const getFuelNeeded = (target, map, summer) => {
    return Object.keys(map).reduce((rest, key) => {
        return rest + summer(target, key) * map[key];
    }, 0);
}

const caluculateCost = (summer) => {
    let max = Math.max(...array);
    let min = Math.min(...array);

    return Math.min(...Array(max-min).fill().map((x,i)=>i+min).map(val => {
        return getFuelNeeded(val, posMap, summer);
    }));
}

let answer1, answer2;
// Answer1: 336131 Answer2 92676646

answer1 = caluculateCost((from, to) => Math.abs(from-to));
answer2 = caluculateCost((from, to) => Math.abs(from-to) * (Math.abs(from-to) + 1) / 2);

console.log("Answer1:", answer1, "Answer2", answer2);
