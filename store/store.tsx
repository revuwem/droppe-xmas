import create from "zustand";
import {
  getAllWishlists,
  saveApprovedWishlists,
  saveDiscardedWishlists,
} from "../services/api";
import { Wishlist } from "../types/Wishlist";
import { calculateDiscount } from "../lib/calculateDiscount";
import { calculateTotal } from "../lib/calculateTotal";
import { getWishlistsByStatus } from "../lib/getWishlistsByStatus";
import { getAllWishlistsProductsCount } from "../lib/getWishlistsProductsCount";

export interface IWishlistState {
  wishlists: Wishlist[];
  approved: Wishlist[];
  discarded: Wishlist[];
  loading: boolean;
  error: string;
  filterPriceMin: number;
  filterPriceMax: number;
  discount: string;
  total: string;
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
  confirmOrder: () => Promise<void>;
}

export const useWishlistStore = create<IWishlistState>()((set, get) => ({
  wishlists: [],
  approved: [],
  discarded: [],
  loading: true,
  error: "",
  filterPriceMin: 0,
  filterPriceMax: 0,
  discount: "0",
  total: "0",
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
  confirmOrder: () =>
    new Promise(async (resolve, reject) => {
      // check if all wishlists products has status approved or discarded
      const uncheckedWishlists = getWishlistsByStatus(
        get().wishlists,
        undefined
      );
      const uncheckedProductsCount =
        getAllWishlistsProductsCount(uncheckedWishlists);
      if (uncheckedProductsCount > 0)
        reject("You need approve or discard each product");

      const approvedWishlists = getWishlistsByStatus(get().wishlists, true);
      const discardedWishlists = getWishlistsByStatus(get().wishlists, false);

      // calculate order price dietails
      const discount = calculateDiscount(approvedWishlists).toFixed(2);
      const total = (calculateTotal(approvedWishlists) - discount).toFixed(2);
      set({ discount, total });

      // push approved and discarded wishlists to API
      const isApprovedWishlistsSaved = await saveApprovedWishlists(
        approvedWishlists
      );
      const isDiscardedWishlistsSaved = await saveDiscardedWishlists(
        discardedWishlists
      );

      isApprovedWishlistsSaved && isDiscardedWishlistsSaved
        ? resolve()
        : reject("Failed to save wishlists");
    }),
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
