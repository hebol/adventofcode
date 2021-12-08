const utils = require('../../utils');
const arrayList = utils.readFile('input.txt');

let answer1 = 0, answer2;

const charMap =[
  {segments: "abcefg"},
  {segments: "cf"},
  {segments: "acdeg"},
  {segments: "acdfg"},
  {segments: "bcdf"},
  {segments: "abdfg"},
  {segments: "abdefg"},
  {segments: "acf"},
  {segments: "abcdefg"},
  {segments: "abcdfg"},
]
charMap.forEach((x,index) => x.index = index);

const commonParts = (part1, part2) => {
  return part1.split('').filter(x=>part2.indexOf(x) >= 0).length;
}

const decodeLine = line => {
  const [inputParts, outputParts] = line.split('|').map(x=>x.trim()).map(part=>part.split(' ').map(x=>x.split('').sort().join('')));
  const localMap = JSON.parse(JSON.stringify(charMap));
  localMap[1].solution = inputParts.find(x=>x.length === charMap[1].segments.length);
  localMap[4].solution = inputParts.find(x=>x.length === charMap[4].segments.length);
  localMap[7].solution = inputParts.find(x=>x.length === charMap[7].segments.length);
  localMap[8].solution = inputParts.find(x=>x.length === charMap[8].segments.length);
  answer1 += outputParts.filter(x => localMap.find((y => y.solution && y.solution.localeCompare(x) === 0))).length;

  localMap[6].solution = inputParts.find(x=>(x.length === 6) && commonParts(x, localMap[1].solution) === 1);
  localMap[9].solution = inputParts.find(x=>(x.length === 6) && commonParts(x, localMap[4].solution) === 4);
  localMap[0].solution = inputParts.find(x=>(x.length === 6) && commonParts(x, localMap[9].solution) === 5 && commonParts(x, localMap[1].solution) === 2);
  localMap[5].solution = inputParts.find(x=>(x.length === 5) && commonParts(x, localMap[6].solution) === 5);

  const notSolved = inputParts.filter(x=>!localMap.find(y=>y.solution && y.solution.localeCompare(x) === 0));

  localMap[3].solution = notSolved.find(x=>commonParts(x, localMap[9].solution) === 5);
  localMap[2].solution = notSolved.find(x=>commonParts(x, localMap[3].solution) === 4);

  return outputParts.map(x => localMap.find(y => y.solution.localeCompare(x) === 0).index).join('');
}

answer2 = utils.sumArray(arrayList.map(line=>decodeLine(line)));

console.log("Answer1:", answer1, "Answer2", answer2);
//Answer1: 530 Answer2 1051087
