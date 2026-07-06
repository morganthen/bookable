import classes from "./BookCard.module.scss";
export default function BookCard({ book }) {
  return (
    <article className={classes.card}>
      <img src={book.imageLinks?.thumbnail}></img>
      <p>{book.title}</p>
      <p>Average Rating: {book.averageRating ?? "not available"}</p>
      <p>{book.authors}</p>
      <p>{book.publishedDate}</p>
      {/* <p>{book.description}</p> */}
    </article>
  );
}
