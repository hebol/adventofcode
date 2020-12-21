const utils = require('../utils');

const ingSuspects = {}
const ingredients = {}
const dataList = utils.processLine(line => {
  const match = line.match(/^([a-z ]+) \(contains ([a-z, ]+)\)$/);
  const data = {
    ingredients: match[1].split(' '),
    allergens: match[2].replaceAll(',', '').split(' ')
  };
  data.ingredients.forEach(ing => {
    ingredients[ing] = (ingredients[ing] || 0) + 1;
  });
  return data;
}, 'input.txt')

dataList.forEach(data => {
  data.allergens.forEach(all => {
    if (ingSuspects.hasOwnProperty(all)) {
      ingSuspects[all] = ingSuspects[all].filter(ing => data.ingredients.indexOf(ing) >= 0);
    } else {
      ingSuspects[all] = data.ingredients.slice();
    }
  })
});

let free = Object.keys(ingredients);
Object.values(ingSuspects).forEach(array => {
  array.forEach(ing => {
    let index = free.indexOf(ing);
    if (index >= 0) {
      free = free.slice(0, index).concat(free.slice(index + 1));
    }
  })
})

const answer1 = free.reduce((rest, part) => rest + ingredients[part], 0);

while (Object.values(ingSuspects).find(arr => arr.length > 1)) {
  Object.keys(ingSuspects).forEach(all => {
    if (ingSuspects[all].length === 1) {
      const ing = ingSuspects[all][0];
      Object.keys(ingSuspects).forEach(anAll => {
        const array = ingSuspects[anAll];
        let index = array.indexOf(ing);
        if (array.length > 1 && index >= 0) {
          ingSuspects[anAll] = array.splice(0, index).concat(array.splice(index + 1))
        }
      })
    }
  })
}

const answer2 = Object.keys(ingSuspects).sort().map(all=>ingSuspects[all][0]).join(',');
console.log({answer1, answer2})
