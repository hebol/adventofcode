const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

let answer1 = -1, answer2 = -1;

const magnitude = line => {
    let left, right, par = 0;
    for (let i = 0 ; i < line.length ; i++) {
        if (line[i] === '[') {par++;}
        if (line[i] === ']') {par--;}
        if (line[i] === ',' && par === 1) {
            left = line.substring(1, i);
            right = line.substring(i + 1, line.length - 1);
            break;
        }
    }
    if (isNaN(parseInt(left))) {
        left = magnitude(left);
    }
    if (isNaN(parseInt(right))) {
        right = magnitude(right);
    }
    return 3 * left + 2 * right;
}


const add = (rest, data) => {
    return rest.length ? '[' + rest + ',' + data + ']' : data;
}

function findExplodeIndex(line) {
    let par = 0;
    for (let i = 0 ; i < line.length ; i++) {
        if (line[i] === '[') {par++;}
        if (line[i] === ']') {par--;}
        if (par > 4) {
            return i;
        }
    }
}

function addNumberToLeft(num, line) {
    const match = line.match(/(\d+)[^0-9]+$/);
    if (match) {
        const sum = parseInt(match[1]) + num;
        return line.substring(0, match.index) + sum + line.substring(match.index + match[1].length);
    }
    return line;
}

function addNumberToRight(num, line) {
    const match = line.match(/(\d+)/);
    if (match) {
        const sum = parseInt(match[1]) + num;
        return line.substring(0, match.index) + sum + line.substring(match.index + match[1].length);
    }
    return line;
}

function explode(index, line) {
    const match = line.substring(index).match(/\[(\d+),(\d+)]/);
    const [left, right] = match.slice(1).map(x=>parseInt(x));
    return addNumberToLeft(left, line.substring(0, index)) + 0 +
        addNumberToRight(right, line.substring(index+match[0].length));
}

function split(line) {
    const match = line.match(/(\d\d)/);
    if (match) {
        const num = parseInt(match[1]);
        const pair = '[' + Math.floor(num / 2) + ',' + Math.ceil(num / 2) + ']';
        return line.substring(0, match.index) + pair + line.substring(match.index+match[0].length);
    }
}

const processList = array => {
    let result = '';
    array.forEach(line => {
        result = add(result, line);
        let cont = false;
        do {
            let index;
            cont = false;
            while (index = findExplodeIndex(result)) {
                result = explode(index, result);
            }
            let temp = split(result);
            if (temp) {
                result = temp;
                cont = true;
            }
        } while (cont);
    });

    return result;
}

answer1 = magnitude(processList(arrayList));

let max = 0;
arrayList.forEach(line => {
    const val = arrayList.filter(l => l !== line).map(row => magnitude(processList([line, row])));
    max = Math.max(max,...val);
});
answer2 = max;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 3524 Answer2: 4656
