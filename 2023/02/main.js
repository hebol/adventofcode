const utils = require('../../utils');
let arrayList = utils.readFile('input.txt')

const max = {red: 12, green: 13, blue: 14};
const getColorAndCount = s => {
    const match2 = s.match(/(\d+) (.+)/);
    return {color: match2[2], count: parseInt(match2[1])};
}
const parseIt = row => {
  const match = row.match(/Game (\d+): (.*)/);
  const id = match[1];
  const sets = match[2].split(';').map(s=>s.split(', ')).map(s => s.map(getColorAndCount));
  return {id, sets};
}

let parsedData = arrayList.map(parseIt);

const onlyValid = (max) => {
  return row => {
    return row.sets.filter(aSet => {
      let result = aSet.filter(({color, count}) => {
        let isNotOk = count > max[color];
        //console.log({color, count, isNotOk: isNotOk, max})
        return isNotOk;
      }).length;
      if (result > 0) {
        //console.log('Not ok', {aSet, result, max});
      }
      return result > 0;
    }).length === 0;
  };
};

let answer1 = utils.sumArray(parsedData.filter(onlyValid(max)).map(obj=> {
  console.log('Is valid', obj.id);
  return obj.id
}).map(obj => parseInt(obj)));

const getMax = row => {
  return row.sets.reduce((acc, aList) => {
    aList.forEach(({color, count}) => {
      acc[color] = Math.max(acc[color], count);
    });
    return acc;
  }, {red: 0, green: 0, blue: 0});
}

const toPower = ({red, green, blue}) => red*green*blue
let maxData = parsedData.map(getMax);
let answer2 = utils.sumArray(maxData.map(toPower).map(obj => parseInt(obj)));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2:
