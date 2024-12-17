const utils = require('../../utils');
let [a, b, c, program] = utils.readFile('input.txt').map(line => line.split(':')[1].trim());
program = program.split(',').map(BigInt);
[a,b,c] = [a,b,c].map(BigInt);

const processProgram = ({a, b, c},program) => {
  const output = [];
  //const log = () => {}
  const log = console.log
  for (let i = 0; i < program.length; i += 2) {
    const instr = program[i];
    const literalOp = program[i + 1];
    const getOpValue = () => literalOp < 4n ? literalOp : [a,b,c][literalOp - 4n];
    const ops = [
      () => a = a>>getOpValue(),
      () => b = b^literalOp,
      () => b = getOpValue() % 8n,
      () => {if (a != 0n) {i = Number(literalOp) - 2}},
      () => b = b^c,
      () => output.push(getOpValue() % 8n),
      () => b = a>>getOpValue(),
      () => c = a>>getOpValue(),
    ][instr]();
  }
  return output;
};

let answer1 = processProgram({a,b,c},program).join(',');

function recreateA(program) { //needs the sim_computer function from above
  let isValid = {};
  let minValid = 8n**17n;
  let checkSolution = (depth,score) => {
    if (depth === program.length) {
      isValid[score] = true;
      if (score < minValid) {
        minValid = score;
      }
      return;
    }

    for (let i= 0 ; i < 8 ; i++) {
      let testA = BigInt(i) + 8n * score;
      if (processProgram({a: testA, b:0, c:0}, program)[0] == program[15 - depth]) {
        checkSolution(depth + 1, testA);
      }
    }
  }
  checkSolution(0,0n);
  return minValid;
}

let answer2 = Number(recreateA(program));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: "2,1,4,7,6,0,3,1,4" Answer2: 266932601404433
