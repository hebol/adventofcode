const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

let answer1, answer2;

function toBinary(line) {
    return line.split('').map(c => parseInt(c, 16).toString(2).padStart(4, '0')).join('');
}

const parseLine = bits => {
    let currentIndex = 0;
    const toInt = len => parseInt(sub(len),2);
    const sub = len => {
        const result = bits.substring(currentIndex,currentIndex + len);
        currentIndex += len;
        return result;
    }
    const result  = {version: toInt(3), type: toInt(3), subparts:[]};
    if (result.type === 4) {
        let sum = '';
        let bitPart;
        do {
            bitPart = sub(5);
            sum += bitPart.substring(1);
        } while (bitPart[0] === '1')
        result.literal = parseInt(sum, 2);
    } else {
        const lengthType = toInt(1);
        if (lengthType === 0) {
            let bitLength = toInt(15);
            while (bitLength > 0) {
                const subpart = parseLine(bits.substring(currentIndex));
                currentIndex += subpart.currentIndex;
                bitLength -= subpart.currentIndex;
                result.subparts.push(subpart);
            }
        } else {
            let subpackets = toInt(11);
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
    switch (part.type) {
        case 0:
            return utils.sumArray(part.subparts.map(sumVersions2));
        case 1:
            return part.subparts.reduce((rest,part) => rest * sumVersions2(part), 1);
        case 2:
            return Math.min(...part.subparts.map(sumVersions2));
        case 3:
            return Math.max(...part.subparts.map(sumVersions2));
        case 4:
            return part.literal;
        case 5:
            return sumVersions2(part.subparts[0])  >  sumVersions2(part.subparts[1]) ? 1 : 0;
        case 6:
            return sumVersions2(part.subparts[0])  <  sumVersions2(part.subparts[1]) ? 1 : 0;
        case 7:
            return sumVersions2(part.subparts[0]) === sumVersions2(part.subparts[1]) ? 1 : 0;
    }
}

const result = arrayList.map(toBinary).map(parseLine)
answer1 = utils.sumArray(result.map(sumVersions1));
answer2 = utils.sumArray(result.map(sumVersions2));
console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 879 Answer2: 539051801941
