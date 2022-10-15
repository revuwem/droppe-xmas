import { Product as ProductT } from "../../types/Wishlist";
import Product from "../Product";
import Button from "../Button";
import styles from "./Wishlist.module.css";
import SystemMessage from "../SystemMessage";
import { useWishlistStore } from "../../store/store";

interface IWishlistProps {
  id: number;
  products: ProductT[];
  onApproveAll: (id: number) => void;
  onDiscardAll: (id: number) => void;
}

const Wishlist: React.FC<IWishlistProps> = ({
  id: wishlistId,
  products,
  onApproveAll,
  onDiscardAll,
}) => {
  const updateWishlistItem = useWishlistStore(
    (state) => state.updateWishlistItem
  );
  const onApproveWishlistItem = (id: number) =>
    updateWishlistItem(wishlistId, id, true);
  const onDiscardWishlistItem = (id: number) =>
    updateWishlistItem(wishlistId, id, false);

  const onButtonApproveAllClick = () => onApproveAll(wishlistId);
  const onButtonDiscardAllClick = () => onDiscardAll(wishlistId);

  return (
    <div className={styles.wishlist}>
      <div className={styles.header}>
        <h3 className={styles.title}>Kid {wishlistId} wishlist</h3>
        <div className={styles.userControls}>
          <Button onClick={onButtonDiscardAllClick} type="outlined">
            Discard All
          </Button>

          <Button onClick={onButtonApproveAllClick}>Approve All Gifts</Button>
        </div>
      </div>
      <ul className={styles.list}>
        {products.length > 0 ? (
          products.map((item) => (
            <Product
              key={item.productId}
              product={item}
              onApprove={onApproveWishlistItem}
              onDiscard={onDiscardWishlistItem}
            />
          ))
        ) : (
          <SystemMessage>
            No products found. Try change or reset filter
          </SystemMessage>
        )}
      </ul>
    </div>
  );
};

export default Wishlist;
