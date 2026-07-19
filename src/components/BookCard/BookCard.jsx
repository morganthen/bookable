import { useBook } from "../../hooks/useBook";
import classes from "./BookCard.module.scss";
export default function BookCard({ book }) {
  const { setSelectedBook } = useBook();
  const title = book.volumeInfo.title
    ? book.volumeInfo.title.length > 40
      ? `${book.volumeInfo.title.slice(0, 40)}…`
      : book.volumeInfo.title
    : "No Title Available";

  const authors = book.volumeInfo.authors
    ? book.volumeInfo.authors.length > 1
      ? `${book.volumeInfo.authors[0]} et al`
      : book.volumeInfo.authors
    : "No authors available";

  const thumbnail = book.volumeInfo.imageLinks?.thumbnail
    ? book.volumeInfo.imageLinks.thumbnail
    : "/fallback_thumbnail2.png";

  return (
    <article
      className={classes.card}
      onClick={() => {
        setSelectedBook(book);
      }}
    >
      <img className={classes.card__image} src={thumbnail}></img>
      <div className={classes.card__title}>
        <h3>{title}</h3>
      </div>
      <div className={classes.card__meta}>
        <p className={classes.card__author}>{authors}</p>
        {/* the below feels sketchy, ask Alex */}
        <p className={classes.card__date}>
          {book.volumeInfo.publishedDate
            ? book.volumeInfo.publishedDate.slice(0, 4)
            : "No published date available"}
        </p>
      </div>
      <div className={classes.card__description}>
        <p>
          {book.volumeInfo.description
            ? book.volumeInfo.description.slice(0, 200) + "..."
            : "No description available"}
        </p>
      </div>
    </article>
  );
}
