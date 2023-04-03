const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const helper = require("../helper/helper");

router.post("/signUp", (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  var userName = helper.generateUsername(email);

  User.findOne({ email: email }).then(async (savedUser) => {
    // console.log(savedUser);
    if (savedUser) {
      return res.status(422).send({ error: "User already exists" });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      userName,
      password,
      confirmPassword,
    });

    try {
      await user.save();
      res.send({ message: "User saved successfully" });
    } catch (err) {
      return res.status(422).send({ error: err.message });
    }
  });
});

router.get("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email, password: password }).then(async (savedUser) => {
    // console.log(savedUser);

    try {
      if (savedUser) {
        res.send(savedUser);
      } else {
        return res.status(422).send({ error: "Invalid credentials !!" });
      }
    } catch (err) {
      return res.status(422).send({ error: err.message });
    }
  });
});

router.get("/getAllUsernames", (req, res) => {
  User.find({}, { userName: 1, firstName: 1, lastName: 1 }).then(
    async (users) => {
      // console.log(savedUser);

      try {
        if (users) {
          res.send(users);
        } else {
          return res.status(422).send({ error: "There's no data !!" });
        }
      } catch (err) {
        return res.status(422).send({ error: err.message });
      }
    }
  );
});

module.exports = router;
