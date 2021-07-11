const Product = require("../models/product");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const product = require("../data/product.json");

// Setting dotenv file
dotenv.config({ path: "backend/config/config.env" });

// Firstly connect to the DB
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to the Database!!");
  })
  .catch((err) => console.log(`Data base connection error : ${err}`));

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Delete Product");
    await Product.insertMany(product);
    console.log("Inserted product");
    process.exit();
  } catch (e) {
    console.log(e.message);
    process.exit();
  }
};

seedProducts();
