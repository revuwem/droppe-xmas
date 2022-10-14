import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Wishlist from "../components/Wishlist";
import Button from "../components/Button";
import FilterPriceForm from "../components/FilterPriceForm";
import { Wishlist as WishlistT } from "../types/Wishlist";
import { getAllWishlists } from "../services/api";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [wishlistList, setWishlistList] = useState<WishlistT[]>([]);
  useEffect(() => {
    getAllWishlists().then((data) => setWishlistList(data));
  }, []);

  const onApproveWishlist = () => console.log("approved all");
  const onDiscardWishlist = () => console.log("discarded all");
  const onFilterPriceFormSubmit = () => console.log("submit filter price");

  return (
    <>
      <h2 className={styles.heading}>Manage Wishlists</h2>

      <div className="pageContainer">
        <div className="content">
          <div className={styles.controls}>
            <FilterPriceForm onSubmit={onFilterPriceFormSubmit} />
            <Button onClick={() => {}}>Approve all Wishlists</Button>
          </div>
          <div className="list">
            {wishlistList.map((item) => (
              <Wishlist
                key={item.id}
                id={item.id}
                products={item.products}
                onApproveAll={onApproveWishlist}
                onDiscardAll={onDiscardWishlist}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
