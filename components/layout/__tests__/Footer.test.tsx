// components/layout/__tests__/Footer.test.tsx

import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

describe("Footer component", () => {
  it("should render the footer element", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("should render the copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/© my.podcast 2022/i)).toBeInTheDocument();
  });

  it("should render the description text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Maquette réalisé par Adveris/i)
    ).toBeInTheDocument();
  });

  it("should have correct CSS classes", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-black", "py-8");
  });

  it("should center the text", () => {
    const { container } = render(<Footer />);
    const paragraph = container.querySelector("p");
    expect(paragraph).toHaveClass("text-center");
  });

  it("should render with correct structure", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    const div = footer?.querySelector("div");
    const p = div?.querySelector("p");

    expect(footer).toBeInTheDocument();
    expect(div).toHaveClass("container", "mx-auto", "px-4");
    expect(p).toBeInTheDocument();
  });
});

