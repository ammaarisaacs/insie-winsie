const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const db = require("./db/models");
const helmet = require("helmet");
const corp = require("./middlewares/corp");
const productsRoute = require("./routes/productsRoutes");
const checkoutRoute = require("./routes/orderRoutes");
const contactsRoute = require("./routes/contactRoutes");
const noRoutesHandler = require("./middlewares/noRoutes");
const apiErrorHandler = require("./middlewares/error");
require("dotenv").config();

console.clear();

const PORT = process.env.PORT || 5000;

const helmetConfig = helmet({
  crossOriginEmbedderPolicy: false,
});

// only works over https, so only during production
app.use(helmetConfig);
app.use(corp);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
