const express = require("express");

const routes = express.Router();

routes.post("/trade", async (req, res) => {
  const data = req.body;
  console.log(data);
  res.json({});
});

module.exports = routes;
