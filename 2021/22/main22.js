const utils = require('../../utils');
let cubeData = utils.processLine(line=>{
    const data = line.match(/([^ ]+) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/);
    let [fromX, toX, fromY, toY, fromZ, toZ] = data.slice(2).map(Number);
    return { op: data[1],fromX, toX, fromY, toY, fromZ, toZ};
}, 'input2.txt').reverse();

let answer1, answer2 = -1;

function isOn(aCube, x, y, z) {
    const data = aCube.find(pos => {
        return x >= pos.fromX && x <= pos.toX  && y >= pos.fromY && y <= pos.toY && z >= pos.fromZ && z <= pos.toZ
    });
    return data && data.op === 'on';
}

const countOn = aCube => {
    let result = 0;
    for (let x=-50 ; x<=50 ; x++) {
        for (let y=-50 ; y<=50 ; y++) {
            for (let z=-50 ; z<=50 ; z++) {
                if (isOn(aCube, x, y, z)) {
                    result += 1;
                }
            }
        }
    }
    return result;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

let xPosList = cubeData.map(cube=>[cube.fromX, cube.toX, cube.toX + 1]).flat().filter(onlyUnique).sort((a,b)=>a-b);
let yPosList = cubeData.map(cube=>[cube.fromY, cube.toY, cube.toY + 1]).flat().filter(onlyUnique).sort((a,b)=>a-b);
let zPosList = cubeData.map(cube=>[cube.fromZ, cube.toZ, cube.toZ + 1]).flat().filter(onlyUnique).sort((a,b)=>a-b);

answer2 = 0;

for (let xi = 0 ; xi < xPosList.length - 1 ; xi++) {
    (xi%20 === 0) && console.log('Looking at', xPosList[xi], 'to', xPosList[xi+1], '(', Math.round(xi / xPosList.length * 100), '%)');
    for (let yi = 0 ; yi < yPosList.length - 1 ; yi++) {
        for (let zi = 0 ; zi < zPosList.length - 1 ; zi++) {
            if (isOn(cubeData, xPosList[xi], yPosList[yi], zPosList[zi])) {
                const xLen = xPosList[xi + 1] - xPosList[xi];
                const yLen = yPosList[yi + 1] - yPosList[yi];
                const zLen = zPosList[zi + 1] - zPosList[zi];
                answer2 += xLen * yLen * zLen;
            }
        }
    }
}

answer1 = countOn(cubeData);
console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 610196 Answer2: 1282401587270826
