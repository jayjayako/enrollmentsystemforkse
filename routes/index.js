var express = require("express");
var router = express.Router();

var auth = require("./auth");
// var register = require("./register");
var users = require("./users");

router.use("/auth", auth);
// router.use("/register", register);
router.use("/users", users);

module.exports = router;
