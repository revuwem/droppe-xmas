import { Wishlist } from "../types/Wishlist";

export const calculateTotal = (wishlists: Wishlist[]) => {
  return wishlists.reduce(
    (acc, wishlist) =>
      (acc += wishlist.products.reduce(
        (acc, item) => (acc += item.totalPrice),
        0
      )),
    0
  );
};
