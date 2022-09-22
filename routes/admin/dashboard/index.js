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
        adminmodule: res.locals.adminmodule,
      },
    ])
  );
  res.end();
});
//////////////////////////////////////////////////////////////////
//////////////////////// admin activity log //////////////////////
router.get("/displayadminactivitylog", (req, res) => {
  try {
    let sql = "SELECT * FROM activity_log WHERE usertype=? AND id=?";
    db.query(sql, ["admin", req.query.id], (err, results, fields) => {
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
////////////////////////// get student status ////////////////////////////
router.get("/getstats", dashboarddata, (req, res) => {
  console.log("displaying statistics");
  res.send(
    JSON.stringify([
      {
        id: "valid",
        schoollevelstats: res.locals.schoollevelstats,
        yearlevelstats: res.locals.yearlevelstats,
        sectionstats: res.locals.sectionstats,
        numsection: res.locals.numsection,
      },
    ])
  );
  res.end();
});
//////////////////////////////////////////////////////////////////
///////////////////////// get staff status ///////////////////////////////
router.get("/getstaffstats", dashboarddata, (req, res) => {
  console.log("displaying statistics");
  res.send(
    JSON.stringify([
      {
        id: "valid",
        registrarstats: res.locals.registrarstats,
        accountingstats: res.locals.accountingstats,
        cashierstats: res.locals.cashierstats,
        admindeptstats: res.locals.admindeptstats,
      },
    ])
  );
  res.end();
});
//////////////////////////////////////////////////////////////////////////

module.exports = router;
