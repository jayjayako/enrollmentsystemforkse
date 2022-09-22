var express = require("express");
var router = express.Router();

var verifypayment = require("./verifypayment");
var editpaymentmethod = require("./editpaymentmethod");
var viewstudentbalance = require("./viewstudentbalance");
var sendmessage = require("./sendmessage");

router.use("/verifypayment", verifypayment);
router.use("/editpaymentmethod", editpaymentmethod);
router.use("/viewstudentbalance", viewstudentbalance);
router.use("/sendmessage", sendmessage);

module.exports = router;
