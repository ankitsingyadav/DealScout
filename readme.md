**DealScout (TEAM LEXA)**

DealScout is a simple hackathon/demo project that finds and compares product deals across popular Indian e-commerce platforms. It provides a backend API (FastAPI) that supports image-based product search (embedding + similarity) and link-based scraping for Amazon, Flipkart, and Meesho. A Vite-powered React frontend consumes the API for an interactive demo.

**Features**:
- **Image search**: Upload a product image to find visually similar catalog items.
- **Link search**: Paste a product link (Amazon / Flipkart / Meesho) and fetch basic pricing/offers.
- **Simple catalog**: In-memory product catalog with precomputed image embeddings for demo purposes.
- **Lightweight demo stack**: FastAPI backend, torchvision embeddings (ResNet18), and a Vite + React frontend.

**Quick Start (Windows)**

Prerequisites:
- Python 3.10+ (or compatible)
- Node.js 16+ and npm

Backend (API)

1. Create and activate a virtual environment from the `backend` folder:

`cd backend`

PowerShell (recommended):

`python -m venv venv; .\venv\Scripts\Activate.ps1`

2. Install Python dependencies:

`pip install -r requiremnts.txt`

3. Run the FastAPI server (development):

`uvicorn app:app --reload --host 0.0.0.0 --port 8000`

The API root will be available at `http://localhost:8000/` and interactive docs at `http://localhost:8000/docs`.

Frontend (Vite + React)

1. From the repository root open the `frontend` folder:

`cd frontend`

2. Install npm packages and start the dev server:

`npm install`
`npm run dev`

By default Vite serves the frontend on `http://localhost:5173/` (check terminal output). The frontend is configured to call the backend API; ensure the backend is running.

API Endpoints (overview)
- `POST /search/image` — form upload `file` (image) and optional `session_id` form field. Returns nearby catalog items.
- `POST /search/link` — JSON body `{ "url": "<product-url>", "session_id": "<id>" }`. Returns scraped product info when supported.
- `GET /history?session_id=...` — returns recent queries for the session.

Project layout
- `backend/` — FastAPI backend, catalog and scrapers.
- `frontend/` — Vite + React demo app.

Notes and limitations
- This project is a demo/proof-of-concept. The scraping code is synchronous via Playwright helpers wrapped in a thread executor — not hardened for production.
- Product embeddings are precomputed from sample `catalog.py` image URLs at startup. In production, store embeddings in a proper vector DB or cache.
- CORS is permissive (`allow_origins=["*"]`) for demo; lock it down before deploying.

Contributing
- Feel free to open issues or submit PRs. For larger changes, please open an issue first describing the plan.

License
- This repository does not include a license file. Add `LICENSE` if you want to pick a specific OSS license.

Contact
- Project: `DealScout` (repo owner: `tripcoded`).

---
If you want, I can also:
- Add shields (build, python version) at the top of this README.
- Create a `requirements.txt` with pinned versions or a `pyproject.toml` for better dependency management.
