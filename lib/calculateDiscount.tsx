import { Wishlist, Product } from "../types/Wishlist";

export const calculateDiscount = (wishlists: Wishlist[]) => {
  const allProducts = wishlists.reduce(
    (acc, wishlist) => acc.concat(wishlist.products),
    [] as Product[]
  );

  const productsToDiscount = allProducts.filter(
    (product, idx, arr) =>
      arr.filter((item) => item.productId === product.productId).length > 1
  );

  const productsDiscountDetails = productsToDiscount.reduce((acc, product) => {
    const productIdx = acc.findIndex(
      (item) => item.productId === product.productId
    );
    if (productIdx !== -1) {
      acc[productIdx].count += 1;
      acc[productIdx].total += product.totalPrice;
      return acc;
    }
    return [
      ...acc,
      {
        productId: product.productId,
        count: 1,
        total: product.totalPrice,
      },
    ];
  }, [] as any[]);

  const discount = productsDiscountDetails.reduce(
    (acc, item) => (acc += item.total * (item.count * 0.1)),
    0
  );

  return discount;
};
