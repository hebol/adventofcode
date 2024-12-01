const utils = require('../../utils');
let opcodes = utils.readFile('input2.txt')[0].split(',').map(entry => parseInt(entry));

let answer1, answer2;
// Answer1:  Answer2

let doRun = true, do1202Init = true;
let pc = 0;

if (do1202Init) {
  opcodes[1] = 98;
  opcodes[2] = 20;
}

while (doRun) {
  const opcode = opcodes[pc];
  const par1 = opcodes[pc+1];
  const par2 = opcodes[pc+2];
  const par3 = opcodes[pc+3];
  //console.log({opcode, par1, par2, par3, opcodes});
  switch (opcode) {
    case 1:
      opcodes[par3] = opcodes[par1] + opcodes[par2];
      console.log('[' + par3 + '] = ' + opcodes[par1] + '+' + opcodes[par2], {par1, par2})
      break;
    case 2:
      opcodes[par3] = opcodes[par1] * opcodes[par2];
      console.log('[' + par3 + '] = ' + opcodes[par1] + '*' + opcodes[par2], {par1, par2})
      break;
    case 99:
      doRun = false;
      console.log('[Exit!]');
      break;
    default:
      console.log('SNAFU', {opcode, pc});
      break;
  }
  pc += 4;
}

answer1 = opcodes[0];

console.log("Answer1:", answer1, "Answer2", answer2);
