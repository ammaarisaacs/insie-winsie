import styles from "./button.module.css";

const Button = ({ link, text, onClick, media }) => {
  const className = media ? "button__media" : "button";
  return (
    <button className={styles[className]} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
