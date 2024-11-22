const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { createServer } = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const userAuthRoutes = require("./routes/user.routes");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors({}));
app.use(express.json());

app.use(userAuthRoutes);

app.get("/", async (req, res) => {
  res.send("hello");
});

const port = process.env.PORT;

const mongodb_uri = process.env.MONGODB_URI;

io.on("connection", (socket) => {
  console.log("Connection successful");
});

app.post("/trade", async (req, res) => {
  const data = req.body;

  console.log(req);
  console.log(data);

  io.emit("tradingview-data", data);

  res.json({});
});

mongoose.connect(mongodb_uri).then(() => {
  httpServer.listen(port);
  console.log("Listening at port " + port);
});
