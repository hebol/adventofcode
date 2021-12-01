const utils = require('../utils');

function processData(data, advanced) {
  //console.log('called', {data});
  let result = 0, operator, notReady = true, oldValue;

  function applyAnyOperator(value) {
    if (operator) {
      result = operator === '+' ? result + value : result * value;
    } else {
      result = value;
    }
    //console.log('apply', {value, operator, result})
    operator = undefined;
  }

  while (notReady && data.length > 0) {
    const char = data[0];
    data = data.substring(1);
    switch (char) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        applyAnyOperator(parseInt(char));
        break;
      case '*':
        operator = char;
        if (advanced) {
          if (oldValue !== undefined) {
            applyAnyOperator(parseInt(oldValue))
          }
          oldValue = result;
          result = 0;
          operator = undefined;
        }
        break;
      case '+':
        operator = char;
        break;
      case ')':
        notReady = false;
        break;
      case '(':
        const [partResult, restData] = processData(data, advanced);
        applyAnyOperator(partResult);
        data = restData;
        break;
      default:
        console.log( '==> UNKNOWN!!', char)
        break;
    }
    //console.log('Processing', {char, data, oldValue, operator, result})
  }

  if (oldValue) {
    result *= oldValue;
  }
  //console.log('returned', {result, data});

  return [result, data];
}

const answer1 = utils.processLine(line => {
  return processData(line.replaceAll(' ', ''), false)[0];
}, 'input.txt').reduce((rest, part) => rest + part, 0);

const answer2 = utils.processLine(line => {
  return processData(line.replaceAll(' ', ''), true)[0];
}, 'input.txt').reduce((rest, part) => rest + part, 0);

//{ answer1: 23507031841020, answer2: 218621700997826 }
console.log({answer1, answer2});

