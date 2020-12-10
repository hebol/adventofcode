const utils = require('../utils');

utils.processLine(line => {
  lines.push(parseInt(line));
}, 'test1.txt');

