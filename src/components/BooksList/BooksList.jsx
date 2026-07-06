import BookCard from "../BookCard/BookCard";
import classes from "./BooksList.module.scss";

export default function BooksList({ term, books }) {
  return (
    <section className={classes.layout}>
      <h2>
        Found {books.length} books about {term}
      </h2>
      <section className={classes.section}>
        {books.map((b) => {
          return <BookCard key={b.id} book={b.volumeInfo} />;
        })}
      </section>
    </section>
  );
}
