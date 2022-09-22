var express = require("express");
var router = express.Router();

var dashboard = require("./dashboard");
var registrar = require("./registrar");
var accounting = require("./accounting");
var cashier = require("./cashier");
var admindepartment = require("./admindepartment");
var accountprofile = require("./accountprofile");
var myfiles = require("./myfiles");
var accessfiles = require("./accessfiles");

router.use("/dashboard", dashboard);
router.use("/registrar", registrar);
router.use("/accounting", accounting);
router.use("/cashier", cashier);
router.use("/admindepartment", admindepartment);
router.use("/accountprofile", accountprofile);
router.use("/myfiles", myfiles);
router.use("/accessfiles", accessfiles);

module.exports = router;
