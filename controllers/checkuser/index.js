var express = require("express");
var router = express.Router();

var auth = require("../modulelibrary/authsession");

router.use(auth, (req, res) => {
  if (res.locals.status == "loggedin") {
    res.json({ status: "loggedin", position: req.session.position });
  } else {
    res.json({ status: "invalid" });
  }
});

module.exports = router;
