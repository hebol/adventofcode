const utils = require('../../utils');
let [translator,...image] = utils.readFile('input2.txt');
let answer1, answer2;

function displayImage(title, anImage) {
    title && console.log(title);
    anImage.forEach(line=>console.log(line));
}

function increaseImage(anImage, count, emptyChar) {
    let emptyRow = emptyChar.repeat(anImage[0].length);
    for (let i = 0 ; i < count ; i++) {
        anImage.push(emptyRow);
        anImage.unshift(emptyRow);
        anImage = anImage.map(row=>emptyChar+row+emptyChar);
        emptyRow = emptyChar + emptyRow + emptyChar
    }
    return anImage;
}

function processImage(anImage, emptyChar) {
    const emptyRow = emptyChar.repeat(anImage[0].length);
    const result = new Array(anImage.length);
    result[0] = emptyRow;
    for (let r = 1 ; r < anImage.length - 1 ; r++) {
        let row = emptyChar;
        for (let c = 1 ; c < anImage[0].length - 1 ; c++) {
            const data = anImage[r-1].substring(c-1,c+2) + anImage[r].substring(c-1,c+2)+ anImage[r+1].substring(c-1,c+2);
            const strBin = data.replaceAll('.', '0').replaceAll('#','1');
            row += translator[parseInt(strBin, 2)];
        }
        row += emptyChar;
        result[r] = row;
    }
    result[result.length-1] = emptyRow;
    return result;
}

const translateImage = (anImage, count) => {
    let result = image;
    let emptyChar = '.';
    result = increaseImage(result, 1, emptyChar);

    for (let i = 0 ; i < count ; i++) {
        result = increaseImage(result, 1, emptyChar);
        emptyChar = emptyChar === '.' && translator[0] === '#' ? '#' : '.';
        result = processImage(result, emptyChar)
    }
    return utils.sumArray(result.map(row=>row.split('').filter(c=>c==='#').length))
}

answer1 = translateImage(image, 2);
answer2 = translateImage(image, 50);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 5326  Answer2: 17096
