//Generate Token using secret from process.env.JWT_SECRET
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

function generateToken(user) {
  //1. Dont use password and other sensitive fields
  //2. Use fields that are useful in other parts of the
  //app/collections/models'

  var payload = {
    _id:user._id,
    username: user.username,
    email: user.email
  };
  return (token = jwt.sign(payload, keys.secretOrKey, {
    expiresIn: 10000 // expires in 24 hours
  }));
}
module.exports = { generateToken };
