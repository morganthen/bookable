import { useState, useEffect } from "react";
import classes from "./SearchBar.module.scss";

export default function SearchBar({ placeholder, labelText, onSearch, id }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputValue) {
        onSearch(inputValue);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue, onSearch]);

  return (
    <div className={classes.wrapper}>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      ></input>
    </div>
  );
}
