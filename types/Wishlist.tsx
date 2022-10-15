type ProductDetails = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type Product = {
  productId: number;
  quantity: number;
  details: ProductDetails;
  isApproved: boolean | undefined;
};

export type Wishlist = {
  id: number;
  userId: number;
  products: Product[];
};
