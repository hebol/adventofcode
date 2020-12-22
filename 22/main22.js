const utils = require('../utils');

const hands = utils.processMultiLine(lines => {
  return {
    name: lines.shift(),
    cards: lines.map(entry => parseInt(entry))
  };
}, 'input.txt')
console.log(hands);

while (hands[0].cards.length > 0 && hands[1].cards.length > 0) {
  const card1 = hands[0].cards.shift();
  const card2 = hands[1].cards.shift();
  if (card1 > card2) {
    hands[0].cards = hands[0].cards.concat([card1, card2])
  } else {
    hands[1].cards = hands[1].cards.concat([card2, card1])
  }
}
const winner = hands[0].cards.length > 0 ? hands[0] : hands[1];
let index = 0;
const answer1 = winner.cards.reverse().reduce((rest, part) => rest + part * ++index, 0);
console.log({answer1});