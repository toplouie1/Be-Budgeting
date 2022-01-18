const express = require("express");
const app = express();

// Middleware inorder to use json
const cors = require("cors");

app.use(cors());
app.use(express.json());

const transaction = require("./models/Transaction.js");

// The Home page
app.get("/", (req, res) => {
	res.send("welcome to The Transaction Back");
});

// The transaction Page
app.get("/transaction", (req, res) => {
	res.send(transaction);
});

// sending the preticular index
app.get("/transaction/:index", (req, res) => {
	const { index } = req.params;
	transaction[index] ? res.send(transaction[index]) : res.redirect(404);
});

module.exports = app;
