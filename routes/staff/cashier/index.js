var express = require("express");
var router = express.Router();

const getposition = require("../modulelibrary/getposition");
const { checkposition } = require("./checkifcashier");

var verifypayment = require("./verifypayment");
var editpaymentmethod = require("./editpaymentmethod");
var viewstudentbalance = require("./viewstudentbalance");
var sendmessage = require("./sendmessage");

router.use(getposition, checkposition);
router.use("/verifypayment", verifypayment);
router.use("/editpaymentmethod", editpaymentmethod);
router.use("/viewstudentbalance", viewstudentbalance);
router.use("/sendmessage", sendmessage);
////////////// check module ///////////////
var checkmodule = require("./checkmodule");
router.use("/checkmodule", checkmodule);
///////////////////////////////////////////

module.exports = router;
