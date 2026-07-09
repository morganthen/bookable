import { useContext } from "react";
import BookContext from "../context/BookContext";

export function useBook() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBook must be used withint a BookProvider");
  }
  return context;
}
