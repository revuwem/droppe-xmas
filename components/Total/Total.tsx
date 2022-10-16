import Button from "../Button";
import { useWishlistStore } from "../../store/store";
import {
  orderDetailsSelector,
  productsCountSelector,
} from "../../store/selectors";
import styles from "./Total.module.css";

interface ITotalProps {
  isConfirm?: boolean;
}

const Total: React.FC<ITotalProps> = ({ isConfirm = false }) => {
  const orderDetails = useWishlistStore(orderDetailsSelector);
  const productsCount = useWishlistStore(productsCountSelector);
  // const discount;
  // const total;

  const onConfirmButtonClick = () => {};

  return (
    <section className={styles.total}>
      <h3 className={styles.heading}>Total</h3>
      <ul className={styles.list}>
        {orderDetails.length > 0 &&
          orderDetails.map((orderDetails) => (
            <li className={styles.listItem}>
              <span>{orderDetails.name}</span>
              <span className={styles.muted}>{orderDetails.count} gift(s)</span>
              <span>{orderDetails.total}</span>
            </li>
          ))}
      </ul>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span>Approved</span>
          <span>{productsCount.approved} gift(s)</span>
        </li>
        <li className={styles.listItem}>
          <span>Discarded</span>
          <span>{productsCount.discarded} gift(s)</span>
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
