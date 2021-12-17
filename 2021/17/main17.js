const utils = require('../../utils');
let [,fromX, toX, fromY, toY] = utils.readFile('input.txt')[0]
    .match(/target area: x=(\d+)..(\d+), y=(-\d+)..(-\d+)/).map(x=>parseInt(x))

let answer1, answer2;

const simulateShot = (dx, dy) => {
    let x = 0, y = 0, maxY = 0;
    while (x < toX && y > fromY) {
        x += dx;
        y += dy;
        if (dx > 0) {
            dx -= 1;
        }
        dy -= 1;
        maxY = Math.max(maxY, y);
        if (x >= fromX && x<= toX && y >= fromY && y <= toY) {
            return maxY;
        }
    }
    return undefined;
}

let bestX, bestY, maxY, solutions = [];
for(let x = 0 ; x <= toX ; x++) {
    for(let y = fromY ; y <= 200 ; y++) {
        let resY = simulateShot(x, y);
        resY !== undefined && solutions.push({x, y});
        if (!maxY || maxY < resY) {
            bestX = x;
            bestY = y;
            maxY = resY;
        }
    }
}

answer1 = maxY;
answer2 = solutions.length;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 2278 Answer2: 996
