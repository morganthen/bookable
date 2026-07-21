import BookCard from "../BookCard/BookCard";
import classes from "./RecommendedBooksList.module.scss";

function RecommendedBooksList({ books }) {
  return (
    <section className={classes.layout}>
      <section className={classes.section}>
        {books.map((b) => {
          return <BookCard key={b.id} book={b} />;
        })}
      </section>
    </section>
  );
}

export default RecommendedBooksList;
