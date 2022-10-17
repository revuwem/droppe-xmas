import { Product as ProductT } from "../../types/Wishlist";
import Product from "../Product";
import Button from "../Button";
import styles from "./Wishlist.module.css";
import { useWishlistStore } from "../../store/store";

interface IWishlistProps {
  id: number;
  products: ProductT[];
  readonly?: boolean;
}

const Wishlist: React.FC<IWishlistProps> = ({
  id: wishlistId,
  products,
  readonly = false,
}) => {
  const updateWishlistItem = useWishlistStore(
    (state) => state.updateWishlistItem
  );
  const updateWishlist = useWishlistStore((state) => state.updateWishlist);

  const onApproveWishlist = () => updateWishlist(wishlistId, true);
  const onDiscardWishlist = () => updateWishlist(wishlistId, false);

  const onApproveWishlistItem = (id: number) =>
    updateWishlistItem(wishlistId, id, true);
  const onDiscardWishlistItem = (id: number) =>
    updateWishlistItem(wishlistId, id, false);

  return (
    <div className={styles.wishlist} data-testid="wishlist">
      <div className={styles.header}>
        <h3 className={styles.title}>Kid {wishlistId} wishlist</h3>
        {!readonly && (
          <div className={styles.userControls}>
            <Button onClick={onDiscardWishlist} type="outlined">
              Discard All
            </Button>

            <Button onClick={onApproveWishlist}>Approve All Gifts</Button>
          </div>
        )}
      </div>
      <ul className={styles.list}>
        {products.length > 0 ? (
          products.map((item) =>
            !readonly ? (
              <Product
                key={item.productId}
                product={item}
                onApprove={onApproveWishlistItem}
                onDiscard={onDiscardWishlistItem}
              />
            ) : (
              <Product key={item.productId} product={item} />
            )
          )
        ) : (
          <p className={styles.message}>No products found.</p>
        )}
      </ul>
    </div>
  );
};

export default Wishlist;
