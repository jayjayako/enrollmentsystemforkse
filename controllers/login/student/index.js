var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");

const { userauth } = require("./userauth");
const { loginauth } = require("./inputvalidation");
const autologout = require("./autologout");

/////////////////////// for login page /////////////////////
router.use(loginauth, userauth, async (req, res, next) => {
  const { password } = req.body;
  var results = res.locals.results;
  if (
    results &&
    results != "none" &&
    (await bcrypt.compare(password, results.password))
  ) {
    console.log("Success Login");
    req.session.authenticated = true;
    req.session.userid = results.id;
    req.session.lastname = results.lastname;
    req.session.firstname = results.firstname;
    res.locals.status = "success";
    next();
  } else {
    res.locals.status = "invalid";
    next();
  }
});

router.use(autologout);

router.post((req, res) => {
  if (res.locals.status == "success") {
    console.log("Success Login");
    res.send(JSON.stringify([{ status: "success" }]));
    res.end();
  } else {
    res.send(JSON.stringify([{ status: "invalid" }]));
    res.end();
  }
});
//////////////////////////////////////////////////////////////

module.exports = router;
