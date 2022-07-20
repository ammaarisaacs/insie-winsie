import React from "react";

const Input = (props) => {
  return (
    <label className={styles.field}>
      <span className={styles.field__label} htmlFor={props.for}>
        {props.text}
      </span>
      <input
        required
        className={styles.field__input}
        type={props.type}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
    </label>
  );
};

export default Input;
