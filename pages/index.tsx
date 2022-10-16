import type { NextPage } from "next";
import { useEffect } from "react";
import Wishlist from "../components/Wishlist";
import Button from "../components/Button";
import FilterPriceForm from "../components/FilterPriceForm";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorIndicator from "../components/ErrorIndicator";
import SystemMessage from "../components/SystemMessage";
import { useWishlistStore } from "../store/store";
import { wishlistSelector } from "../store/selectors";
import styles from "../styles/Page.module.css";
import Total from "../components/Total";

const Home: NextPage = () => {
  const loading = useWishlistStore((state) => state.loading);
  const error = useWishlistStore((state) => state.error);
  const wishlists = useWishlistStore(wishlistSelector);
  const getAllWishlists = useWishlistStore((state) => state.getAllWishlists);
  const updateAllWishlists = useWishlistStore(
    (state) => state.updateAllWishlists
  );
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
                  />
                ))
              : null}
          </div>
        </div>
        <Total isConfirm />
      </div>
    </>
  );
};

export default Home;
