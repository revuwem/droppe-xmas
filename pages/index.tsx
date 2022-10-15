import type { NextPage } from "next";
import { useEffect } from "react";
import Wishlist from "../components/Wishlist";
import Button from "../components/Button";
import FilterPriceForm from "../components/FilterPriceForm";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorIndicator from "../components/ErrorIndicator";
import { useWishlistStore } from "../store/store";
import styles from "../styles/Home.module.css";
import SystemMessage from "../components/SystemMessage";

const Home: NextPage = () => {
  const loading = useWishlistStore((state) => state.loading);
  const error = useWishlistStore((state) => state.error);
  const wishlists = useWishlistStore((state) => {
    if (state.filterPriceMin || state.filterPriceMax) {
      return state.wishlists.map((wishlist) => ({
        ...wishlist,
        products: wishlist.products.filter(
          (item) =>
            item.details.price >= state.filterPriceMin &&
            item.details.price <= state.filterPriceMax
        ),
      }));
    }

    return state.wishlists;
  });
  const getAllWishlists = useWishlistStore((state) => state.getAllWishlists);
  const updateAllWishlists = useWishlistStore(
    (state) => state.updateAllWishlists
  );
  const updateWishlist = useWishlistStore((state) => state.updateWishlist);

  const setFilterPriceMin = useWishlistStore(
    (state) => state.setFilterPriceMin
  );
  const setFilterPriceMax = useWishlistStore(
    (state) => state.setFilterPriceMax
  );

  useEffect(() => {
    getAllWishlists();
  }, []);

  const onApproveAllWishlistsClick = () => updateAllWishlists(true);
  const onApproveWishlist = (id: number) => updateWishlist(id, true);
  const onDiscardWishlist = (id: number) => updateWishlist(id, false);

  const onFilterPriceFormSubmit = ({
    min,
    max,
  }: {
    min: number;
    max: number;
  }) => {
    setFilterPriceMin(min);
    setFilterPriceMax(max);
  };
  const onFilterPriceFormReset = () => {
    setFilterPriceMin(0);
    setFilterPriceMax(0);
  };

  return (
    <>
      <h2 className={styles.heading}>Manage Wishlists</h2>

      <div className="pageContainer">
        <div className="content">
          <div className={styles.controls}>
            <FilterPriceForm
              onSubmit={onFilterPriceFormSubmit}
              onReset={onFilterPriceFormReset}
            />
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
