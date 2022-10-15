import styles from "./SystemMessage.module.css";

interface ISystemMessage {
  children: string;
}

const SystemMessage: React.FC<ISystemMessage> = ({ children }) => (
  <p className={styles.message}>{children}</p>
);

export default SystemMessage;
