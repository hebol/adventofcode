const utils = require('../utils');

let handsRaw = utils.processMultiLine(lines => {
  return {
    name: lines.shift(),
    cards: lines.map(entry => parseInt(entry))
  };
}, 'input.txt');

function playGame(hands, isRecursive) {
  const priorStates = {};
  let stateCount = 0;
  let winner;

  while (hands[0].cards.length > 0 && hands[1].cards.length > 0) {
    const state = JSON.stringify(hands);
    if (priorStates.hasOwnProperty(state)) {
      winner = hands[0];
      break;
    } else {
      priorStates[state] = 1;
      stateCount++;
    }
    const card1 = hands[0].cards.shift();
    const card2 = hands[1].cards.shift();
    let winnerIs1;
    if (isRecursive && card1 <= hands[0].cards.length && card2 <= hands[1].cards.length) {
      let recursiveHands = JSON.parse(JSON.stringify(hands));
      recursiveHands[0].cards = recursiveHands[0].cards.slice(0, card1)
      recursiveHands[1].cards = recursiveHands[1].cards.slice(0, card2)
      const aWinner = playGame(recursiveHands, isRecursive);
      winnerIs1 = aWinner.name === hands[0].name;
    } else {
      winnerIs1 = card1 > card2;
    }
    if (winnerIs1) {
      hands[0].cards = hands[0].cards.concat([card1, card2])
    } else {
      hands[1].cards = hands[1].cards.concat([card2, card1])
    }
  }
  winner = winner || hands[0].cards.length > 0 ? hands[0] : hands[1];
  return winner;
}

function calculateScore(winner) {
  let index = 0;
  return winner.cards.reverse().reduce((rest, part) => rest + part * ++index, 0);
}

const answer1 = calculateScore(playGame(JSON.parse(JSON.stringify(handsRaw))));
const answer2 = calculateScore(playGame(handsRaw, true, 0));
console.log({answer1, answer2});