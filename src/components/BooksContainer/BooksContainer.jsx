import { useEffect, useState } from "react";
import BooksList from "../BooksList/BooksList";
import { getBooksBySearchTerm } from "../../utils/getBooksBySearchTerm.js";
import classes from "./BooksContainer.module.scss";
import RecommendedBooks from "../RecommendedBooks/RecommendedBooks.jsx";

export default function BooksContainer({
  searchTerm,
  onSetHasSearched,
  onSearch,
  hasSearched,
}) {
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
        onSetHasSearched(true);
      })
      .catch((err) => {
        setStatus("error");
        setError(err);
        onSetHasSearched(true);
      });
  }, [searchTerm]);

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <div className={classes.container}>
      {status === "idle" && hasSearched === false && (
        <RecommendedBooks onSearch={onSearch} />
      )}
      {status === "loading" && <p>...loading...</p>}
      {status === "error" && <p>{error.message}</p>}
      {status === "success" && <BooksList term={searchTerm} books={books} />}
    </div>
  );
}
