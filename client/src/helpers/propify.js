export const makeInputProps = (state) => {
  let propConfig = [];

  for (let field in state) {
    const props = {
      id: field,
      name: field,
      text: state[field].text,
      value: state[field].text,
    };
    propConfig.push(props);
  }
  return propConfig;
};
