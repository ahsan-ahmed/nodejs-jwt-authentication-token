const express = require("express");
const router = express.Router();
const UserAuth = require("../../../models/userAuth");
const bcrypt = require("bcryptjs");
const utils = require("./../../../utils/jwtToken");

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //   Find user by email
  UserAuth.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Sign token
        const token = utils.generateToken(user);

        // user = utils.getCleanUser(user);
        res.send({
          success: true,
          token: "Bearer " + token
          // user
        });
      } else {
        return res.status(400).json({
          message: "Password incorrect"
        });
      }
    });
  });
});
module.exports = router;
