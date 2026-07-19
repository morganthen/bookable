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

  const thumbnail = selectedBook?.volumeInfo.imageLinks?.thumbnail
    ? selectedBook.volumeInfo.imageLinks.thumbnail
    : "public/fallback_thumbnail2.png";
  const publishedDate = selectedBook?.volumeInfo.publishedDate
    ? selectedBook.volumeInfo.publishedDate.split("-")[0]
    : "No published date";

  return (
    <dialog ref={dialogRef} className={classes.dialog}>
      {selectedBook && (
        <>
          <div className={classes.dialog__left}>
            <img
              className={classes.dialog__image}
              src={thumbnail}
              alt={selectedBook.volumeInfo.title}
            />
            {selectedBook.volumeInfo.previewLink ? (
              <a
                href={selectedBook.volumeInfo.previewLink}
                className={classes.dialog__previewLink}
                target="_blank"
              >
                Read Excerpt
              </a>
            ) : (
              <p>No preview available</p>
            )}
          </div>
          <div className={classes.dialog__right}>
            <h3 className={classes.dialog__title}>
              {selectedBook.volumeInfo.title ?? "No Title Available"}
            </h3>
            <div className={classes.dialog__meta}>
              <p>{selectedBook.volumeInfo.authors ?? "No authors available"}</p>
              <span>&middot;</span>
              <p>{publishedDate}</p>
            </div>
            <div className={classes.dialog__rating}>
              <p>
                {selectedBook.volumeInfo.averageRating
                  ? `Rating: ${selectedBook.volumeInfo.averageRating}/5`
                  : "No rating"}
              </p>
            </div>

            <p className={classes.dialog__description}>
              {selectedBook.volumeInfo.description ??
                "No description available"}
            </p>
          </div>
          <button
            className={classes.dialog__close}
            onClick={() => setSelectedBook(null)}
          >
            &#215;
          </button>
        </>
      )}
    </dialog>
  );
};
