import { render, screen, fireEvent } from "@testing-library/react";
import { Product as ProductT } from "../../types/Product";
import Product from "./Product";

describe("Product", () => {
  let product: ProductT;

  beforeEach(() => {
    product = {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      rating: { rate: 2.1, count: 430 },
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
