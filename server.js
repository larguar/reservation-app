// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const reservations = [];
const waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
	
	var newData = req.body;
	
	if (reservations.length >= 5) {
		// add to waitlist
		waitlist.push(newData);
		res.json(false);
	} else {
		// add to reservations
		reservations.push(newData);
		res.json(true);
	}

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
