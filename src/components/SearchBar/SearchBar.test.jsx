import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "./SearchBar";
import { render, screen } from "@testing-library/react";

describe("SearchBar", () => {
  it("Should call onSearch with the right values", async () => {
    const user = userEvent.setup();
    const fakeSearch = vi.fn(() => {});
    render(
      <SearchBar
        onSearch={fakeSearch}
        trigger="manual"
        placeholder="Search books"
        id="test-search"
      />,
    );
    const btn = screen.getByRole("button");
    const input = screen.getByPlaceholderText("Search books");
    await user.type(input, "hello");
    await user.click(btn);
    expect(fakeSearch).toHaveBeenCalledOnce();
    expect(fakeSearch).toHaveBeenCalledWith("hello");
    expect(fakeSearch.mock.calls[0][0]).toBe("hello");
  });

  it("Should debounce onSearch when typing (auto mode)", async () => {
    const user = userEvent.setup();
    const fakeSearch = vi.fn();
    render(
      <SearchBar
        onSearch={fakeSearch}
        placeholder="Search books"
        id="test-search"
      />,
    );
    const input = screen.getByPlaceholderText("Search books");
    await user.type(input, "hello");

    //wait for debounce
    await vi.waitFor(
      () => {
        expect(fakeSearch).toHaveBeenCalledWith("hello");
      },
      { timeout: 600 }, //600ms so it's tighther, could use 1000ms too
    );
  });

  it("Should render button only in manual mode", () => {
    const { rerender } = render(
      <SearchBar
        trigger="manual"
        placeholder="Search books"
        id="test-search"
      />,
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();

    rerender(
      <SearchBar trigger="auto" placeholder="Search books" id="test-search" />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
