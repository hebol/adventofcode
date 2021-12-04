const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

const playOrder = arrayList[0].split(",");
const boardCount = (arrayList.length - 1) / 5

const boards = Array(boardCount);

for(let index = 0 ; index < boardCount ; index++) {
    const self = {
        selected: Array(5).fill(0),
        rows: arrayList.slice(index * 5 + 1, (index + 1) * 5 + 1).map(utils.splitNumberRow),
        notSelected: () => self.rows.map((row,rowIndex) => {
            return row.map((value, index) => (self.selected[rowIndex] & (2 ** index) ? 0 : parseInt(value)));
        }).filter(value=>value).flat()
    }
    boards[index] = self;
}

let answer1, answer2;
// Answer1: 45031 Answer2 2568

const markNumInBoard = (num, board) => {
    board.rows.forEach((row,rowNum) => {
        const foundIndex = row.indexOf(num);
        if (foundIndex >= 0) {
            board.selected[rowNum] |= 2 ** foundIndex;
        }
    });
}

function calculateScoreForBoard(board, num) {
    return utils.sumArray(board.notSelected()) * num;
}

const isBoardReady = (board) => {
    const andSum = board.selected.reduce((rest, status) => rest & status, 31);
    return andSum || board.selected.indexOf(31) >= 0;
};

while (playOrder.length > 0) {
    const num = parseInt(playOrder.shift());
    boards.forEach(board => {
        if (!board.result) {
            markNumInBoard(num, board);
            if (isBoardReady(board)) {
                board.result = calculateScoreForBoard(board, num);
                answer1 = answer1 ? answer1 : board.result;
                answer2 = board.result;
            }
        }
    })
}

console.log("Answer1:", answer1, "Answer2", answer2);