const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const db = require("./models");
const helmet = require("helmet");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const productsRoute = require("./routes/products");
const checkoutRoute = require("./routes/order");
const contactsRoute = require("./routes/contact");

const apiErrorHandler = require("./middlewares/error");

// only works over https, so only during production
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/products", productsRoute);
app.use("/order", checkoutRoute);
app.use("/contact", contactsRoute);

app.use(apiErrorHandler);

db.sequelize.sync().then(() => {
  console.log("Database synced.");
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
});

// search terms
// how to pass errors between react, express and sequelize
// error flow from sequelize to express
// how to construct http responses for express
// how to build a production ready express api
