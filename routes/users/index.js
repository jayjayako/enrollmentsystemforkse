var express = require("express");
var router = express.Router();

var superadmin = require("../../controllers/superadmin");

router.use("/superadmin", superadmin);

module.exports = router;
