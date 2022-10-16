import { Wishlist } from "../types/Wishlist";

export const getWishlistsByStatus = (
  wishlists: Wishlist[],
  isApproved: boolean | undefined
) => {
  return wishlists.map((wishlist) => ({
    ...wishlist,
    products: wishlist.products.filter(
      (product) => product.isApproved === isApproved
    ),
  }));
};
