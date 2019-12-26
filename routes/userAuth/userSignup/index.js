const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const utils = require("./../../../utils/jwtToken");
// Load User model
const UserAuth = require("../../../models/userAuth");

router.post("/signup", (req, res) => {

  UserAuth.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new UserAuth({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) res.send(err);

          const token = utils.generateToken(newUser);
          // console.log(utils.generateToken(newUser),"--->");
          newUser.password = hash;
          newUser
            .save()
            .then(user =>
              res.json({
                user: user,
                token: token
              })
            )
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
