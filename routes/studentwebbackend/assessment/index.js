var express = require("express");
var router = express.Router();

var schoolandyearlevel = require("./schoolandyearlevel");
var assessmentfees = require("./assessmentfees");

router.use("/schoolandyearlevel", schoolandyearlevel);
router.use("/assessmentfees", assessmentfees);

module.exports = router;
