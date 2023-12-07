const utils = require('../../utils');

const types = ["Five of a kind", "Four of a kind", "Full house", "Three of a kind",
  "Two pair", "One pair", "High card"];
const cardOrder = "23456789TJQKA";
const cardOrderJ = "J23456789TQKA";

const analyzeCards = (cards, jSpecial) => {
  const data = {};
  cards.split('').forEach(card => {
    data[card] = data[card] || 0;
    data[card]++;
  });
  let jCount = 0;
  if (jSpecial) {
    jCount = data['J'] || 0;
    data['J'] = 0;
  }
  let values = Object.values(data).sort((a, b) => b - a);
  values[0] += jCount;
  switch (values[0]) {
    case 5:
      return types[0];
    case 4:
      return types[1];
    case 3:
      return values[1] === 2 ? types[2] : types[3];
    case 2:
      return values[1] === 2 ? types[4] : types[5];
    case 1:
      return types[6];
  }
};

const cards = utils.processLine(line => {
  const match = line.match(/(.*) (.*)/);
  const result =  {
    cards: match[1],
    score: parseInt(match[2]),
    type: analyzeCards(match[1], false),
    typeJ: analyzeCards(match[1], true),
  };
  result.typeIndex = types.indexOf(result.type);
  result.typeIndexJ = types.indexOf(result.typeJ);
  return result;
}, 'input.txt');

const sorter = (specialJ) => {
  const aCardOrder = specialJ ? cardOrderJ : cardOrder;
  return (a, b) => {
    const aTypeIndex = specialJ ? a.typeIndexJ : a.typeIndex;
    const bTypeIndex = specialJ ? b.typeIndexJ : b.typeIndex;
    if (aTypeIndex === bTypeIndex) {
      for (let i = 0; i < a.cards.length; i++) {
        if (a.cards[i] !== b.cards[i]) {
          return aCardOrder.indexOf(a.cards[i]) - aCardOrder.indexOf(b.cards[i]);
        }
      }
    } else {
      return bTypeIndex - aTypeIndex;
    }
  }
}

;
let answer1 = utils.sumArray(cards.sort(sorter(false)).map((card, index) => card.score * (index + 1)));
let answer2 = utils.sumArray(cards.sort(sorter(true)).map((card, index) => card.score * (index + 1)));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 250957639 Answer2: 251515496
