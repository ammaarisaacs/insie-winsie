export const mapStateToProps = (state, keys) => {
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

// state object you need
// state[field];
// actual valie of the key you want
// state[field][key];

// const propsObj = {};

// loop thorugh state
// for each state check each key and see if it is in keys obj
// if it is:
// propsObj[key] = state[field][key];

// push probsObh to props
// loop again

export const mapStateToInputProps = (state, keys, handler, error) => {
  let props = [];
  for (let field in state) {
    let prop = {};
    keys.map((key) => {
      prop[key] = state[field][key];
    });
    prop.onChange = handler;
    prop.error = error[field];

    props.push(prop);
  }
};

export const mapStateToPost = (formData) => {
  let postData = {};
  for (let field in formData) {
    const { value } = formData[field];
    postData[field] = value;
  }
  return postData;
};
