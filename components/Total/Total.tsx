import Button from "../Button";
import styles from "./Total.module.css";

interface ITotalProps {
  isConfirm?: boolean;
}

const Total: React.FC<ITotalProps> = ({ isConfirm = false }) => {
  const onConfirmButtonClick = () => {};

  return (
    <section className={styles.total}>
      <h3 className={styles.heading}>Total</h3>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span>Sara</span>
          <span className={styles.muted}>1 gift</span>
          <span>€345</span>
        </li>
      </ul>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span>Approved</span>
          <span>12 gifts</span>
        </li>
      </ul>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span>Discount</span>
          <span> - €345</span>
        </li>
      </ul>
      {isConfirm && (
        <Button onClick={onConfirmButtonClick}>Confirm order</Button>
      )}
    </section>
  );
};

export default Total;
