const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

let answer1 = -1, answer2 = -1;

const smallCaves = {}
const map = {}

function isLower(node) {
    return !node.split('').find(c=>c>='A'&&c<='Z') && node.length < 3;
}

arrayList.forEach(line => {
    const [from,to] = line.split('-');
    const current = map[from] || {};
    current[to] = from;
    map[from] = current;
    const current2 = map[to] || {};
    current2[from] = to;
    map[to] = current2;
    if (isLower(from)) {
        smallCaves[from] = 0;
    }
    if (isLower(to)) {
        smallCaves[to] = 0;
    }
});

const findCombinations = (from, map, smallVisited, allowTwo) => {
    const combinations = [];
    const mySmallVisited = {...smallVisited};
    if (isLower(from)) {
        mySmallVisited[from] += 1;
    }
    const myAllowTwo = allowTwo && (mySmallVisited[from] <= 1 || !isLower(from));
    const available = Object.keys(map[from]).filter(node=> {
        const count = mySmallVisited[node];
        return (!isLower(node) || count === 0
            || (count === 1 && myAllowTwo === true))
            && node.localeCompare('start') !== 0;
    });
    available.forEach(node => {
        if (node.localeCompare('end') !== 0) {
            const combList = findCombinations(node, map, mySmallVisited, myAllowTwo).map(combo => node + ',' + combo);
            combinations.push.apply(combinations, combList);
        } else {
            combinations.push(node);
        }
    });
    return combinations;
}

answer1 = findCombinations('start', map, smallCaves, false).length;
answer2 = findCombinations('start', map, smallCaves, true).length;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 3485 Answer2: 85062
