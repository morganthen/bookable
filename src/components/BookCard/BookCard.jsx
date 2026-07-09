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
      <img src={book.volumeInfo.imageLinks?.thumbnail}></img>
      <p>{book.volumeInfo.title ?? "No title"}</p>
      <p>
        {book.volumeInfo.averageRating
          ? `Average rating: ${book.volumeInfo.averageRating}`
          : "No average rating"}
      </p>
      <p>{book.volumeInfo.authors ?? "No authors available"}</p>
      <p>{book.volumeInfo.publishedDate ?? "No published date available"}</p>
      {/* <p>{book.description}</p> */}
    </article>
  );
}
