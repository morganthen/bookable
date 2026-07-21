import { useState } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import BooksContainer from "./components/BooksContainer/BooksContainer";
import { Header } from "./components/Header/Header";
import { BookProvider } from "./context/BookContext";
import { BookModal } from "./components/BookModal/BookModal";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <BookProvider>
      <div>
        <Header>
          {hasSearched && (
            <SearchBar
              placeholder="Start typing to search..."
              id="search-bar"
              onSearch={setSearchTerm}
              value={searchTerm}
            />
          )}
        </Header>
        <BooksContainer
          searchTerm={searchTerm}
          onSetHasSearched={setHasSearched}
          onSearch={setSearchTerm}
          hasSearched={hasSearched}
        />
        <BookModal />
      </div>
    </BookProvider>
  );
}

export default App;
