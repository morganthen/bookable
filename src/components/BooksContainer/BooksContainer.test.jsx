import { describe, expect, expectTypeOf, it, vi } from "vitest";
import * as bookService from "../../utils/getBooksBySearchTerm";
import BooksContainer from "./BooksContainer";
import { render, screen } from "@testing-library/react";
import { BookProvider } from "../../context/BookContext";

const mockBooks = [
  {
    id: "1",
    volumeInfo: {
      title: "The Great Gatsby",
      authors: ["F. Scott Fitzgerald"],
      imageLinks: { thumbnail: "http://books.google.com/thumb1" },
      publishedDate: "1925",
      description: "A story of the fabulously wealthy Jay Gatsby.",
    },
  },
  {
    id: "2",
    volumeInfo: {
      title: "To Kill a Mockingbird",
      authors: ["Harper Lee"],
      imageLinks: { thumbnail: "http://books.google.com/thumb2" },
      publishedDate: "1960",
      description: "A gripping tale of race and justice in the American South.",
    },
  },
  {
    id: "3",
    volumeInfo: {
      title: "1984",
      authors: ["George Orwell"],
      imageLinks: { thumbnail: "http://books.google.com/thumb3" },
      publishedDate: "1949",
      description: "A dystopian novel set in a totalitarian society.",
    },
  },
];

describe("BooksContainer", () => {
  it("Should show a loading message when there is a search term", async () => {
    const spyOnGetBooks = vi.spyOn(bookService, "getBooksBySearchTerm");
    spyOnGetBooks.mockResolvedValueOnce([...mockBooks]);
    render(
      <BookProvider>
        <BooksContainer
          searchTerm="dogs"
          hasSearched={false}
          onSetHasSearched={vi.fn()}
          onSearch={vi.fn()}
        />
      </BookProvider>,
    );
    expect(screen.getByText("...loading...")).toBeInTheDocument();
  });
  it("Should show an error message when fetch fails", async () => {
    const spy = vi.spyOn(bookService, "getBooksBySearchTerm");
    spy.mockRejectedValueOnce(new Error("Something went wrong"));

    render(
      <BookProvider>
        <BooksContainer
          searchTerm="bad-search"
          hasSearched={true}
          onSetHasSearched={vi.fn()}
          onSearch={vi.fn()}
        />
      </BookProvider>,
    );
    const errorMessage = await screen.findByText(/Something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("Should render books when fetch succeeds", async () => {
    const spy = vi.spyOn(bookService, "getBooksBySearchTerm");
    spy.mockResolvedValueOnce([...mockBooks]);
    render(
      <BookProvider>
        <BooksContainer
          searchTerm="dogs"
          hasSearched={true}
          onSetHasSearched={vi.fn()}
          onSearch={vi.fn()}
        />
      </BookProvider>,
    );
    expect(await screen.findByText(/the great gatsby/i)).toBeInTheDocument();
  });
});
