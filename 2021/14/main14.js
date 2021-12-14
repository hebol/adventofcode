const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

let answer1 = -1, answer2 = -1;

const start = arrayList[0];
const rules = arrayList.slice(1).reduce((rest,line) => {
    const data = line.match(/([A-Z]+) -> ([A-Z])/);
    rest.push({pair:data[1], c:data[2]});
    return rest;
}, []);

const process = (aStart, max) => {
    let charCount = aStart.split('').reduce((rest,c) => {
        rest[c] = (rest[c] || 0) + 1;
        return rest;
    }, {});
    let combinations = {}
    for (let i = 0 ; i < aStart.length - 1 ; i++) {
        const key = aStart[i]+aStart[i+1];
        combinations[key] = (combinations[key]||0) + 1;
    }

    for (let i = 0 ; i < max ; i++) {
        const additions = rules.map(rule => {
            const count = combinations[rule.pair] || 0;
            if (count > 0) {
                charCount[rule.c] = (charCount[rule.c] || 0) + count;
                return [{pair:rule.pair[0] + rule.c, count}, {pair:rule.c + rule.pair[1], count}]
            } else {
                return [];
            }
        }).flat();
        combinations = {};
        additions.forEach(add=> {
           combinations[add.pair] = (combinations[add.pair] || 0) + add.count;
        });
    }
    return Math.max(...Object.values(charCount)) - Math.min(...Object.values(charCount));
}

answer1 = process(start, 10)
answer2 = process(start, 40)

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2
