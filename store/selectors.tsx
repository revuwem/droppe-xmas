import { IWishlistState } from "./store";

export const wishlistSelector = (state: IWishlistState) => {
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
};
