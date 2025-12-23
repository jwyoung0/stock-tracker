// Load the Express library
const express = require("express");

// Create an Express application instance
const app = express();

// Define the port to listen on
// 3000 is conventional for development
const PORT = 3000;

// ---------------------------
// ROUTES
// ---------------------------

// Define a route for the homepage "/"
// This responds to GET requests only
// req = request object (contains data from client)
// res = response object (used to send data back)
app.get("/", (req, res) => {
  // Send a simple text response
  res.send("Server is running");
});


// Simple API health check endpoint
app.get("/api/health", (req, res) => {
  // Respond with JSON instead of plain text
  res.json({ status: "ok", timestamp: Date.now() });
});

// ---------------------------
// START SERVER
// ---------------------------

// Listen on the defined port
// The callback runs once the server successfully starts
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


