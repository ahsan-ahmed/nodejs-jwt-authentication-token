const express = require("express");
const router = express.Router();
const keys = require("../../../config/keys");
const UserAuth = require("../../../models/userAuth");
const jwt = require("jsonwebtoken");
//get current user from token
router.get("/me/from/token", function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(401).json({ message: "Must pass token" });
  }

  // Check token that was passed by decoding token using secret
  jwt.verify(token, keys.secretOrKey, function(err, user) {
    if (err) res.status(404).json({ token: "token invalid" });
    //return user using the id from w/in JWTToken
    UserAuth.findById(
      {
        _id: user._id
      },
      function(err, user) {
        if (err) res.send(err);
        console.log(user, "-->");

        // user = utils.getCleanUser(user);
        //Note: you can renew token by creating new token(i.e.
        //refresh it)w/ new expiration time at this point, but I’m
        //passing the old token back.
        // var token = utils.generateToken(user);
        res.json({
          user: user,
          token: token
        });
      }
    );
  });
});
module.exports = router;
