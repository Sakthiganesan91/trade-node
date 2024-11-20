const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userAuthRoutes = require("./routes/user.routes");
const webHookRoutes = require("./routes/webhook.routes");

const app = express();

app.use(cors({}));
app.use(express.json());

app.use(userAuthRoutes);
app.use(webHookRoutes);

app.get("/", async (req, res) => {
  res.send("hello");
});

const port = process.env.PORT;

const mongodb_uri = process.env.MONGODB_URI;
mongoose.connect(mongodb_uri).then(() => {
  app.listen(port);
  console.log("Listening at port " + port);
});
