const utils = require('../../utils');
const {sumArray} = require("../../utils");
let arrayList = utils.readFile('input.txt')[0].split(',');

const doHash = (item) => {
  return item.split('').reduce((acc, c) => {
    acc += c.charCodeAt(0);
    acc *= 17;
    acc %= 256;
    return acc;
  }, 0);
};

let answer1 = sumArray(arrayList.map(doHash));

const slots = new Array(256).fill(0).map(() => []);
arrayList.forEach(part => {
  if (part.endsWith('-')){
    const label = part.slice(0, -1);
    const slot = doHash(label);
    //console.log('remove', {label, slot})
    slots[slot] = slots[slot].filter(item => item.label !== label);
  } else {
    const item = {
      label: part.substring(0, part.length - 2),
      focal: parseInt(part[part.length - 1])
    };
    const slot = doHash(item.label);
    const found = slots[slot].find(i => i.label === item.label);
    if (found) {
      //console.log('replace', {found, item, slot})
      found.focal = item.focal;
    } else {
      //console.log('add', {item, slot})
      slots[slot].push(item);
    }
  }
});

let answer2 = sumArray(slots.map((box, outerIndex) => {
  return sumArray(box.map((item, innerIndex) => {
    return (outerIndex + 1) * (innerIndex + 1) * item.focal;
  }));
}));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1:  Answer2: // not 199506
