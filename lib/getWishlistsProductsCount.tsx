import { Wishlist } from "../types/Wishlist";

export const getAllWishlistsProductsCount = (wishlists: Wishlist[]) =>
  wishlists.reduce((sum, item) => sum + item.products.length, 0);
