import { describe, expect, it } from "vitest";
import BookCard from "./BookCard";
import { render, screen } from "@testing-library/react";
import { BookProvider } from "../../context/BookContext";

const fakeBook = {
  volumeInfo: {
    title: "Steve Jobs",
    authors: ["Sarah Machajewski"],
    imageLinks: { thumbnail: "http://..." },
    publishedDate: "2016-07-15",
    description: "A book about Steve Jobs...",
  },
};

const fakeBookNoDescription = {
  volumeInfo: {
    title: "Mystery Book",
    authors: ["Unknown"],
    publishedDate: "2020",
  },
};

describe("BookCard", () => {
  it("Should render", () => {
    render(
      <BookProvider>
        <BookCard book={fakeBook} />
      </BookProvider>,
    );
    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
  });

  it("Should render correct content based on props", () => {
    render(
      <BookProvider>
        <BookCard book={fakeBook} />
      </BookProvider>,
    );
    const bookTitle = screen.getByRole("heading", { name: /steve jobs/i });
    expect(bookTitle).toBeInTheDocument();
  });

  it("Should render the description when present", () => {
    render(
      <BookProvider>
        <BookCard book={fakeBook} />
      </BookProvider>,
    );
    const description = screen.getByText(/a book about steve jobs/i);
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe("P");
  });

  it("Should render fallback text when no description", () => {
    render(
      <BookProvider>
        <BookCard book={fakeBookNoDescription} />
      </BookProvider>,
    );
    const description = screen.getByText(/no description available/i);
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe("P");
  });
});
