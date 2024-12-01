const utils = require('../../utils');
let arrayList = utils.readFile('input2.txt').map(x=>x.split('').map(y=>parseInt(y)));

const flashCell = (row, col, array) => {
    array[row][col] = -1;
    for (let dr = -1 ; dr <= 1 ; dr++) {
        for (let dc = -1 ; dc <= 1 ; dc++) {
            if (dr || dc) {
                const aRow = row + dr;
                const aCol = col + dc;

                if (aRow >= 0 && aRow < array.length &&
                    aCol >= 0 && aCol < array[0].length &&
                    array[aRow][aCol] >= 0) {
                    array[aRow][aCol] += 1;
                }
            }
        }
    }
    return 1;
}

function displayGrid(array, count, flashes) {
    count && console.log({count, flashes});
    array.forEach(row => {
        console.log(row.map(x => (x < 0) ? '-' :  (x > 9) ? '+' : x).join(''));
    })
}
let answer1 = -1, answer2 = -1;

const performSteps = (max, array) => {
    let sumFlashes = 0;
    for (let i = 0 ; i < max ; i++) {
        for (let row = 0 ; row < array.length ; row++) {
            for (let col = 0 ; col < array[0].length ; col++) {
                array[row][col] += 1;
            }
        }
        let oldCount;
        do {
            oldCount = sumFlashes

            for (let row = 0 ; row < array.length ; row++) {
                for (let col = 0 ; col < array[0].length ; col++) {
                    if (array[row][col] > 9) {
                        sumFlashes += flashCell(row, col, array);
                    }
                }
            }
        } while (oldCount !== sumFlashes);

        if (answer2 < 0 && !array.flat().find(x=>x!==-1)) {
            answer2 = i + 1;
            break;
        }
        if (i === 99) {
            answer1 = sumFlashes;
        }
        for (let row = 0 ; row < array.length ; row++) {
            for (let col = 0 ; col < array[0].length ; col++) {
                if (array[row][col] === -1) {
                    array[row][col] = 0;
                }
            }
        }
    }
    return sumFlashes;
}


performSteps(1000, arrayList)

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2
