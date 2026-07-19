export const getBooksBySearchTerm = async (term) => {
  const response = await fetch(`/api/books?q=${encodeURIComponent(term)}`);

  if (!response.ok) {
    throw new Error("Failed to Fetch");
  }

  const data = await response.json();
  if (!data?.items || data.items.length === 0) {
    throw new Error(`No books found for "${term}"`);
  }

  return data.items;
};
