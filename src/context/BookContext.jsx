import { createContext, useState } from "react";

const BookContext = createContext();

export function BookProvider({ children }) {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  );
}

export default BookContext;
