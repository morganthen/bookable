import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import classes from "./RecommendedBooks.module.scss";
import { getBooksBySearchTerm } from "../../utils/getBooksBySearchTerm.js";
import RecommendedBooksList from "../RecommendedBooksList/RecommendedBooksList.jsx";

function RecommendedBooks({ onSearch }) {
  const [books, setBooks] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus("loading");

    getBooksBySearchTerm("philosophy", { maxResults: 4 })
      .then((data) => {
        setStatus("success");
        setBooks(data);
      })
      .catch((err) => {
        setStatus("error");
        setError(err);
      });
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);
  return (
    <section className={classes.hero}>
      <h2 className={classes.hero__heading}>Discover Your Next Read</h2>
      <p className={classes.hero__tagline}>
        Search thousands of books and find your next page-turner.
      </p>
      <SearchBar
        placeholder="Search by title, author, or keyword..."
        id="hero-search-bar"
        onSearch={onSearch}
        trigger="manual"
        className={classes.hero__input}
      />
      {status === "loading" && <p>...loading...</p>}
      {status === "error" && <p>{error.message}</p>}
      {status === "success" && (
        <>
          <h3 className={classes.hero__label}>Recommended Reads</h3>
          <RecommendedBooksList books={books} />
        </>
      )}
    </section>
  );
}

export default RecommendedBooks;
