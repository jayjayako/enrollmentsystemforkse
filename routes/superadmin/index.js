var express = require("express");
var router = express.Router();

var dashboard = require("./dashboard");
var addnewadmin = require("./addnewadmin");
var addnewstaff = require("./addnewstaff");
var audittrail = require("./audittrail");
var managestudent = require("./managestudent");
var manageuseraccess = require("./manageuseraccess");
var registrar = require("./registrar");
var accounting = require("./accounting");
var cashier = require("./cashier");
var admindepartment = require("./admindepartment");
var accountprofile = require("./accountprofile");
var myfiles = require("./myfiles");
var accessfiles = require("./accessfiles");
var audittrailfiles = require("./audittrailfiles");
var viewreport = require("./viewreport");

router.use("/dashboard", dashboard);
router.use("/addnewadmin", addnewadmin);
router.use("/addnewstaff", addnewstaff);
router.use("/audittrail", audittrail);
router.use("/managestudent", managestudent);
router.use("/manageuseraccess", manageuseraccess);
router.use("/registrar", registrar);
router.use("/accounting", accounting);
router.use("/cashier", cashier);
router.use("/admindepartment", admindepartment);
router.use("/accountprofile", accountprofile);
router.use("/myfiles", myfiles);
router.use("/accessfiles", accessfiles);
router.use("/audittrailfiles", audittrailfiles);
router.use("/viewreport", viewreport);

module.exports = router;
