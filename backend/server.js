const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Handle Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down server due to uncaught exception`);
  process.exit(1);
});

// setting up config file
dotenv.config({ path: "backend/config/config.env" });

// Connection to Data Base
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

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

// Handle Unhandled Promise rejection
process.on("unhandeledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down Server duet to unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
