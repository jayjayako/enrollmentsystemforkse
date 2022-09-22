var express = require("express");
var router = express.Router();

var otherfees = require("./otherfees");
var paymentplans = require("./paymentplans");
var paymentplanamount = require("./paymentplanamount");

router.use("/otherfees", otherfees);
router.use("/paymentplans", paymentplans);
router.use("/paymentplanamount", paymentplanamount);

module.exports = router;
