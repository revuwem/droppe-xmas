import styles from "./Input.module.css";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<IInputProps> = ({ id, type, placeholder, onChange }) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      className={styles.input}
    />
  );
};

export default Input;
