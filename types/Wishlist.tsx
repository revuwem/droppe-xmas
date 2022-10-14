export type WishlistProduct = { productId: number; quantity: number };

export type Wishlist = {
  id: number;
  userId: number;
  products: WishlistProduct[];
};
