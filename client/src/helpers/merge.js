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
  for (let i = 0; i < formData.length; i++) {
    const { name, value } = formData[i];
    postData[name] = value;
  }

  return postData;
};
