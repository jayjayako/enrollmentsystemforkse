const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const cors = require("cors");

router.use(cors());

var db = require("../modulelibrary/databaseconn");
var dashboarddata = require("./dashboarddata");

/////////////////////////// admin dashboard //////////////////////
router.get("/getaccount", dashboarddata, (req, res) => {
  console.log(
    "displaying account",
    "this is dashboard " + res.locals.currentid
  );
  res.send(
    JSON.stringify([
      {
        id: "valid",
        name: res.locals.dashboardaccount,
        picture: res.locals.dashboardaccountpic,
        position: res.locals.dashboardposition,
        email: res.locals.dashboardemail,
      },
    ])
  );
  res.end();
});
//////////////////////////////////////////////////////////////////
//////////////////////// admin activity log //////////////////////
router.get("/displaystaffactivitylog", (req, res) => {
  try {
    let sql = "SELECT * FROM activity_log WHERE usertype=? AND id=?";
    db.query(sql, ["staff", req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify(results));
        res.end();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
});
//////////////////////////////////////////////////////////////////

module.exports = router;
