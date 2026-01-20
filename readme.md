**DealScout (TEAM LEXA)**

DealScout is a hackathon/demo app that helps you **discover and compare product deals** across popular Indian e-commerce platforms.

It combines:

- **A FastAPI backend** for deal lookup via link scraping and image-based product similarity.
- **A Vite + React frontend** that consumes the API and provides an interactive UI.

[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## What it does

- **Link search**: Paste a product link (Amazon / Flipkart / Meesho) and fetch basic pricing/offers.
- **Image search**: Upload a product image to find visually similar items from a demo catalog.
- **History**: Tracks recent queries per session.

## Screenshots / GIFs

- Add screenshots to `docs/screenshots/` and update these links:
  - `docs/screenshots/home.png`
  - `docs/screenshots/results.png`
  - `docs/screenshots/history.png`

## Tech stack

- **Frontend**: React + Vite
- **Backend**: FastAPI + Uvicorn
- **ML (demo)**: torchvision ResNet18 embeddings (CPU)
- **Scraping (demo)**: platform-specific scrapers (Amazon/Flipkart/Meesho)

## Project layout

- `backend/` — FastAPI backend, catalog and scrapers.
- `frontend/` — Vite + React demo app.

## Run locally

### Prerequisites

- Python 3.10+
- Node.js 16+ (recommended: 18+)

### Backend (FastAPI)

From the repository root:

1. Create and activate a virtual environment:

   PowerShell:

   `python -m venv backend\venv; backend\venv\Scripts\Activate.ps1`

2. Install dependencies:

   `pip install -r backend\requirements.txt`

3. Start the API:

   `uvicorn backend.app:app --reload --host 0.0.0.0 --port 8000`

API root: `http://localhost:8000/`

Swagger docs: `http://localhost:8000/docs`

### Frontend (Vite + React)

From the repository root:

1. Install dependencies:

   `cd frontend`

   `npm install`

2. Start the dev server:

   `npm run dev`

Vite will serve the UI (typically) at `http://localhost:5173/`.

## API overview

- `POST /search/image`
  - multipart form fields:
    - `file` (image)
    - `session_id` (optional)
- `POST /search/link`
  - JSON body: `{ "url": "<product-url>", "session_id": "<id>" }`
- `GET /history?session_id=...`

## Live demo (deployment options)

This repo has **two deployable pieces**:

- **Frontend (static build)**
  - Vercel: import the repo, set project root to `frontend/`, build command `npm run build`, output `dist/`.
  - GitHub Pages: build with `npm run build` and publish `frontend/dist` (e.g., via GitHub Actions).
- **Backend (FastAPI)**
  - Render / Railway / Fly.io: deploy `backend/` as a Python service, run command `uvicorn backend.app:app --host 0.0.0.0 --port $PORT`.

If you deploy the frontend separately, update the frontend API base URL in `frontend/src/App.jsx` (currently `http://localhost:8000`).

## Notes / limitations

- This is a **demo/proof-of-concept**. Scraping reliability can vary and may break when sites change.
- Embeddings are computed from sample catalog image URLs at startup; production should use persistent storage (vector DB/cache).
- CORS is permissive (`allow_origins=["*"]`) for demo; restrict it before production.

## Contributing

- Issues and PRs are welcome. For larger changes, open an issue first to discuss the approach.

## License

- No license file is included yet. Add `LICENSE` if you want to pick a specific OSS license.

## Contact

- Project: `DealScout` (repo owner: `tripcoded`).
