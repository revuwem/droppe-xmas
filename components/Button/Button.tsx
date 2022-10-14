import styles from "./Button.module.css";

type ButtonType = "solid" | "outlined";

interface IButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: ButtonType;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  type = "solid",
}) => {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
