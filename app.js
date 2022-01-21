const express = require("express");
const app = express();

// Middleware inorder to use json
const cors = require("cors");

app.use(cors());
app.use(express.json());

const transactions = require("./models/Transaction.js");

// The Home page
app.get("/", (req, res) => {
	res.send("welcome to The Transaction Back");
});

// All Transacrtion information
app.get("/transactions", (req, res) => {
	res.json(transactions);
});

// sending the preticular index
app.get("/transactions/:index", (req, res) => {
	const { index } = req.params;
	transactions[index] ? res.send(transactions[index]) : res.redirect(404);
});

// creating a post adding a data at the end
app.post("/transactions", (req, res) => {
	transactions.push(req.body);
	res.json(transactions[transactions.length - 1]);
});

// to delete something from a perticular index
app.delete("/transactions/:index", (req, res) => {
	const { index } = req.params;
	res.json(transactions.splice(index, 1));
});

// to edit something from your list
app.put("/transactions/:index", (req, res) => {
	const { index } = req.params;
	// guard clause
	if (!transactions[index]) {
		res.status(422).json({ error: "Not found" });
		return;
	}
	// we are destructuring the req that is coming ..
	const { date, name, amount, from } = req.body;
	if (date && name && from && amount) {
		transactions[index] = {
			date,
			name,
			amount,
			from,
		};
		res.json(transactions[index]);
	} else {
		res.status(422).json({
			error: "Invalid inputs",
		});
	}
});

module.exports = app;
