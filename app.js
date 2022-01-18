const express = require("express");
const app = express();

// Middleware inorder to use json
const cors = require("cors");

app.use(cors());
app.use(express.json());

const transaction = require("./models/Transaction.js");

app.get("/", (req, res) => {
	res.send("welcome to The Transaction Back");
});

module.exports = app;
