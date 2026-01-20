# 🛍️ DealScout

> **Compare product deals across Indian e-commerce platforms instantly using image & link search.**

[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Vite 7](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🎯 Problem & Solution

**Problem:** Comparing product prices across multiple Indian e-commerce platforms (Amazon, Flipkart, Meesho) requires visiting each site individually—wasting time and mental energy.

**Solution:** DealScout lets you:
- 📸 **Upload a product image** → Get visually similar items with cross-platform prices
- 🔗 **Paste a product link** → Instantly see prices on all platforms
- 💰 **Compare deals** → Find the best price in seconds

Perfect for shoppers, deal hunters, and hackathon demos!

## ✨ Features

- **Image-Based Search**: Upload any product photo → ResNet18 embeddings find similar catalog items
- **Link Scraping**: Paste Amazon/Flipkart/Meesho URLs → Get unified pricing data
- **Cross-Platform Comparison**: See lowest/highest prices and best platform at a glance
- **Session History**: Tracks recent searches per user (in-memory, 10 searches max)
- **Modern Stack**: FastAPI + React with minimal dependencies
- **Interactive API Docs**: Built-in Swagger UI at `/docs`

## 🚀 Quick Start

### Prerequisites
- **Python 3.10+** and pip
- **Node.js 16+** and npm
- **Git**

### Backend Setup (PowerShell on Windows)

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

✅ Backend runs at `http://localhost:8000`  
📖 API docs at `http://localhost:8000/docs`

### Frontend Setup

```powershell
cd frontend
npm install
npm run dev
```

✅ Frontend runs at `http://localhost:5173`

**Note:** Ensure backend is running before opening the frontend!

## 📡 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `POST /search/image` | POST | Upload image, get similar products with prices |
| `POST /search/link` | POST | Paste product link, scrape platform data |
| `GET /history` | GET | Get search history for a session |
| `GET /` | GET | Health check |

### Example Requests

**Image Search:**
```bash
curl -X POST http://localhost:8000/search/image \
  -F "file=@product.jpg" \
  -F "session_id=user123"
```

**Link Search:**
```bash
curl -X POST http://localhost:8000/search/link \
  -H "Content-Type: application/json" \
  -d '{"url": "https://amazon.in/dp/XXXXX", "session_id": "user123"}'
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│           React Frontend (Vite)                     │
│     (localhost:5173, image+link search UI)          │
└──────────────────┬──────────────────────────────────┘
                   │ HTTP/JSON
                   ↓
┌─────────────────────────────────────────────────────┐
│         FastAPI Backend (localhost:8000)            │
├─────────────────────────────────────────────────────┤
│ • ResNet18 embeddings (image search)                │
│ • Platform detection & scraping (link search)       │
│ • Session history management                        │
│ • Catalog: 5 demo products with cross-platform data │
└─────────────────────────────────────────────────────┘
```

**Key Components:**
- **Image Pipeline**: Upload → ResNet18 encode → Cosine similarity → Top-4 results
- **Link Pipeline**: URL → Platform detection → Scraper routing → Normalized response
- **Catalog**: [catalog.py](backend/catalog.py) – 5 demo products with Amazon/Flipkart/Meesho offers

## 📁 Project Structure

```
DealScout/
├── backend/
│   ├── app.py                 # FastAPI server, embeddings, endpoints
│   ├── catalog.py             # Demo product data
│   ├── requirements.txt        # Python dependencies
│   ├── render.yaml            # Render.com deployment config
│   └── scrapers/
│       ├── amazon.py          # Amazon scraper stub
│       ├── flipkart.py        # Flipkart scraper stub
│       └── meesho.py          # Meesho scraper stub
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── main.jsx           # Entry point
│   │   └── App.css            # Styling
│   ├── package.json           # npm dependencies
│   ├── vite.config.js         # Vite build config
│   └── index.html             # HTML template
├── .github/
│   └── copilot-instructions.md # AI agent guidelines
└── README.md                  # This file
```

## 📚 Documentation

- **[Setup & Dev Workflow](CONTRIBUTING.md)** – Detailed setup, coding standards, contribution process
- **[Deployment Guide](DEPLOYMENT.md)** – Deploy backend to Render, frontend to Vercel/GitHub Pages
- **[AI Agent Guidelines](.github/copilot-instructions.md)** – For Copilot/Claude development

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19, Vite 7, CSS3 | Modern UI, fast dev server |
| **Backend** | FastAPI, uvicorn | Async API server |
| **ML/CV** | PyTorch, torchvision (ResNet18) | Image embeddings |
| **Data** | NumPy, Pillow | Vector ops, image processing |
| **Scraping** | requests, BeautifulSoup4 | HTTP + HTML parsing stubs |

## 🚢 Deployment

### Backend (Render.com)
```bash
# Automatic via render.yaml
# Build: pip install -r requirements.txt
# Start: uvicorn app:app --host 0.0.0.0 --port 8000
```

### Frontend (Vercel / GitHub Pages)
```bash
# Build: npm run build
# Output: dist/ folder
# Deploy: Push to GitHub, connect Vercel, or run `npm run build` + upload to Pages
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed steps.

## 🔒 Security & Limitations

⚠️ **This is a demo/hackathon project. Before production use:**
- ✗ Scrapers are stubs; implement real scraping with Playwright
- ✗ CORS is permissive (`"*"`); restrict to your domain
- ✗ Session history is in-memory; use Redis/database for persistence
- ✗ Image embeddings are precomputed; use vector DB for scale
- ✗ No authentication; add JWT tokens for multi-user support

## 📝 Configuration

Create a `.env` file in the `backend/` folder (see `.env.example`):

```env
API_BASE_URL=http://localhost:8000
CORS_ORIGINS=http://localhost:5173
MAX_HISTORY_SIZE=10
```

## 💡 Common Modifications

### Add a New Platform
1. Create `backend/scrapers/myntra.py` with `scrape_myntra(url: str) -> dict`
2. Import in `app.py` and add to `detect_platform()` logic
3. Test with `POST /search/link`

### Update Catalog
Edit [catalog.py](backend/catalog.py) – add products with `id`, `title`, `image_url`, `offers` array.

### Change Embedding Model
Replace ResNet18 in [app.py](backend/app.py) (line 74) with any torchvision model (EfficientNet, ViT, etc.).

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m "Add amazing feature"`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the **MIT License** – see [LICENSE](LICENSE) file for details.

## 📮 Contact & Support

- **Project Name**: DealScout
- **Team**: DARK KODERS
- **Maintainer**: [@tripcoded](https://github.com/tripcoded)
- **Colaborator**: [@ankitsingyadav](https://github.com/ankitsingyadav) 
- **Issues**: [GitHub Issues](../../issues)

---

⭐ **If you found this useful, consider giving us a star!**


