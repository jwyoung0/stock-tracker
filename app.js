// ---------------------------
// IMPORTS / SETUP
// ---------------------------

// Load the Express library
const express = require("express");

// Create an Express application instance
// This represents your web server
const app = express();

// Define the port to listen on
// 3000 is conventional for development
const PORT = 3000

// Middleware to parse JSON bodies from incoming requests
// (Useful when you later accept POST requests)
app.use(express.json());

// ---------------------------
// ROUTES
// ---------------------------

// Homepage route
// Responds to GET requests at "/"
app.get("/", (req, res) => {
  res.send("Server is running");
});

// API health check route
// Responds to GET requests at "/api/health"
// Returns JSON so clients (like your frontend) can check server status
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: Date.now()
  });
});

// ---------------------------
// START SERVER
// ---------------------------

// Listen on the defined port
// Callback runs once server successfully starts
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// ---------------------------
// NOTES
// ---------------------------
// Mental model for beginners:
// 1. Program starts
// 2. Routes registered (GET /, GET /api/health)
// 3. Server listens on PORT
// 4. Waits for incoming requests
// 5. Executes matching route handler
// 6. Sends response and waits for next request
