import styles from "./Button.module.css";

type ButtonType = "solid" | "outlined";

interface IButtonProps {
  children: React.ReactNode;
  onClick: (e: any) => void;
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
