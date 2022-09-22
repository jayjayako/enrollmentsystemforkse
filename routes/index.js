var express = require("express");
var router = express.Router();

const auth = require("./authentication/modulelibrary/getsession");

/////////////// add new router here if you want to add new user//////////
var authentication = require("./authentication");
var superadmin = require("./superadmin");
var admin = require("./admin");
var staff = require("./staff");
// var student = require("./student");
var studentwebbackend = require("./studentwebbackend");

var resetpassword = require("./resetpassword");
// var updateyearspan = require("./updateyearspan");

router.use("/authentication", authentication);
router.use("/superadmin", auth, superadmin);
router.use("/admin", auth, admin);
router.use("/staff", auth, staff);
// router.use("/student", student);
router.use("/studentwebbackend", studentwebbackend);

router.use("/resetpassword", resetpassword);
// router.use("/updateyearspan", updateyearspan);

module.exports = router;
