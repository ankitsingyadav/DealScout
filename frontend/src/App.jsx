import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:8000";

function App() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const [sessionId] = useState(() => {
    return "sess_" + Math.random().toString(36).slice(2);
  });

  const [history, setHistory] = useState([]);

  const handleImageChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSearchImage = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("session_id", sessionId);

      const res = await fetch(`${API_BASE}/search/image`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      setResults(data);
      await loadHistory();
    } catch (err) {
      console.error("Error searching image:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchLink = async () => {
    if (!link.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/search/link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: link, session_id: sessionId }),
      });

      const data = await res.json();
      setResults(data);
      await loadHistory();
    } catch (err) {
      console.error("Error searching link:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    const res = await fetch(
      `${API_BASE}/history?session_id=${encodeURIComponent(sessionId)}`
    );

    const data = await res.json();
    setHistory(data.history);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        DealScout — Price Comparison
      </h1>

      {/* SEARCH SECTION */}
      <div className="max-w-xl mx-auto bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <h2 className="text-lg font-semibold mb-3">Search for the best price</h2>

        {/* IMAGE UPLOAD */}
        <label className="text-sm font-medium">Upload an image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 mb-2 w-full bg-slate-800 p-2 rounded-lg"
        />
        <button
          onClick={handleSearchImage}
          disabled={!file || loading}
          className="w-full bg-emerald-500 text-slate-900 font-semibold py-2 rounded-lg hover:bg-emerald-400 mb-4"
        >
          Search by Image
        </button>

        <div className="border-t border-slate-700 my-3" />

        {/* LINK INPUT */}
        <label className="text-sm font-medium">Paste product link</label>
        <input
          type="text"
          placeholder="https://amazon.in/..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="mt-1 mb-2 w-full bg-slate-800 p-2 rounded-lg"
        />
        <button
          onClick={handleSearchLink}
          disabled={!link.trim() || loading}
          className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-400"
        >
          Search by Link
        </button>

        {loading && (
          <p className="text-center text-sm text-slate-400 mt-2">
            Searching...
          </p>
        )}
      </div>

      {/* RESULTS */}
      {results && (
        <div className="mt-10 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>

          {results.results.map((prod) => (
            <div
              key={prod.product_id}
              className="bg-slate-900 p-4 rounded-2xl mb-4 border border-slate-700"
            >
              <div className="flex gap-4">

                {/* Image */}
                <img
                  src={prod.image_url}
                  alt={prod.title}
                  className="w-28 h-28 object-cover rounded-xl border border-slate-600"
                />

                {/* Info */}
                <div>
                  <h3 className="text-lg font-semibold">{prod.title}</h3>

                  <p className="text-sm text-slate-300 mt-1">
                    Lowest price:{" "}
                    <span className="text-emerald-400 font-semibold">
                      ₹{prod.lowest_price}
                    </span>
                  </p>

                  <p className="text-sm text-slate-300">
                    Highest price: ₹{prod.highest_price}
                  </p>

                  <p className="text-sm text-indigo-300 font-semibold">
                    Best on: {prod.best_platform}
                  </p>
                </div>
              </div>

              {/* OFFERS TABLE */}
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="text-slate-400">
                    <th className="text-left">Platform</th>
                    <th className="text-left">Price</th>
                    <th className="text-left">Buy</th>
                  </tr>
                </thead>

                <tbody>
                  {prod.offers.map((o, idx) => (
                    <tr key={idx} className="border-t border-slate-800">
                      <td className="py-2">{o.platform}</td>
                      <td className="py-2">₹{o.price}</td>
                      <td className="py-2">
                        <a
                          href={o.url}
                          target="_blank"
                          className="px-3 py-1 bg-slate-100 text-slate-900 rounded-lg font-semibold text-xs hover:bg-emerald-300"
                        >
                          Buy
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* HISTORY */}
      <div className="max-w-xl mx-auto mt-10">
        <h2 className="text-xl font-bold mb-3">Session History</h2>

        {history.length === 0 && (
          <p className="text-slate-400 text-sm">No history yet</p>
        )}

        <ul className="space-y-2">
          {history.map((h, idx) => (
            <li
              key={idx}
              className="bg-slate-900 p-3 rounded-xl border border-slate-700"
            >
              <p className="font-semibold">{h.first_product_title}</p>
              <p className="text-xs text-slate-400">
                Type: {h.type} {h.url && <>• {h.url}</>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
