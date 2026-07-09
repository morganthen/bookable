# Bookable — Google Books API Search Engine

Search the Google Books catalogue and dive into any title — built with React, SCSS Modules, and a server-side API proxy.

**nology bootcamp project.** Assigned Jul 8, due Jul 20.

![screenshot placeholder]

---

## Features

- **Debounced search** — 500ms delay, no hammering the API on every keystroke
- **Responsive book grid** — thumbnail, title, author, rating, and published date for each result
- **Book detail modal** — click any card to see the full description, rating, and a Google Books preview link
- **Server-side API proxy** — Express backend hides the API key; the client never sees it
- **Status handling** — idle, loading, error, and empty-result states all covered
- **SCSS theming** — CSS custom properties for palette, dark mode ready, mixins for layout + media queries

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React (JSX) via Vite |
| Styling | SCSS Modules + CSS custom properties |
| API proxy | Express + cors + dotenv |
| State | React Context (modal) + local useState |
| Routing | N/A — single-page search |

---

## Project structure

```
google-books-api/
├── server/
│   ├── index.js              # Express proxy: GET /api/books?q=
│   ├── .env                  # GOOGLE_BOOKS_API_KEY (server-side only)
│   └── package.json
├── src/
│   ├── context/
│   │   └── BookContext.jsx    # selectedBook state + BookProvider
│   ├── hooks/
│   │   └── useBook.jsx        # Context consumer hook
│   ├── components/
│   │   ├── Header/            # App header + logo
│   │   ├── SearchBar/         # Debounced search input
│   │   ├── BooksContainer/    # Fetch logic + status states
│   │   ├── BooksList/         # Grid layout + result count
│   │   ├── BookCard/          # Single book thumbnail + metadata
│   │   └── BookModal/         # Detail overlay (native <dialog>)
│   ├── utils/
│   │   └── getBooksBySearchTerm.js
│   ├── scss/                  # Variables, mixins, normalize
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js             # Dev proxy: /api → localhost:3001
└── package.json
```

---

## Data flow

```
App (BookProvider + searchTerm state)
├── Header
│   └── SearchBar ──onSearch──→ setSearchTerm
├── BooksContainer (fetch /api/books?q=searchTerm)
│   └── BooksList
│       └── BookCard ──onClick──→ setSelectedBook (via useBook context)
└── BookModal ←── reads selectedBook (via useBook context)
```

Context is used for `selectedBook` only — it crosses independent branches (BookCard → BookModal). The books array stays local to BooksContainer since it flows one direction down a single component chain.

---

## Setup

### 1. Install dependencies

```bash
# Root (Vite + React)
npm install

# Server (Express proxy)
cd server && npm install
```

### 2. Add your API key

Create `server/.env`:

```
GOOGLE_BOOKS_API_KEY=your_key_here
```

Get a key from [Google Cloud Console](https://console.cloud.google.com/) — enable the Books API.

### 3. Run

Two terminals:

```bash
# Terminal 1 — Express proxy (port 3001)
cd server && node index.js

# Terminal 2 — Vite dev server (port 5173)
npm run dev
```

Vite's dev proxy forwards `/api/*` calls to Express, so the React app just hits `/api/books` without hardcoding a port.

### 4. Build

```bash
npm run build    # Vite output in /dist
```

---

## API proxy

The Express server exists to keep the Google Books API key server-side. Without it, the key would be embedded in the client bundle via `VITE_`-prefixed env vars.

```
Browser → /api/books?q=harry+potter → Vite proxy → Express → Google Books API
                                                                      ↓
Browser ← JSON response            ← Vite       ← Express ← JSON response
```

The client never touches `GOOGLE_BOOKS_API_KEY`.
