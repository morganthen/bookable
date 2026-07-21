import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/books", async (req, res) => {
  const query = req.query.q;
  const maxResults = req.query.maxResults || 20;
  if (!query) return res.status(400).json({ error: "Missing search query" });
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${process.env.GOOGLE_BOOKS_API_KEY}`,
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Books API proxy error", err);
    res.status(500).json({ error: "Failed to fetch from Google Books API" });
  }
});

app.listen(PORT, () => {
  console.log(`Books API proxy running on http://localhost:${PORT}`);
});
