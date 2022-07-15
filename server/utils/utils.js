exports.ObjectsAreIdentical = (o1, o2) => {
  const o1Keys = Object.keys(o1);
  const o2Keys = Object.keys(o2);

  if (o1Keys.length === o2Keys.length) {
    return o1Keys.every((key) => o2.hasOwnProperty(key) && o1[key] === o2[key]);
  }

  return false;
};

// https://youtu.be/OpZG0HPPPWw

exports.ObjectContains = (o1, o2) => {};

// https://bobbyhadz.com/blog/javascript-check-if-array-contains-all-elements-another-array
