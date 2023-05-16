var express = require("express");
var router = express.Router();

/////////////////////// for authentication /////////////////////
router.use((req, res, next) => {
  if (req.session.authenticated == true) {
    res.locals.status = "loggedin";
    next();
  } else {
    res.locals.status = "loggedout";
    next();
  }
});

module.exports = router;
////////////////////////////////////////////////////////////////
