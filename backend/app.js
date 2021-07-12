const express = require("express");
const app = express();
const errorMiddleware = require("./middlerwares/errors");

app.use(express.json());

// Import all the routes
const products = require("./routes/product");

app.use("/api/v1", products);

//Middle ware to handle errors
app.use(errorMiddleware);

module.exports = app;
