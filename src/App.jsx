import { useState } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import BooksContainer from "./components/BooksContainer/BooksContainer";
import { Header } from "./components/Header/Header";
import { BookProvider } from "./context/BookContext";
import { BookModal } from "./components/BookModal/BookModal";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BookProvider>
      <div>
        <Header>
          <SearchBar
            placeholder="e.g. The Secret, Harry Potter, Book of Fire and Ice"
            id="search-bar"
            onSearch={setSearchTerm}
          />
        </Header>
        <BooksContainer searchTerm={searchTerm} />
        <BookModal />
      </div>
    </BookProvider>
  );
}

export default App;
