const express = require("express");

const routes = express.Router();

const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({ id: user._id, token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    res.status(200).json({ id: user._id, token, user });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

routes.post("/login", login);
routes.post("/signup", signup);

module.exports = routes;
