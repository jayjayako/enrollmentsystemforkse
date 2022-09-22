const express = require("express");
//////////////////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const cors = require("cors");

router.use(cors());

var db = require("./databaseconn");

router.use((req, res, next) => {
  try {
    var email = req.body.email;
    let sql = "SELECT id FROM admin_info WHERE email = ? AND id != ?";
    db.query(sql, [email, res.locals.currentid], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.emailauthstats = "invalid";
        next();
      } else {
        res.locals.emailauthstats = "valid";
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
});

router.use((req, res, next) => {
  try {
    var email = req.body.email;
    let sql = "SELECT id FROM staff_info WHERE email = ?";
    db.query(sql, [email], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.emailauthstats = "invalid";
        next();
      } else {
        res.locals.emailauthstats = "valid";
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
});

module.exports = router;
