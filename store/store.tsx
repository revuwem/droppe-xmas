import create from "zustand";
import { getAllWishlists } from "../services/api";
import { Wishlist } from "../types/Wishlist";

export interface IWishlistState {
  wishlists: Wishlist[];
  approved: Wishlist[];
  discarded: Wishlist[];
  loading: boolean;
  error: string;
  filterPriceMin: number;
  filterPriceMax: number;
  getAllWishlists: () => void;
  updateAllWishlists: (isApproved: boolean) => void;
  updateWishlist: (id: number, isApproved: boolean) => void;
  updateWishlistItem: (
    wishlistId: number,
    productId: number,
    isApproved: boolean
  ) => void;
  setFilterPriceMin: (price: number) => void;
  setFilterPriceMax: (price: number) => void;
}

export const useWishlistStore = create<IWishlistState>()((set, get) => ({
  wishlists: [],
  approved: [],
  discarded: [],
  loading: true,
  error: "",
  filterPriceMin: 0,
  filterPriceMax: 0,
  getAllWishlists: async () => {
    getAllWishlists()
      .then((data) => set({ wishlists: data, loading: false }))
      .catch((err) => set({ error: err, loading: false }));
  },
  updateAllWishlists: (isApproved: boolean) => {
    const wishlists = get().wishlists;
    const newWishlists = wishlists.map((item) =>
      getUpdatedWishlist(wishlists, item.id, isApproved)
    );

    set(() => ({
      wishlists: newWishlists,
    }));
  },
  updateWishlist: (id: number, isApproved: boolean) => {
    const wishlists = get().wishlists;
    const wishlistIdx = wishlists.findIndex((wishlist) => wishlist.id === id);
    const newWishlist = getUpdatedWishlist(wishlists, id, isApproved);
    set((state) => ({
      wishlists: [
        ...state.wishlists.slice(0, wishlistIdx),
        newWishlist,
        ...state.wishlists.slice(wishlistIdx + 1),
      ],
    }));
  },
  updateWishlistItem: (
    wishlistId: number,
    productId: number,
    isApproved: boolean
  ) => {
    set((state) => ({
      wishlists: state.wishlists.map((list) => {
        if (list.id === wishlistId) {
          return {
            ...list,
            products: list.products.map((item) => {
              if (item.productId === productId) {
                return { ...item, isApproved };
              }
              return item;
            }),
          };
        }
        return list;
      }),
    }));
  },
  setFilterPriceMin: (price) => set({ filterPriceMin: price }),
  setFilterPriceMax: (price) => set({ filterPriceMax: price }),
}));

const getUpdatedWishlist = (
  wishlists: Wishlist[],
  id: number,
  isApproved: boolean
) => {
  const wishlistIdx = wishlists.findIndex((wishlist) => wishlist.id === id);
  const newWishlist = wishlists[wishlistIdx];
  newWishlist.products = newWishlist.products.map((item) => ({
    ...item,
    isApproved,
  }));

  return newWishlist;
};
