const path = require("path");
const express = require("express");
const app = express();
const db = require("./db/models");
const helmetConfig = require("./middlewares/helmet");
const validateSource = require("./middlewares/source");
const cors = require("cors");
const corp = require("./middlewares/corp");
const productsRoute = require("./routes/productsRoutes");
const checkoutRoute = require("./routes/orderRoutes");
const contactsRoute = require("./routes/contactRoutes");
const noRoutesHandler = require("./middlewares/noRoutes");
const apiErrorHandler = require("./middlewares/error");
const logger = require("./lib/logger");
const { info } = require("console");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

console.clear();

app.use(helmetConfig); // only works over https, so only during production
// app.use(validateSource);
app.use(corp);
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.urlencoded({ extended: true, limit: "5kb" }));
app.use(express.json({ limit: "5kb" }));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  const { ip, headers, hostname, method } = req;
  const ua = headers["user-agent"];
  logger.log({ level: "info", message: `${method} ${ip} ${hostname} ${ua}` });
  next();
});
app.use("/products", productsRoute);
app.use("/order", checkoutRoute);
app.use("/contact", contactsRoute);
app.use(noRoutesHandler);
app.use(apiErrorHandler);

db.sequelize.sync().then(() => {
  logger.log({ level: "info", message: "Database Synced" });
  app.listen(PORT, (err) => {
    if (err) console.log(err);
    logger.log({
      level: "info",
      message: `Server listening on port: ${PORT}`,
    });
  });
});
