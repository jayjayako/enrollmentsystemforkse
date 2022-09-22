const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const cors = require("cors");

router.use(cors());

var db = require("../modulelibrary/databaseconn");

/////////////////////////// admin dashboard //////////////////////
router.use((req, res, next) => {
  try {
    let sql = "SELECT lastname, firstname FROM staff_tbl WHERE id = ?";
    db.query(sql, [res.locals.currentid], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.dashboardaccount = results;
        next();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
});

router.use((req, res, next) => {
  try {
    let sql = "SELECT picture,position,email FROM staff_info WHERE id = ?";
    db.query(sql, [res.locals.currentid], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.dashboardaccountpic = results[0].picture;
        res.locals.dashboardposition = results[0].position;
        res.locals.dashboardemail = results[0].email;
      }
      next();
    });
  } catch (error) {
    console.log("An error has occured");
  }
});
//////////////////////////////////////////////////////////////////

module.exports = router;
