import { useEffect, useMemo, useState } from "react";
import { Product } from "../../types/Wishlist";
import Button from "../Button";
import styles from "./Product.module.css";

interface IProductProps {
  product: Product;
  onApprove?: (id: number) => void;
  onDiscard?: (id: number) => void;
}

const Product: React.FC<IProductProps> = ({
  product,
  onApprove,
  onDiscard,
}) => {
  const { productId, quantity, totalPrice, details, isApproved } = product;
  const { image, title, category, rating } = details;

  const onButtonApproveClick = () => onApprove && onApprove(productId);
  const onButtonDiscardClick = () => onDiscard && onDiscard(productId);

  return (
    <li className={styles.product}>
      <img src={image} alt="" className={styles.image} />
      <div>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.details}>
          {category} | Rate: {rating.rate} / 5 | Qty: {quantity}
        </p>
        <p
          className={`${styles.status} ${
            isApproved ? styles.approved : styles.discarded
          }`}
        >
          {typeof isApproved !== "undefined"
            ? isApproved
              ? "Approved"
              : "Discarded"
            : null}
        </p>
      </div>
      <div>
        <p className={styles.price}>€{totalPrice}</p>
        <div className={styles.userControls}>
          {(typeof isApproved === "undefined" || isApproved) && (
            <Button onClick={onButtonDiscardClick} type="outlined">
              Discard
            </Button>
          )}
          {(typeof isApproved === "undefined" || !isApproved) && (
            <Button onClick={onButtonApproveClick}>Approve</Button>
          )}
        </div>
      </div>
    </li>
  );
};

export default Product;
