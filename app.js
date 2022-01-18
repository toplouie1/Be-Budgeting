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

// creating a post adding a data at the end
app.post("/transaction", (req, res) => {
	transaction.push(req.body);
	res.json(transaction[transaction.length - 1]);
});

// to delete something from a perticular index
app.delete("/transaction/:index", (req, res) => {
	const { index } = req.params;
	res.json(transaction.splice(index, 1));
});

// to edit something from your list
app.put("/transaction/:index", (req, res) => {
	const { index } = req.params;
	// guard clause
	if (!transaction[index]) {
		res.status(422).json({ error: "Not found" });
		return;
	}
	// we are destructuring the req that is coming ..
	const { date, name, amount, from } = req.body;
	if (date && name && from && amount) {
		transaction[index] = {
			date,
			name,
			amount,
			from,
		};
		res.json(transaction[index]);
	} else {
		res.status(422).json({
			error: "Invalid inputs",
		});
	}
});

module.exports = app;
