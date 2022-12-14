import { getWishlistsByStatus } from "../lib/getWishlistsByStatus";
import { getAllWishlistsProductsCount } from "../lib/getWishlistsProductsCount";
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

export const orderDetailsSelector = (state: IWishlistState) => {
  // go through all the wishlists
  // and build a list of approved products per each wishlist
  const approved = getWishlistsByStatus(state.wishlists, true);

  // go through all the approved products list
  // and calculate amout and total for each wishlist
  const orderDetails = approved.map((item) => {
    const count = item.products.length;
    const total = item.products.reduce((sum, prod) => sum + prod.totalPrice, 0);
    return {
      name: `Kid ${item.id}`,
      count,
      total: `€ ${total}`,
    };
  });

  return orderDetails;
};

export const productsCountSelector = (state: IWishlistState) => {
  const approvedList = getWishlistsByStatus(state.wishlists, true);
  const approved = getAllWishlistsProductsCount(approvedList);

  const discardedList = getWishlistsByStatus(state.wishlists, false);
  const discarded = getAllWishlistsProductsCount(discardedList);

  return { approved, discarded };
};

export const orderPriceDetailsSelector = (state: IWishlistState) => {
  return { discount: state.discount, total: state.total };
};

export const approvedWishlistSelector = (state: IWishlistState) => {
  return getWishlistsByStatus(state.wishlists, true);
};

export const discardedWishlistSelector = (state: IWishlistState) => {
  return getWishlistsByStatus(state.wishlists, false);
};
