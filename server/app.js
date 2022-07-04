const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const productsRoute = require("./routes/products");
const checkoutRoute = require("./routes/order");
const contactsRoute = require("./routes/contact");

const apiErrorHandler = require("./middlewares/error");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/products", productsRoute);
app.use("/order", checkoutRoute);
app.use("/contact", contactsRoute);

app.use(apiErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// possibly the model needs have the belongsto for both product and category id's
// possibly the references must also be placed in the item model
// as attribute
// foreignkey arribute
//
