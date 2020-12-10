const utils = require('../utils');

const code = {
  lines: [],
  visited: {},
  acc : 0,
  ptr: 0,
  reset: () => {
    code.visited = {};
    code.acc = 0;
    code.ptr = 0;
    code.lines = JSON.parse(code.orgLines);
  }
};

utils.processLine(line => {
  const match = line.match(/^([a-z]{3}) ([+\-][0-9]+)$/);
  code.lines.push({op: match[1], arg: parseInt(match[2])});
}, 'input.txt');
code.orgLines = JSON.stringify(code.lines);

console.log('There are', code.lines.length, 'rows');

function runProgram(ignoreNormalExit) {
  let doContinue = true;
  let answer2 = false;
  while (doContinue) {
    switch (code.lines[code.ptr].op) {
      case 'nop':
        code.ptr++;
        break;
      case 'acc':
        code.acc += code.lines[code.ptr].arg;
        code.ptr++;
        break;
      case 'jmp':
        code.ptr += code.lines[code.ptr].arg;
        break;
      default:
        console.log('Would run unknown', code.lines[code.ptr], '@', code.ptr);
        break;
    }
    if (code.visited.hasOwnProperty(code.ptr)) {
      !ignoreNormalExit && console.log('Exited on repeated line', code.ptr + 1, '!')
      doContinue = false;
    } else {
      if (code.ptr === code.lines.length) {
        console.log('Exited on last line', code.ptr + 1, '!')
        doContinue = false;
        answer2 = true;
      }
      code.visited[code.ptr] = true;
    }
  }
  return {ptr: code.ptr + 1, acc: code.acc, answer2}
}

console.log('Acc value when ending', runProgram());


function toggleLine(arr, i) {
  switch (arr[i].op) {
    case 'nop':
      arr[i].op = 'jmp';
      break;
    case 'jmp':
      arr[i].op = 'nop';
      break;
  }
}


for (let i = 0 ; i < code.lines.length ; i++) {
  code.reset();
  toggleLine(code.lines, i);
  const result = runProgram(true);
  if (result.answer2) {
    console.log('Switch line', i + 1, 'to', code.lines[i], 'acc', code.acc);
    break;
  }
}