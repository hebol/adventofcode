const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

let answer1, answer2;

function toBinary(line) {
    return line.split('').map(c => parseInt(c, 16).toString(2).padStart(4, '0')).join('');
}

const parseLine = bits => {
    const version = parseInt(bits.substring(0,3),2);
    const type = parseInt(bits.substring(3,6),2);
    const result = {version, type, subparts:new Array(0)};
    let currentIndex = 6;
    if (type === 4) {
        let sum = '';
        let bitPart;
        do {
            bitPart = bits.substring(currentIndex, currentIndex + 5);
            currentIndex += 5;
            sum += bitPart.substring(1);
        } while (bitPart[0] === '1')
        result.literal = parseInt(sum, 2);
    } else {
        const lengthType = bits[currentIndex];
        currentIndex += 1;
        if (lengthType === '0') {
            let bitLength = parseInt(bits.substring(currentIndex, currentIndex + 15), 2);
            currentIndex += 15;
            while (bitLength > 0) {
                const subpart = parseLine(bits.substring(currentIndex));
                currentIndex += subpart.currentIndex;
                bitLength -= subpart.currentIndex;
                result.subparts.push(subpart);
            }
        } else {
            let subpackets = parseInt(bits.substring(currentIndex, currentIndex + 11), 2);
            currentIndex += 11;
            while (subpackets > 0) {
                const subpart = parseLine(bits.substring(currentIndex));
                currentIndex += subpart.currentIndex;
                subpackets--;
                result.subparts.push(subpart);
            }
        }
    }
    result.currentIndex = currentIndex;

    return result;
}

function sumVersions1(part) {
    return part.version + utils.sumArray(part.subparts.map(sumVersions1));
}

function sumVersions2(part) {
    let result = 0;
    switch (part.type) {
        case 0:
            result = utils.sumArray(part.subparts.map(sumVersions2));
            break;
        case 1:
            result = part.subparts.reduce((rest,part) => rest * sumVersions2(part), 1);
            break;
        case 2:
            result = Math.min(...part.subparts.map(sumVersions2));
            break;
        case 3:
            result = Math.max(...part.subparts.map(sumVersions2));
            break;
        case 4:
            result = part.literal;
            break;
        case 5:
            result = sumVersions2(part.subparts[0]) > sumVersions2(part.subparts[1]) ? 1 : 0;
            break;
        case 6:
            result = sumVersions2(part.subparts[0]) < sumVersions2(part.subparts[1]) ? 1 : 0;
            break;
        case 7:
            result = sumVersions2(part.subparts[0]) === sumVersions2(part.subparts[1]) ? 1 : 0;
            break;
    }
    return result;
}

const result = arrayList.map(toBinary).map(parseLine)
answer1 = utils.sumArray(result.map(sumVersions1));
answer2 = utils.sumArray(result.map(sumVersions2));
console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 879 Answer2: 539051801941
