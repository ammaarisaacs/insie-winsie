import styles from "./button.module.css";

const Button = ({ link, text, onClick, hiddenForMedia }) => {
  const completeClass = `button${hiddenForMedia ? " hidden" : ""}`;
  return (
    <button className={styles[completeClass]} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
