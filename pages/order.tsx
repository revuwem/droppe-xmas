import { NextPage } from "next";
import Total from "../components/Total";
import Wishlist from "../components/Wishlist";
import {
  approvedWishlistSelector,
  discardedWishlistSelector,
} from "../store/selectors";
import { useWishlistStore } from "../store/store";
import styles from "../styles/Page.module.css";

const Order: NextPage = () => {
  const approvedWishlists = useWishlistStore(approvedWishlistSelector);
  const discardedWishlists = useWishlistStore(discardedWishlistSelector);
  return (
    <>
      <h2 className={styles.heading}>Order</h2>
      <div className="pageContainer">
        <div className="content">
          <h3 className={styles.title}>Approved gifts</h3>
          {approvedWishlists.map((item: any) => (
            <Wishlist
              key={item.id}
              id={item.id}
              products={item.products}
              readonly
            />
          ))}
          <div className={styles.space}></div>
          <h3 className={styles.title}>Discarded gifts</h3>
          {discardedWishlists.map((item: any) => (
            <Wishlist
              key={item.id}
              id={item.id}
              products={item.products}
              readonly
            />
          ))}
        </div>
        <Total />
      </div>
    </>
  );
};

export default Order;
