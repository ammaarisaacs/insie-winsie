const touched = true;

export default (fields, submit = false) => {
  let errors = {};

  for (let field in fields) {
    const {
      // touched,
      required,
      value,
      requiredMessage,
      file,
      matchWith,
      minLength,
      email,
      emailMessage,
      matchWithMessage,
      minLengthMessage,
      maxLength,
      maxLengthMessage,
      numeric,
      numericMessage,
      within,
      withinMessage,
      specialCharacters,
      specialCharactersMessage,
    } = fields[field];

    if (submit) {
      touched = true;
    }

    if (required && (value === "" || !value) && touched) {
      errors[field] = requiredMessage
        ? requiredMessage
        : "This field is required!";
    }

    if (
      !errors[field] &&
      numeric &&
      value !== "" &&
      containsLetters(value) &&
      touched
    ) {
      errors[field] = numericMessage
        ? numericMessage
        : "This field cannot have letters.";
    }

    if (
      !errors[field] &&
      value !== "" &&
      specialCharacters === false &&
      containsSpecialChars(value) &&
      touched
    ) {
      errors[field] = specialCharactersMessage
        ? specialCharactersMessage
        : "Invalid characters.";
    }

    if (
      !errors[field] &&
      value !== "" &&
      within &&
      !isWithin(value, within) &&
      touched
    ) {
      errors[field] = withinMessage
        ? withinMessage
        : "This field has an invalid option.";
    }

    if (!errors[field] && email && !validateEmail(value) && touched) {
      errors[field] = emailMessage ? emailMessage : "Invalid email address!";
    }

    if (file && required && Object.keys(value).length === 0 && touched) {
      errors[field] = requiredMessage
        ? requiredMessage
        : "This field is required!";
    }

    if (
      !errors[field] &&
      matchWith &&
      value !== fields[matchWith].value &&
      touched
    ) {
      errors[field] = matchWithMessage
        ? matchWithMessage
        : "Fields are not equal!";
    }

    if (
      !errors[field] &&
      minLength &&
      value !== "" &&
      value.length < minLength &&
      touched
    ) {
      errors[field] = minLengthMessage
        ? minLengthMessage
        : `This field must have at least ${fields[field].minLength} characters`;
    }

    if (
      !errors[field] &&
      maxLength &&
      value !== "" &&
      value.length > maxLength &&
      touched
    ) {
      errors[field] = maxLengthMessage
        ? maxLengthMessage
        : `This field must have less than ${fields[field].maxLength} characters`;
    }

    // if (
    //   !errors[field] &&
    //   file &&
    //   touched &&
    //   allowedTypes &&
    //   !allowedTypes.includes(value[0].type.split("/")[1])
    // ) {
    //   errors[field] = allowedTypesMessage
    //     ? allowedTypesMessage
    //     : "Invalid file type!";
    // }

    // if (
    //   !errors[field] &&
    //   file &&
    //   touched &&
    //   maxFileSize &&
    //   maxFileSize * 1024 < Math.round(value[0].size)
    // ) {
    //   errors[field] = maxFileSizeMessage
    //     ? maxFileSizeMessage
    //     : `File is too large(${Math.round(
    //         value[0].size / 1024
    //       )}KB), it cannot be larger than ${maxFileSize}KB`;
    // }
  }
  return errors;
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function containsSpecialChars(str) {
  const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
  return specialChars.split("").some((specialChar) => {
    if (str.includes(specialChar)) return true;
    return false;
  });
}

function containsLetters(str) {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters.split("").some((letter) => {
    if (str.includes(letter)) return true;
    return false;
  });
}

function isWithin(str, arr) {
  return arr.indexOf(str) > -1;
}
