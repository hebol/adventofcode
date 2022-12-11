const utils = require('../../utils');

const monkeys = [];
utils.processMultiLine(lines => {
  const items = lines[1].split(':')[1].split(',').map(item => parseInt(item.trim()));
  const operation = lines[2].substring(19);
  const test = parseInt(lines[3].substring(20));
  const isTrue = parseInt(lines[4].substring(28));
  const isFalse = parseInt(lines[5].substring(29));
  monkeys.push({items, operation, test, isTrue, isFalse, inspectCount:0, orgItems: items.slice()});
},'input.txt')

const base = monkeys.reduce((prev, monkey) => prev * monkey.test, 1);

function calculate(item, operation, useDivisor) {
  let [old, oper, value] = operation.split(' ');
  if (value === 'old') {
    value = item;
  } else {
    value = parseInt(value);
  }
  const newValue = (oper === '+') ? item + value : item * value;
  return useDivisor ? Math.floor(newValue / 3) : (newValue % base);
}

const checkWorry = (roundsMax, useDivisor) => {
  monkeys.forEach(monkey => {
    monkey.inspectCount = 0;
    monkey.items = monkey.orgItems.slice();
  });
  for (let rounds = 0; rounds < roundsMax; rounds++) {
    for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
      const monkey = monkeys[monkeyIndex];
      while (monkey.items.length > 0) {
        const item = monkey.items.shift();
        monkey.inspectCount++;
        const newValue = calculate(item, monkey.operation, useDivisor);
        let test = (newValue % monkey.test) === 0;
        monkeys[test ? monkey.isTrue: monkey.isFalse].items.push(newValue);
      }
    }
  }
  let data = monkeys.map(monkey => monkey.inspectCount).sort((a, b)=>b-a);
  return data[0] * data[1]
}

let answer1 = checkWorry(20, true), answer2 = checkWorry(10000, false);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 99840 Answer2: 20683044837
