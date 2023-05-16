var express = require("express");
var router = express.Router();

var student = require("../../controllers/register/student");

router.use("/student", student);

module.exports = router;
