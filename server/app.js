const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./configs/db");

try {
  db.authenticate().then(() => {
    console.log("Databse connection has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

require("dotenv").config();

const productsRoute = require("./routes/products");
// const cartRoute = require("./routes/cart");
// const checkoutRoute = require("./routes/checkout");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/products", productsRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
