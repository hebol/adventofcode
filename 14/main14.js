const utils = require('../utils');

let memory = {}
let andMask;
let orMask;
let xMask;
let xCount;

function doAnd(value1, value2) {
  let andHigh = Math.floor(value1 / 64) & Math.floor(value2 / 64);
  let andLow = (value1 % 64) & (value2 % 64);
  return andHigh * 64 + andLow;
}

function doOr(value1, value2) {
  let orHigh = Math.floor(value1 / 64) | Math.floor(value2 / 64);
  let orLow = (value1 % 64) | (value2 % 64);
  return orHigh * 64 + orLow;
}

function processValues(value) {
  return doOr(doAnd(value, andMask), orMask);
}

utils.processLine( line => {
  const maskMatch = line.match(/mask = ([X10]{36})/)
  if (maskMatch) {
    andMask = parseInt(maskMatch[1].replaceAll('X', 1), 2);
    orMask = parseInt(maskMatch[1].replaceAll('X', 0), 2);
  } else {
    const memMatch = line.match(/mem\[(\d+)] = (\d+)/)
    memory[parseInt(memMatch[1])] = processValues(parseInt(memMatch[2]));
  }
}, 'input.txt');

//17934269678453
console.log('Answer 1', Object.values(memory).reduce((rest, val) => rest + parseInt(val)));

memory = {};

utils.processLine( line => {
  const maskMatch = line.match(/mask = ([X10]{36})/)
  if (maskMatch) {
    xCount = maskMatch[1].match(/X/g).length;
    const mask1 = maskMatch[1].replaceAll(/[X1]/g, 'z');
    const mask2 = mask1.replaceAll('0', 1);
    const mask3 = mask2.replaceAll('z', 0);
    andMask = parseInt(mask3, 2);
    xMask = maskMatch[1].replaceAll(/[1]/g, 0)
    orMask = parseInt(maskMatch[1].replaceAll('X', 0), 2);
    //console.log({mask0: maskMatch[1], mask1, mask2,mask3, xMask, orMask, xCount});
  } else {
    const memMatch = line.match(/mem\[(\d+)] = (\d+)/);
    const addr = memMatch[1];

    for (let i = 0 ; i < 2 ** xCount ; i++) {
      let floatValue = Number(i).toString(2).padStart(xCount, '0');
      let tempAddr = doAnd(addr, andMask);
      tempAddr = Number(doOr(tempAddr, orMask)).toString(2).padStart(36, '0');

      for (let k = 0, j = 0 ; k < xMask.length ; k++) {
        if (xMask[k] === 'X') {
          tempAddr = tempAddr.substring(0, k) + floatValue[j++] + tempAddr.substring(k + 1);
        }
      }
      let decodedAddress = parseInt(tempAddr, 2);
      let value = parseInt(memMatch[2]);
      //console.log('Setting', decodedAddress, 'to', value);
      memory[decodedAddress] = value;
    }
  }
}, 'input.txt');

console.log('Answer 2', Object.values(memory).reduce((rest, val) => rest + parseInt(val)));
