var express = require("express");
var router = express.Router();

var dashboard = require("./dashboard");
var addnewstaff = require("./addnewstaff");
var managestaff = require("./managestaff");
var audittrail = require("./audittrail");
var managestudent = require("./managestudent");
var accountprofile = require("./accountprofile");
var myfiles = require("./myfiles");
var accessfiles = require("./accessfiles");
var audittrailfiles = require("./audittrailfiles");
var viewreport = require("./viewreport");

router.use("/dashboard", dashboard);
router.use("/addnewstaff", addnewstaff);
router.use("/managestaff", managestaff);
router.use("/audittrail", audittrail);
router.use("/managestudent", managestudent);
router.use("/accountprofile", accountprofile);
router.use("/myfiles", myfiles);
router.use("/accessfiles", accessfiles);
router.use("/audittrailfiles", audittrailfiles);
router.use("/viewreport", viewreport);

module.exports = router;
