// ---------------------------
// IMPORTS / SETUP
// ---------------------------
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const axios = require("axios");
require("dotenv").config(); // load .env variables

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// ---------------------------
// DATABASE SETUP
// ---------------------------
const db = new sqlite3.Database(
  path.join(__dirname, "database.db"),
  (err) => {
    if (err) console.error("Error opening database:", err.message);
    else console.log("Connected to SQLite database.");
  }
);

db.run(`
  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    shares REAL NOT NULL,
    price REAL NOT NULL,
    date TEXT NOT NULL
  )
`);

// ---------------------------
// ROUTES
// ---------------------------
app.get("/", (req, res) => res.send("Server is running"));
app.get("/api/health", (req, res) => res.json({ status: "ok", timestamp: Date.now() }));

// ---------------------------
// HELPERS
// ---------------------------
function validatePurchase({ ticker, shares, price, date }) {
  if (!ticker || shares === undefined || price === undefined || !date)
    return "Missing required fields";
  if (Number(shares) <= 0 || Number(price) <= 0)
    return "Shares and price must be positive numbers";
  return null;
}

// ---------------------------
// CRUD: PURCHASES
// ---------------------------
app.post("/api/purchases", (req, res) => {
  const { ticker, shares, price, date } = req.body;
  const error = validatePurchase(req.body);
  if (error) return res.status(400).json({ error });

  const stmt = db.prepare(
    `INSERT INTO purchases (ticker, shares, price, date) VALUES (?, ?, ?, ?)`
  );
  stmt.run(Number(shares), Number(shares), Number(price), date, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: "Purchase recorded",
      purchase: {
        id: this.lastID,
        ticker,
        shares: Number(shares),
        price: Number(price),
        date,
      },
    });
  });
  stmt.finalize();
});

app.get("/api/purchases", (req, res) => {
  db.all("SELECT * FROM purchases", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/api/purchases/:id", (req, res) => {
  db.get(
    "SELECT * FROM purchases WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Purchase not found" });
      res.json(row);
    }
  );
});

app.put("/api/purchases/:id", (req, res) => {
  const { ticker, shares, price, date } = req.body;
  const error = validatePurchase(req.body);
  if (error) return res.status(400).json({ error });

  const stmt = db.prepare(
    "UPDATE purchases SET ticker = ?, shares = ?, price = ?, date = ? WHERE id = ?"
  );
  stmt.run(ticker, Number(shares), Number(price), date, req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Purchase not found" });
    res.json({
      message: "Purchase updated",
      purchase: {
        id: Number(req.params.id),
        ticker,
        shares: Number(shares),
        price: Number(price),
        date,
      },
    });
  });
  stmt.finalize();
});

app.delete("/api/purchases/:id", (req, res) => {
  const stmt = db.prepare("DELETE FROM purchases WHERE id = ?");
  stmt.run(req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Purchase not found" });
    res.json({ message: "Purchase deleted", id: Number(req.params.id) });
  });
  stmt.finalize();
});

// ---------------------------
// PORTFOLIO SUMMARY (with live prices fallback)
// ---------------------------
app.get("/api/portfolio/summary", async (req, res) => {
  db.all("SELECT * FROM purchases", [], async (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    // Group purchases by ticker
    const holdingsMap = {};
    rows.forEach((p) => {
      if (!holdingsMap[p.ticker]) {
        holdingsMap[p.ticker] = { shares: 0, totalCost: 0, lastPrice: p.price };
      }
      holdingsMap[p.ticker].shares += p.shares;
      holdingsMap[p.ticker].totalCost += p.shares * p.price;
      holdingsMap[p.ticker].lastPrice = p.price; // fallback
    });

    const tickers = Object.keys(holdingsMap);
    const prices = {};
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

    if (apiKey) {
      for (let ticker of tickers) {
        try {
          const response = await axios.get("https://www.alphavantage.co/query", {
            params: { function: "GLOBAL_QUOTE", symbol: ticker, apikey: apiKey },
          });
          const quote = response.data["Global Quote"];
          prices[ticker] = parseFloat(quote["05. price"]) || holdingsMap[ticker].lastPrice;
        } catch (err) {
          console.error(`Error fetching price for ${ticker}:`, err.message);
          prices[ticker] = holdingsMap[ticker].lastPrice;
        }
      }
    } else {
      tickers.forEach((t) => (prices[t] = holdingsMap[t].lastPrice));
    }

    // Build holdings array
    const holdings = tickers.map((ticker) => {
      const { shares, totalCost } = holdingsMap[ticker];
      const avgPrice = totalCost / shares;
      const currentPrice = prices[ticker];
      const unrealizedPL = (currentPrice - avgPrice) * shares;
      return { ticker, shares, averagePrice: avgPrice, totalCost, currentPrice, unrealizedPL };
    });

    const totalInvested = rows.reduce((sum, p) => sum + p.shares * p.price, 0);

    res.json({ totalInvested, holdings });
  });
});

// ---------------------------
// START SERVER
// ---------------------------
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
