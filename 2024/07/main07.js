const utils = require('../../utils');

let arrayList = utils.processLine(row => {
  const [p1,p2] = row.split(':').map(s => s.trim());
  return {sum: parseInt(p1), rule: p2.split(' ').map(s => parseInt(s))};
},'input.txt')

let allowPaste = false;
const isSolvable = ({current, sum, rule}) => {
  if (current === undefined) {
    return isSolvable({current: rule[0], sum, rule:rule.slice(1)});
  }
  if (rule.length === 0) {
    return current === sum;
  } else {
    return isSolvable({sum, current: current * rule[0], rule: rule.slice(1)})
        || isSolvable({sum, current: current + rule[0], rule: rule.slice(1)})
        || allowPaste && isSolvable({sum, current: parseInt(current + "" + rule[0]), rule: rule.slice(1)});
  }
};

let answer1 = utils.sumArray(arrayList.filter(isSolvable).map(s => s.sum));
allowPaste = true;
let answer2 = utils.sumArray(arrayList.filter(isSolvable).map(s => s.sum));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 7579994664753 Answer2: 438027111276610
