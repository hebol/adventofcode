const utils = require('../../utils');
let arrayList = utils.readFile('input.txt');

const firstIngredientIndex = arrayList.indexOf(arrayList.find(line => line.indexOf('-') < 0));
let rules = arrayList.slice(0, firstIngredientIndex).map(line => {
  const [start, end] = line.split('-').map(Number);
  return {start, end, len: end - start + 1};
});
rules = rules.sort((a, b) => a.start - b.start);

let modified = false;
do {
  modified = false;
  for (let i = 0; i < rules.length - 1; i++) {
    const ruleA = rules[i];
    const ruleB = rules[i + 1];
    if (ruleA.end >= ruleB.start - 1) {
      const newRule = {start: ruleA.start, end: Math.max(ruleA.end, ruleB.end), len: 0};
      newRule.len = newRule.end - newRule.start + 1;
      rules.splice(i, 2, newRule);
      modified = true;
      break;
    }
  }
} while (modified);
const ingredients = arrayList.slice(firstIngredientIndex).map(Number);

let answer1 = utils.sumArray(ingredients.map(ingredient => {
   return rules.find(rule => (ingredient >= rule.start) && (ingredient <= rule.end)) ? 1 : 0;
}));

const answer2 = rules.reduce((sum, rule) => sum + rule.len, 0);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 739 Answer2: 344486348901788
