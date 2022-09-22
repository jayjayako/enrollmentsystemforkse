var express = require("express");
var router = express.Router();

const getposition = require("../modulelibrary/getposition");
const { checkposition } = require("./checkifaccounting");

var otherfees = require("./otherfees");
var paymentplans = require("./paymentplans");
var paymentplanamount = require("./paymentplanamount");

router.use(getposition, checkposition);
router.use("/otherfees", otherfees);
router.use("/paymentplans", paymentplans);
router.use("/paymentplanamount", paymentplanamount);
////////////// check module ///////////////
var checkmodule = require("./checkmodule");
router.use("/checkmodule", checkmodule);
///////////////////////////////////////////

module.exports = router;
