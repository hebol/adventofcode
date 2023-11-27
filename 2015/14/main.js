const crypto = require('crypto');

function findKeys(salt, numberOfKeys) {
  let keys = [];
  let index = 0;

  while (keys.length < numberOfKeys) {
    let hash = md5(salt + index);
    let triplet = findTriplet(hash);

    if (triplet) {
      for (let i = 1; i <= 1000; i++) {
        let nextHash = md5(salt + (index + i));
        if (nextHash.includes(triplet.repeat(5))) {
          keys.push({ index, hash });
          break;
        }
      }
    }
    index++;
  }

  return keys;
}

function md5(data) {
  return crypto.createHash('md5').update(data).digest("hex");
}

function findTriplet(hash) {
  for (let i = 0; i < hash.length - 2; i++) {
    if (hash[i] === hash[i + 1] && hash[i] === hash[i + 2]) {
      return hash[i];
    }
  }
  return null;
}

// Replace 'ihaygndm' with your actual salt
const salt = 'ihaygndm';
const keys = findKeys(salt, 64);
console.log('64th key index:', keys[keys.length - 1].index);
