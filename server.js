const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
app.use(cors());
app.use(morgan("dev"));

const bookRouter = require('./router/bookRouter')
const libraryRouter = require('./router/libraryRouter')
const userRouter = require('./router/userRouter')

const url = process.env.DATABASE_URL;
const port = process.env.port || 2025;

app.use('/api/v1', bookRouter)
app.use('/api/v1',libraryRouter)
app.use('api/v1', userRouter)

app.get("/", (req, res) => {
  res.send("Welcome to Book shop");
});

mongoose
  .connect(url)
  .then(() => {
    console.log("MongooseDB connected");
    app.listen(port, () => {
      console.log("App listening on " + port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });