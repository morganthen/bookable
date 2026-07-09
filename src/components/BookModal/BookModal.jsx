import { useEffect, useRef } from "react";
import { useBook } from "../../hooks/useBook";

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
    <dialog ref={dialogRef} onClose={() => setSelectedBook(null)}>
      {selectedBook && (
        <>
          <h3>{selectedBook.volumeInfo.title}</h3>
          <img src={selectedBook.volumeInfo.imageLinks?.thumbnail}></img>
          <p>{selectedBook.volumeInfo.title ?? "No title"}</p>
          <p>
            {selectedBook.volumeInfo.averageRating
              ? `Average rating: ${selectedBook.volumeInfo.averageRating}`
              : "No average rating"}
          </p>
          <p>{selectedBook.volumeInfo.authors ?? "No authors available"}</p>
          <p>
            {selectedBook.volumeInfo.publishedDate ??
              "No published date available"}
          </p>
          <p>
            {selectedBook.volumeInfo.description ?? "No description available"}
          </p>
          <button onClick={() => setSelectedBook(null)}>Close</button>
        </>
      )}
    </dialog>
  );
};
