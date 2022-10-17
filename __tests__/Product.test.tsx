import { render, screen, fireEvent } from "@testing-library/react";
import { Product as ProductT } from "../types/Wishlist";
import Product from "../components/Product/Product";

describe("Product", () => {
  let product: ProductT;

  beforeEach(() => {
    product = {
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
    };
  });

  it("should fire onApprove", () => {
    const onApprove = jest.fn();
    render(<Product product={product} onApprove={onApprove} />);
    const button = screen.getByText(/Approve/i);
    fireEvent.click(button);
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it("should fire onDiscard", () => {
    const onDiscard = jest.fn();
    render(<Product product={product} onDiscard={onDiscard} />);
    const button = screen.getByText(/Discard/i);
    fireEvent.click(button);
    expect(onDiscard).toHaveBeenCalledTimes(1);
  });
});
