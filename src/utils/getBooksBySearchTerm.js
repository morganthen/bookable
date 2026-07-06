export const getBooksBySearchTerm = async (term) => {
  const API_KEY = import.meta.env.VITE_BOOKS_API_KEY;
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${term}&key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to Fetch");
  }

  const data = await response.json();
  if (data.items.length === 0 || !data.items) {
    throw new Error(`No books found for ${term}`);
  }

  return data.items;
};
