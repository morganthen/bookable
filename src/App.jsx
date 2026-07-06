import { useState } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import BooksContainer from "./components/BooksContainer/BooksContainer";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Bookable</h1>
      <SearchBar
        placeholder="e.g. The Secret, Harry Potter, Book of Fire and Ice"
        labelText="Search for books"
        id="search-bar"
        onSearch={setSearchTerm}
      />
      <BooksContainer searchTerm={searchTerm} />
    </div>
  );
}

export default App;
