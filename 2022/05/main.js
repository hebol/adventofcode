const utils = require('../../utils');
let arrayList = utils.readFileNoFilter('input.txt')
let answer1 = -1, answer2 = -1;

const breakLine = arrayList.indexOf('');
const colCount = Math.ceil(arrayList[breakLine - 1].length / 4);
const orgStacks = new Array(colCount).fill(0).map(() => []);

for (let i = breakLine - 2 ; i >= 0; i--) {
  const line = arrayList[i];
  for (let col = 0 ; col <colCount ; col++) {
    const char = line[col * 4 + 1];
    if (char && char !== ' ') {
      orgStacks[col].push(char);
    }
  }
}

function calculateMoves(inputStacks, reverse) {
  const stacks = JSON.parse(JSON.stringify(inputStacks));
  for (let i = breakLine + 1; i < arrayList.length; i++) {
    if (arrayList[i].length) {
      const [ign1, count, ign2, from, ign3, to] = arrayList[i].split(' ');
      const toMove = stacks[from - 1].splice(stacks[from - 1].length - count);
      reverse && toMove.reverse();
      stacks[to - 1].push(...toMove);
    }
  }
  return stacks.map(stack => stack.pop()).join('');
}

answer1 = calculateMoves(orgStacks, true);
answer2 = calculateMoves(orgStacks, false);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: QMBMJDFTD Answer2: NBTVTJNFJ
