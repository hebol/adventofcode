const utils = require('../utils');
//let arrayList = utils.readFileNoFilter('invalid.txt');
let arrayList = utils.readFileNoFilter();

console.log('Data is:', arrayList);

var validFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];

var count = 0;
var current = {};

function validate(obj) {
  var result;
  const byr  = parseInt(obj.byr);
  const iyr  = parseInt(obj.iyr);
  const eyr  = parseInt(obj.eyr);
  result = (byr >= 1920 && byr <= 2002 && obj.byr.length === 4) &&
    (iyr >= 2010 && iyr <= 2020 && obj.iyr.length === 4) &&
    (eyr >= 2020 && eyr <= 2030 && obj.eyr.length === 4)

  var data = obj.hgt.match(/^(\d+)(in|cm)$/);
  result = result && data;
  if (result && data && data[2] === 'cm') {
    result = parseInt(data[1]) >= 150 && parseInt(data[1]) <= 193;
  }
  if (result && data && data[2] === 'in') {
    result = parseInt(data[1]) >= 59 && parseInt(data[1]) <= 76;
  }
  result = result && obj.hcl.match(/^#[a-f0-9]{6}$/)
  result = result && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(obj.ecl) >= 0

  result = result && obj.pid.match(/^[0-9]{9}$/)
  return result;
}

while (arrayList.length > 0) {
  const aLine = arrayList.shift();
  if (aLine.length > 0) {
    aLine.split(' ').filter(part => part.length > 0).forEach(part => {
      var data = part.split(':')
      current[data[0]] = data[1];
    });
  } else {
    console.log('Looking at', current);
    var ok = false;
    switch (Object.keys(current).length) {
      case 8:
        ok = true;
        break;
      case 7:
        if (!current.hasOwnProperty('cid')) {
          ok = true;
        }
        break;
    }
    if (ok && validate(current)) {
      count++
    }
    current = {}
  }
}
console.log('Found', count, 'valid');
