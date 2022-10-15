import type { NextPage } from "next";
import { useEffect } from "react";
import Wishlist from "../components/Wishlist";
import Button from "../components/Button";
import FilterPriceForm from "../components/FilterPriceForm";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorIndicator from "../components/ErrorIndicator";
import shallow from "zustand/shallow";
import { useWishlistStore } from "../store/store";
import styles from "../styles/Home.module.css";
import SystemMessage from "../components/SystemMessage";

const Home: NextPage = () => {
  const {
    wishlists,
    loading,
    error,
    getAllWishlists,
    updateAllWishlists,
    updateWishlist,
  } = useWishlistStore(
    (state) => ({
      wishlists: state.wishlists,
      loading: state.loading,
      error: state.error,
      getAllWishlists: state.getAllWishlists,
      updateAllWishlists: state.updateAllWishlists,
      updateWishlist: state.updateWishlist,
    }),
    shallow
  );

  useEffect(() => {
    getAllWishlists();
  }, []);

  const onApproveAllWishlistsClick = () => updateAllWishlists(true);
  const onApproveWishlist = (id: number) => updateWishlist(id, true);
  const onDiscardWishlist = (id: number) => updateWishlist(id, false);
  const onFilterPriceFormSubmit = () => console.log("submit filter price");

  return (
    <>
      <h2 className={styles.heading}>Manage Wishlists</h2>

      <div className="pageContainer">
        <div className="content">
          <div className={styles.controls}>
            <FilterPriceForm onSubmit={onFilterPriceFormSubmit} />
            <Button onClick={onApproveAllWishlistsClick}>
              Approve all Wishlists
            </Button>
          </div>
          <div className="list">
            {loading && <LoadingIndicator />}
            {error && <ErrorIndicator>{error}</ErrorIndicator>}
            {!loading && wishlists.length === 0 && (
              <SystemMessage>Wishlists are empty</SystemMessage>
            )}
            {wishlists.length > 0
              ? wishlists.map((item: any) => (
                  <Wishlist
                    key={item.id}
                    id={item.id}
                    products={item.products}
                    onApproveAll={onApproveWishlist}
                    onDiscardAll={onDiscardWishlist}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
