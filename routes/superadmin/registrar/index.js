var express = require("express");
var router = express.Router();

var enrollmentschedule = require("./enrollmentschedule");
var admission = require("./admission");
var enrollmentreservation = require("./enrollmentreservation");
var schoollevel = require("./schoollevel");
var yearlevel = require("./yearlevel");
var section = require("./section");
var schoolschedule = require("./schoolschedule");
var studentmaxnum = require("./studentmaxnum");
var sendmessage = require("./sendmessage");

router.use("/enrollmentschedule", enrollmentschedule);
router.use("/admission", admission);
router.use("/enrollmentreservation", enrollmentreservation);
router.use("/schoollevel", schoollevel);
router.use("/yearlevel", yearlevel);
router.use("/section", section);
router.use("/schoolschedule", schoolschedule);
router.use("/studentmaxnum", studentmaxnum);
router.use("/sendmessage", sendmessage);

module.exports = router;
