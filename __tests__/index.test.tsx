import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import Home from "../pages";
import { useWishlistStore } from "../store/store";

const dummyWishlists = [
  {
    id: 5,
    userId: 3,
    date: "2020-03-01T00:00:02.000Z",
    products: [
      {
        productId: 7,
        quantity: 1,
        totalPrice: 9.99,
        isApproved: undefined,
        details: {
          id: 7,
          title: "White Gold Plated Princess",
          price: 9.99,
          description:
            "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
          category: "jewelery",
          image:
            "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
          rating: { rate: 3, count: 400 },
        },
      },
    ],
  },
];

describe("Home page", () => {
  const originalState = useWishlistStore.getState();

  useWishlistStore.getState().getAllWishlists = jest.fn(() =>
    useWishlistStore.setState({
      ...originalState,
      wishlists: dummyWishlists,
      loading: false,
      error: "",
    })
  );

  useWishlistStore.getState().updateAllWishlists = jest.fn(() =>
    useWishlistStore.setState({
      ...originalState,
      wishlists: [
        {
          ...dummyWishlists[0],
          products: [{ ...dummyWishlists[0].products[0], isApproved: true }],
        },
      ],
      loading: false,
      error: "",
    })
  );

  beforeEach(() => {
    useWishlistStore.setState(originalState);
  });

  it("should render wishlists", async () => {
    render(<Home />);

    const wishlist = await waitFor(() => screen.getByTestId("wishlist"));

    expect(wishlist).toBeInTheDocument();
    expect(wishlist).toHaveTextContent(/Kid 5 wishlist/i);
    expect(wishlist).toHaveTextContent(
      dummyWishlists[0].products[0].details.title
    );
    expect(wishlist).not.toHaveTextContent(/approved|discarded/i);
  });

  it("should approve all wishlists", async () => {
    render(<Home />);

    const approveAllWishlistsButton = screen.getByRole("button", {
      name: /Approve all wishlists/i,
    });
    expect(approveAllWishlistsButton).toBeInTheDocument();

    const wishlist = await waitFor(() => screen.getByTestId("wishlist"));
    expect(wishlist).toBeInTheDocument();

    fireEvent.click(approveAllWishlistsButton);
    expect(wishlist).toHaveTextContent(/approved/i);
  });
});
