import { useBook } from "../../hooks/useBook";
import classes from "./BookCard.module.scss";
export default function BookCard({ book }) {
  const { setSelectedBook } = useBook();

  return (
    <article
      className={classes.card}
      onClick={() => {
        setSelectedBook(book);
      }}
    >
      <img
        className={classes.card__image}
        src={book.volumeInfo.imageLinks?.thumbnail}
      ></img>
      <p className={classes.card__title}>
        {book.volumeInfo.title ?? "No title"}
      </p>

      <p className={classes.card__author}>
        {book.volumeInfo.authors ?? "No authors available"}
      </p>
      <p className={classes.card__date}>
        {book.volumeInfo.publishedDate ?? "No published date available"}
      </p>
    </article>
  );
}
