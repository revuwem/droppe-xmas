import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Wishlist from "../components/Wishlist";
import { Wishlist as WishlistT } from "../types/Wishlist";
import { getAllWishlists } from "../services/api";

const Home: NextPage = () => {
  const [wishlistList, setWishlistList] = useState<WishlistT[]>([]);
  useEffect(() => {
    getAllWishlists().then((data) => setWishlistList(data));
  }, []);

  const onApproveWishlist = () => console.log("approved all");
  const onDiscardWishlist = () => console.log("discarded all");

  return (
    <>
      <h2>Manage Wishlists</h2>
      <div className="controls">
        <div>
          <span>Filter by price, €</span>
          <input type="text" id="priceMin" placeholder="0" />
          <input type="text" id="priceMax" placeholder="250" />
          <button>Apply</button>
        </div>
        <button>Approve all Wishlists</button>
      </div>
      <div className="page-content">
        <div>
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
    </>
  );
};

export default Home;
