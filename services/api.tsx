import { WishlistProduct } from "../types/Wishlist";

const getAllWishlists = async () =>
  await fetch("https://fakestoreapi.com/carts?limit=5").then((res) =>
    res.json()
  );

const getProductsData = async (list: WishlistProduct[]) => {
  const allResponses = await Promise.all(
    list.map((item) =>
      fetch(`https://fakestoreapi.com/products/${item.productId}`)
    )
  );

  const allResponsesJSON = await Promise.all(
    allResponses.map((res) => res.json())
  );

  return [...allResponsesJSON];
};

export { getAllWishlists, getProductsData };
