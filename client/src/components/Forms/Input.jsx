import styles from "./input.module.css";

const Input = (props) => {
  return (
    <label className={styles.field}>
      <span className={styles.field__label} htmlFor={props.id}>
        {props.text}
      </span>
      <input
        className={styles.field__input}
        id={props.id}
        name={props.name}
        type={props.type || "text"}
        onChange={props.onChange}
        value={props.value}
        required={props.required || false}
      />
      {props.error && <p className={styles.field__error}>{props.error}</p>}
    </label>
  );
};

export default Input;
