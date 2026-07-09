import { useEffect, useState } from "react";
import BooksList from "../BooksList/BooksList";
import { getBooksBySearchTerm } from "../../utils/getBooksBySearchTerm.js";
import classes from "./BooksContainer.module.scss";
import { useBook } from "../../hooks/useBook.jsx";

export default function BooksContainer({ searchTerm }) {
  const [books, setBooks] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm === null || searchTerm === "") {
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

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <div className={classes.container}>
      {status === "idle" && <p>Search for books...</p>}
      {status === "loading" && <p>...loading...</p>}
      {status === "error" && <p>{error.message}</p>}
      {status === "success" && <BooksList term={searchTerm} books={books} />}
    </div>
  );
}
