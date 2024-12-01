const utils = require('../../utils');

function findMatching(line, startIndex) {
  let count = 1;
  for (let i = startIndex; i < line.length; i++) {
    if (line[i] === ']') {
      if (!--count) {
        return i;
      }
    } else {
      if (line[i] === '[') {
        count++;
      }
    }
  }
}

function parseList(line) {
  const result = [];
  let lastStart = 1;
  for (let i = 1; i < line.length; i++) {
    if (line[i] === '[') {
      const end = findMatching(line, i + 1);
      const subline = line.substring(i, end + 1);
      result.push(parseList(subline));
      i = end;
      lastStart = end + 1;
    } else {
      if (line[i] === ',' || line[i] === ']') {
        if (i > lastStart) {
          let substring = line.substring(lastStart, i);
          result.push(parseInt(substring));
        }
        lastStart = i + 1;
      }
    }
  }
  return result;
}

const status = {FAIL:1, OK:0, SUCCESS:-1};

function compare(left, right) {
  if (Array.isArray(left) || Array.isArray(right)) {
    left = Array.isArray(left) ? left : [left];
    right = Array.isArray(right) ? right : [right];
    for (let i = 0; i < left.length; i++) {
      if (right.length - 1 < i) {
        return status.FAIL;
      }
      const part = compare(left[i], right[i]);
      if (part !== status.OK) {
        return part;
      }
    }
    return left.length < right.length ? status.SUCCESS : status.OK;
  } else {
    if (left > right) {
      return status.FAIL;
    }
    if (left < right) {
      return status.SUCCESS;
    }
    return status.OK;
  }
}

//console.log(compare([[[]]],[[]]));

let fileName = 'input2.txt';
const result = utils.processMultiLine((list, index) => {
  const left = parseList(list[0]);
  const right = parseList(list[1]);
  return compare(left, right) === status.SUCCESS ? index + 1 : 0;
},fileName)

const arrayList = [[[2]],[[6]],...utils.readFile(fileName).map(parseList)].sort(compare);

const a2 = arrayList.map((entry, index) => {
  if (compare([[2]], entry) === status.OK || compare([[6]], entry) === status.OK) {
    return index + 1;
  }
  return 0;
}).filter(entry => entry > 0);

let answer1 = utils.sumArray(result), answer2 = a2[0]*a2[1];

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 5506 Answer2: 21756
