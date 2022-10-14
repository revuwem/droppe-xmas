import { Product } from "../../types/Product";
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
  const { id, title, price, category, image, rating } = product;

  const onButtonApproveClick = () => onApprove && onApprove(id);
  const onButtonDiscardClick = () => onDiscard && onDiscard(id);

  return (
    <li className={styles.product}>
      <img src={image} alt="" className={styles.image} />
      <div>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.details}>
          {category} {rating.rate} / 5
        </p>
      </div>
      <div>
        <p className={styles.price}>€{price}</p>
        <div className={styles.userControls}>
          <Button onClick={onButtonDiscardClick} type="outlined">
            Discard
          </Button>
          <Button onClick={onButtonApproveClick}>Approve</Button>
        </div>
      </div>
    </li>
  );
};

export default Product;
