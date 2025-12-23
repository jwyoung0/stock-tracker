// ---------------------------
// IMPORTS / SETUP
// ---------------------------
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Serve static files from the 'public' folder (your HTML form)
app.use(express.static('public'));

// ---------------------------
// TEMPORARY IN-MEMORY STORAGE
// ---------------------------
// This array stores purchases temporarily
// Later we will replace this with SQLite for persistence
let purchases = [];

// ---------------------------
// ROUTES
// ---------------------------

// Homepage route (optional since public/index.html exists)
app.get("/", (req, res) => {
  res.send("Server is running");
});

// API health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: Date.now()
  });
});

// POST /api/purchases
// Accepts JSON data for a stock purchase
// Example request body:
// {
//   "ticker": "AAPL",
//   "shares": 5,
//   "price": 150,
//   "date": "2025-12-23"
// }
app.post("/api/purchases", (req, res) => {
  const { ticker, shares, price, date } = req.body;

  // Minimal validation
  if (!ticker || !shares || !price || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Add to temporary storage
  const purchase = { id: purchases.length + 1, ticker, shares, price, date };
  purchases.push(purchase);

  // Return confirmation
  res.status(201).json({
    message: "Purchase recorded",
    purchase: purchase
  });
});

// GET /api/purchases
// Returns all stored purchases
app.get("/api/purchases", (req, res) => {
  res.json(purchases);
});

// ---------------------------
// START SERVER
// ---------------------------
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// ---------------------------
// NOTES
// ---------------------------
// - purchases[] must be defined before any routes that use it
// - public/index.html allows browser-based POST testing
// - Next step: integrate SQLite for persistent storage
