import { Product as ProductT } from "../../types/Wishlist";
import Product from "../Product";
import Button from "../Button";
import styles from "./Wishlist.module.css";

interface IWishlistProps {
  id: number;
  products: ProductT[];
  onApproveAll: (id: number) => void;
  onDiscardAll: (id: number) => void;
}

const Wishlist: React.FC<IWishlistProps> = ({
  id,
  products,
  onApproveAll,
  onDiscardAll,
}) => {
  const onButtonApproveAllClick = () => onApproveAll(id);
  const onButtonDiscardAllClick = () => onDiscardAll(id);

  return (
    <div className={styles.wishlist}>
      <div className={styles.header}>
        <h3 className={styles.title}>Kid {id} wishlist</h3>
        <div className={styles.userControls}>
          <Button onClick={onButtonDiscardAllClick} type="outlined">
            Discard All
          </Button>

          <Button onClick={onButtonApproveAllClick}>Approve All Gifts</Button>
        </div>
      </div>
      <ul className={styles.list}>
        {products.map((item) => (
          <Product key={item.productId} product={item} />
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
