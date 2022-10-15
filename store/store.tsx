import create from "zustand";
import { getAllWishlists } from "../services/api";
import { Wishlist } from "../types/Wishlist";

interface IWishlistState {
  wishlists: Wishlist[];
  approved: Wishlist[];
  discarded: Wishlist[];
  loading: boolean;
  error: string;
  getAllWishlists: () => void;
  updateAllWishlists: (isApproved: boolean) => void;
  updateWishlist: (id: number, isApproved: boolean) => void;
  updateWishlistItem: (
    wishlistId: number,
    itemId: number,
    isApproved: boolean
  ) => void;
}

export const useWishlistStore = create<IWishlistState>()((set, get) => ({
  wishlists: [],
  approved: [],
  discarded: [],
  loading: true,
  error: "",
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
  updateWishlistItem: (id: number) => {},
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
