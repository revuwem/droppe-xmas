import { render, screen, fireEvent } from "@testing-library/react";
import Total from "../components/Total";

import { useWishlistStore } from "../store/store";

const initialState = {
  ...useWishlistStore.getState(),
  wishlists: [
    {
      id: 5,
      userId: 3,
      date: "2020-03-01T00:00:02.000Z",
      products: [
        {
          productId: 7,
          quantity: 1,
          totalPrice: 10,
          isApproved: undefined,
          details: {
            id: 7,
            title: "White Gold Plated Princess",
            price: 10,
            description:
              "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
            category: "jewelery",
            image:
              "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
            rating: { rate: 3, count: 400 },
          },
        },
        {
          productId: 8,
          quantity: 1,
          totalPrice: 20,
          isApproved: true,
          details: {
            id: 8,
            title: "White Gold Plated Princess",
            price: 20,
            description:
              "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
            category: "jewelery",
            image:
              "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
            rating: { rate: 3, count: 400 },
          },
        },
        {
          productId: 9,
          quantity: 1,
          totalPrice: 30,
          isApproved: false,
          details: {
            id: 9,
            title: "White Gold Plated Princess",
            price: 30,
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
  ],
};

describe("Total", () => {
  beforeAll(() => {
    useWishlistStore.setState(initialState);
    window.alert = jest.fn();
  });

  it("should render order details", () => {
    render(<Total />);

    const orderDetails = screen.getByTestId("orderDetails");
    expect(orderDetails).toHaveTextContent(
      `Kid ${initialState.wishlists[0].id}`
    );
    expect(orderDetails).toHaveTextContent("1 gift(s)");
    expect(orderDetails).toHaveTextContent("€ 20");
  });

  it("should render products count", () => {
    render(<Total />);

    const productsCountApproved = screen.getByTestId("productsCountApproved");
    const productsCountDiscarded = screen.getByTestId("productsCountDiscarded");

    expect(productsCountApproved).toHaveTextContent("1 gift(s)");
    expect(productsCountDiscarded).toHaveTextContent("1 gift(s)");
  });

  it("should not render price details when order is not confirmed", () => {
    render(<Total isConfirm />);

    const orderPriceDetails = screen.queryByTestId("orderPriceDetails");
    expect(orderPriceDetails).toBe(null);
  });

  it("should render price details when order is confirmed ", () => {
    render(<Total />);

    const orderPriceDetails = screen.getByTestId("orderPriceDetails");
    expect(orderPriceDetails).toBeInTheDocument();
  });

  it("should fire confirm button click", () => {
    useWishlistStore.getState().confirmOrder = jest.fn(() => Promise.resolve());
    const { confirmOrder } = useWishlistStore.getState();

    render(<Total isConfirm />);

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    expect(confirmOrder).toBeCalledTimes(1);
  });
});
