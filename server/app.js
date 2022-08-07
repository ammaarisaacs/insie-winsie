const express = require("express");
const app = express();
const db = require("./db/models");
const cors = require("cors");
const path = require("path");
const helmetConfig = require("./middlewares/helmet");
const corp = require("./middlewares/corp");
const productsRoute = require("./routes/productsRoutes");
const checkoutRoute = require("./routes/orderRoutes");
const contactsRoute = require("./routes/contactRoutes");
const noRoutesHandler = require("./middlewares/noRoutes");
const apiErrorHandler = require("./middlewares/error");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

console.clear();

app.use(helmetConfig); // only works over https, so only during production
app.use(corp);
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.urlencoded({ extended: true, limit: "5kb" }));
app.use(express.json({ limit: "5kb" }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/products", productsRoute);
app.use("/order", checkoutRoute);
app.use("/contact", contactsRoute);
app.use(noRoutesHandler);
app.use(apiErrorHandler);

db.sequelize.sync().then(() => {
  console.log("Database synced.");
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
});
