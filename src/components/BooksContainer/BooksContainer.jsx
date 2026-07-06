import { useEffect, useState } from "react";
import BooksList from "../BooksList/BooksList";
import { getBooksBySearchTerm } from "../../utils/getBooksBySearchTerm.js";

export default function BooksContainer({ searchTerm }) {
  const [books, setBooks] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm === null) {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus("loading");

    getBooksBySearchTerm(searchTerm)
      .then((data) => {
        setStatus("success");
        setBooks(data);
      })
      .catch((err) => {
        setStatus("error");
        setError(err);
      });
  }, [searchTerm]);

  console.log(books);

  if (status === "idle") {
    return <p>Search for books...</p>;
  }

  if (status === "loading") {
    return <p>...loading...</p>;
  }
  if (status === "error") {
    return <p style={{ color: "red" }}>{error.message}</p>;
  }

  if (status === "success") {
    return <BooksList term={searchTerm} books={books} />;
  }
}
