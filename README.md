# Library Dashboard

A React-based Library Management System dashboard that displays books, members, and borrowing statistics. All data is loaded dynamically from JSON files — no hardcoded content in components.

## Tech Stack

- **React 18** — UI
- **Vite 6** — build tool
- **Tailwind CSS v4** — styling (via `@tailwindcss/vite`)
- **React Router v6** — client-side routing
- **Recharts** — bar chart for borrow statistics

## Features

- Home page: summary card + monthly borrow chart
- Books page: searchable table with Add Book modal
- Members page: members table + active members card
- Navigation driven by `navigation.json` — add a route by editing one file
- Per-component loading spinners and inline error handling

## Run Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173/cloud-assignment/](http://localhost:5173/cloud-assignment/)

## Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `vite build` then pushes `dist/` to the `gh-pages` branch via the `gh-pages` package.

## Live URL

[https://RishabhPal2203.github.io/cloud-assignment/](https://RishabhPal2203.github.io/cloud-assignment/)
