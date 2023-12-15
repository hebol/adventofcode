const {sumArray, readFile} = require("../../utils");
let arrayList = readFile('input.txt')[0].split(',');

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
    slots[slot] = slots[slot].filter(item => item.label !== label);
  } else {
    const item = {
      label: part.slice(0, -2),
      focal: parseInt(part.slice(-1))
    };
    const slot = doHash(item.label);
    const found = slots[slot].find(i => i.label === item.label);
    if (found) {
      found.focal = item.focal;
    } else {
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
// Answer1: 513643 Answer2: 265345
