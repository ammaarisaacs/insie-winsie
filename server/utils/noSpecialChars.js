const noSpecialChars = (str) => {
  const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
  return specialChars.split("").some((specialChar) => {
    if (str.includes(specialChar)) return false;
    return true;
  });
};

module.exports = noSpecialChars;
