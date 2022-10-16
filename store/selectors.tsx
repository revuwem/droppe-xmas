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
  const approved = state.wishlists.map((wishlist) => ({
    ...wishlist,
    products: wishlist.products.filter((product) => product.isApproved),
  }));

  // go through all the approved products list
  // and calculate amout and total for each wishlist
  const orderDetails = approved.map((item) => {
    const count = item.products.length;
    const total = item.products.reduce(
      (sum, prod) => sum + prod.details.price * prod.quantity,
      0
    );
    return {
      name: `Kid ${item.id}`,
      count,
      total: `€ ${total}`,
    };
  });

  return orderDetails;
};
