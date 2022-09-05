const path = require("path");
const express = require("express");
const app = express();
const db = require("./db/models");
const helmetConfig = require("./middlewares/helmet");
const validateSource = require("./middlewares/source");
const limiter = require("./middlewares/rateLimiter");
const cors = require("cors");
const corp = require("./middlewares/corp");
const productsRoute = require("./routes/productsRoutes");
const checkoutRoute = require("./routes/orderRoutes");
const contactsRoute = require("./routes/contactRoutes");
const noRoutesHandler = require("./middlewares/noRoutes");
const apiErrorHandler = require("./middlewares/error");
const { logger, errLogger } = require("./lib/logger");
const backup = require("./jobs/backup");
require("dotenv").config();

console.clear();
app.use(helmetConfig); // only works over https, so only during production
app.use(validateSource);
app.use(limiter);
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
backup.start();

module.exports = app;
