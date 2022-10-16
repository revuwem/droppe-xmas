import { Product, Wishlist } from "../types/Wishlist";

const getAllWishlists = async () => {
  const data = await fetch("https://fakestoreapi.com/carts?limit=5").then(
    (res) => res.json()
  );

  // walk through all wishlists and fetch details for each wishlist product
  const detailedData = await Promise.all(
    data.map(async (el: Wishlist) => {
      const productWithDetails = await Promise.all(
        el.products.map(async (item) => await getProductData(item))
      );

      return { ...el, products: productWithDetails };
    })
  );

  return detailedData;
};

const getProductData = async (product: Product) => {
  const id = product.productId;
  const data = await fetch(`https://fakestoreapi.com/products/${id}`).then(
    (res) => res.json()
  );

  const totalPrice = data.price * product.quantity;

  return { ...product, totalPrice, details: data };
};

export { getAllWishlists };
