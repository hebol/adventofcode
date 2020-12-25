const utils = require('../utils');

const [cardPub, doorPub] = utils.readFile('test1.txt').map(entry => parseInt(entry));

console.log({cardPub, doorPub});