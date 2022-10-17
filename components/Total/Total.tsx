import Button from "../Button";
import { useWishlistStore } from "../../store/store";
import {
  orderDetailsSelector,
  orderPriceDetailsSelector,
  productsCountSelector,
} from "../../store/selectors";
import styles from "./Total.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

interface ITotalProps {
  isConfirm?: boolean;
}

const Total: React.FC<ITotalProps> = ({ isConfirm = false }) => {
  const orderDetails = useWishlistStore(orderDetailsSelector);
  const productsCount = useWishlistStore(productsCountSelector);
  const orderPriceDetails = !isConfirm
    ? useWishlistStore(orderPriceDetailsSelector)
    : null;
  const confirmOrder = useWishlistStore((state) => state.confirmOrder);
  const router = useRouter();

  const [confirmOrderButtonText, setConfirmOrderButtonText] =
    useState<string>("Confirm order");

  const onConfirmButtonClick = () => {
    setConfirmOrderButtonText("Saving order...");
    confirmOrder()
      .then(() => router.push("/order"))
      .catch((res) => {
        alert(res);
        setConfirmOrderButtonText("Confirm order");
      });
  };

  return (
    <section className={styles.total} data-testid="total">
      <h3 className={styles.heading}>Total</h3>
      <ul className={styles.list} data-testid="orderDetails">
        {orderDetails.length > 0 &&
          orderDetails.map((orderDetails) => (
            <li key={orderDetails.name} className={styles.listItem}>
              <span>{orderDetails.name}</span>
              <span className={styles.muted}>{orderDetails.count} gift(s)</span>
              <span>{orderDetails.total}</span>
            </li>
          ))}
      </ul>
      <ul className={styles.list}>
        <li className={styles.listItem} data-testid="productsCountApproved">
          <span>Approved</span>
          <span>{productsCount.approved} gift(s)</span>
        </li>
        <li className={styles.listItem} data-testid="productsCountDiscarded">
          <span>Discarded</span>
          <span>{productsCount.discarded} gift(s)</span>
        </li>
      </ul>
      {orderPriceDetails && (
        <ul className={styles.list} data-testid="orderPriceDetails">
          <li className={styles.listItem}>
            <span>Discount</span>
            <span> - €{orderPriceDetails?.discount}</span>
          </li>
          <li className={styles.listItem}>
            <span>Total</span>
            <span> €{orderPriceDetails?.total}</span>
          </li>
        </ul>
      )}
      {isConfirm && (
        <Button onClick={onConfirmButtonClick}>{confirmOrderButtonText}</Button>
      )}
    </section>
  );
};

export default Total;
