import { useEffect, useRef } from "react";
import { useBook } from "../../hooks/useBook";
import classes from "./BookModal.module.scss";

export const BookModal = () => {
  const { selectedBook, setSelectedBook } = useBook();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (selectedBook) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [selectedBook]);

  return (
    <dialog ref={dialogRef} className={classes.dialog}>
      {selectedBook && (
        <>
          <h3 className={classes.dialog__title}>
            {selectedBook.volumeInfo.title}
          </h3>
          <img
            className={classes.dialog__image}
            src={selectedBook.volumeInfo.imageLinks?.thumbnail}
            alt={selectedBook.volumeInfo.title}
          />
          <p className={classes.dialog__meta}>
            {selectedBook.volumeInfo.authors ?? "No authors available"}
          </p>
          <p className={classes.dialog__meta}>
            {selectedBook.volumeInfo.averageRating
              ? `Rating: ${selectedBook.volumeInfo.averageRating}/5`
              : "No rating"}
          </p>
          <p className={classes.dialog__meta}>
            {selectedBook.volumeInfo.publishedDate ?? "No published date"}
          </p>
          {selectedBook.volumeInfo.previewLink ? (
            <a
              href={selectedBook.volumeInfo.previewLink}
              className={classes.dialog__previewLink}
              target="_blank"
            >
              Preview
            </a>
          ) : (
            "No preview available"
          )}
          <p className={classes.dialog__description}>
            {selectedBook.volumeInfo.description ?? "No description available"}
          </p>
          <button
            className={classes.dialog__close}
            onClick={() => setSelectedBook(null)}
          >
            Close
          </button>
        </>
      )}
    </dialog>
  );
};
