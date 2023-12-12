const utils = require('../../utils');

const countOptions = utils.cacheFunction((line, numArray) => {
  if (line.length === 0) {
    return numArray.length ? 0 : 1;
  }
  if (numArray.length === 0) {
    return line.indexOf('#') === -1 ? 1 : 0;
  }
  if (line.length < utils.sumArray(numArray) + numArray.length - 1) {
    return 0;
  }

  if (line[0] === ".") {
    return countOptions(line.slice(1), numArray);
  }
  if (line[0] === "#") {
    const [run, ...leftoverRuns] = numArray;
    for (let i = 0; i < run; i++) {
      if (line[i] === ".") {
        return 0;
      }
    }
    if (line[run] === "#") {
      return 0;
    }
    return countOptions(line.slice(run + 1), leftoverRuns);
  }

  return countOptions("#" + line.slice(1), numArray) + countOptions("." + line.slice(1), numArray);
});

const solveLine = (repeat) => {
  return (line) =>   {
    const [str, numberString] = line.split(" ");
    const numArray = numberString.split(",").map(Number);

    let strExpanded = str;
    let numsExpanded = numArray;
    if (repeat) {
      strExpanded = [str, str, str, str, str].join("?");
      numsExpanded = [...numArray, ...numArray, ...numArray, ...numArray, ...numArray];
    }

    return countOptions(strExpanded, numsExpanded);
  }
}

const arrayLines = utils.readFile("input.txt");

let answer1 = utils.sumArray(arrayLines.map(solveLine(false)));
let answer2 = utils.sumArray(arrayLines.map(solveLine(true)));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 6488 Answer2: 815364548481
