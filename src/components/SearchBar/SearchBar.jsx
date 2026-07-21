import { useState, useEffect } from "react";
import classes from "./SearchBar.module.scss";

export default function SearchBar({
  placeholder,
  labelText,
  onSearch,
  id,
  value,
  trigger = "auto",
  className,
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (trigger !== "auto") return;
    const timeout = setTimeout(() => {
      if (inputValue) {
        onSearch(inputValue);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue, onSearch, trigger]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      onSearch(inputValue);
    }
  };

  return (
    <form className={classes.wrapper} onSubmit={handleSubmit}>
      <label htmlFor={id}>{labelText}</label>
      <div className={classes.inputRow}>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          className={className}
        ></input>
        {trigger === "manual" && (
          <button type="submit" className={classes.submitBtn}>
            Search
          </button>
        )}
      </div>
    </form>
  );
}
