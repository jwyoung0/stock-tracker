// ---------------------------
// IMPORTS / SETUP
// ---------------------------
const express = require("express");
const sqlite3 = require("sqlite3").verbose(); // SQLite library
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Serve static files from the 'public' folder (your HTML form)
app.use(express.static('public'));

// ---------------------------
// DATABASE SETUP
// ---------------------------

// Create/connect to a SQLite database file
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

//Create purchases table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS purchases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticker TEXT NOT NULL,
        shares INTEGER NOT NULL,
        price REAL NOT NULL,
        date TEXT NOT NULL
    )    
`);

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

// ---------------------------
// CRUD ENDPOINTS
// ---------------------------

// POST /api/purchases
app.post("/api/purchases", (req, res) => {
  const { ticker, shares, price, date } = req.body;

  if (!ticker || !shares || !price || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const stmt = db.prepare(`
    INSERT INTO purchases (ticker, shares, price, date)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(ticker, shares, price, date, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Return the inserted purchase with its auto-generated ID
    res.status(201).json({
      message: "Purchase recorded",
      purchase: {
        id: this.lastID,
        ticker,
        shares,
        price,
        date
      }
    });
  });

  stmt.finalize();
});

// GET /api/purchases
app.get("/api/purchases", (req, res) => {
  db.all("SELECT * FROM purchases", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message }); 
    res.json(rows);
  });
});

// READ: Get one purchase by ID
app.get("/api/purchases/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM purchases WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Purchase not found" });
    res.json(row);
  });
});

// UPDATE: Edit a purchase by ID
app.put("/api/purchases/:id", (req, res) => {
  const id = req.params.id;
  const { ticker, shares, price, date } = req.body;
  if (!ticker || !shares || !price || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const stmt = db.prepare("UPDATE purchases SET ticker = ?, shares = ?, price = ?, date = ? WHERE id = ?");
  stmt.run(ticker, shares, price, date, id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Purchase not found" });
    res.json({ message: "Purchase updated", purchase: { id: Number(id), ticker, shares, price, date } });
  });
  stmt.finalize();
});

// DELETE: Remove a purchase by ID
app.delete("/api/purchases/:id", (req, res) => {
  const id = req.params.id;
  const stmt = db.prepare("DELETE FROM purchases WHERE id = ?");
  stmt.run(id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Purchase not found" });
    res.json({ message: "Purchase deleted", id: Number(id) });
  });
  stmt.finalize();
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

// - public/index.html allows browser-based POST testing