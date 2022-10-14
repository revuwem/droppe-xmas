import styles from "./Label.module.css";

interface ILabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const Label: React.FC<ILabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
    </label>
  );
};

export default Label;
