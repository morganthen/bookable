export const getBooksBySearchTerm = async (term, { maxResults } = {}) => {
  const response = await fetch(
    `/api/books?q=${encodeURIComponent(term)}&maxResults=${maxResults || 20}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();
  if (!data?.items || data.items.length === 0) {
    throw new Error(`No books found for "${term}"`);
  }

  return data.items;
};
