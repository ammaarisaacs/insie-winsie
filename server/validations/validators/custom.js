exports.noSpecialChars = (str) => {
  const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
  return !specialChars.split("").some((char) => str.includes(char));
};

exports.onlyNumbersAndSpaces = (str) => {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return !letters.split("").some((letter) => str.includes(letter));
};

exports.hasJavascript = (url) => {
  if (!url.includes("javascript")) return true;
  return false;
};

exports.despace = (val) => {
  return val.split(" ").join("");
};
