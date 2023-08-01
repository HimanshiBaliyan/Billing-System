const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");
const api = process.env.API_URL;

const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

//Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewURLParser: true,
    useUnifiedTopology: true,
    dbName: "billingsysDB",
  })
  .then(() => {
    console.log("Database connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log(api);
  console.log("server is running http://localhost:3000");
});
