const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const app = express();

const userLogin = require("./routes/userAuth/userLogin");
const userSignup = require("./routes/userAuth/userSignup");
const getUserToken = require("./routes/userAuth/getToken");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport/passport")(passport);

// Routes
app.use("/", userLogin);
app.use("/", userSignup);
app.use("/", getUserToken);


// app.use(express.static(path.join(__dirname, "build")));
// //production mode
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "build")));
//   app.get("/", (req, res) => {
//     res.sendfile(path.join((__dirname = "build/index.html")));
//   });
// }
// //build mode
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/index.html"));
// });
// Passport middleware
// Passport config
// Routes
app.get("/get", (req, res) => {
  res.send({ name: "helloworld" });
});

// process.env.port is Heroku's port if you choose to deploy the app there
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
