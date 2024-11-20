const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

userSchema.statics.signup = async function (email, password) {
  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw Error("User  Already Exists");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
      email,
      password: hashedPassword,
    });

    return user;
  }
};

userSchema.statics.login = async function (email, password) {
  const existingUser = await this.findOne({
    email,
  });

  if (!existingUser) {
    throw Error("user does not exist");
  }

  const match = await bcrypt.compare(password, existingUser.password);

  if (match) {
    return existingUser;
  } else {
    throw Error("Check Password and Try Again");
  }
};

module.exports = mongoose.model("user", userSchema);
