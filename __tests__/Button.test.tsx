import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button/Button";

describe("Button", () => {
  it("should render children props", () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    const button = screen.getByText(/Click me/i);
    expect(button).toBeInTheDocument();
  });

  it("should fire onClick handler", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByText(/Click me/i);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
