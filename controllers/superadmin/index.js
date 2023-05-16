var express = require("express");
var router = express.Router();

var dashboard = require("./dashboard");
var myaccount = require("./myaccount");

var auth = require("../modulelibrary/authsession");

router.use(auth);

router.use((req, res, next) => {
  if (req.session.position == "superadmin" && res.locals.status == "loggedin") {
    next();
  } else {
    res.json({ status: "invalid" });
  }
});

router.use("/dashboard", dashboard);
router.use("/myaccount", myaccount);

module.exports = router;
