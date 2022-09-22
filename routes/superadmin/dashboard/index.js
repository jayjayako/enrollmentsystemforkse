const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const cors = require("cors");

router.use(cors());

//var db = require("../modulelibrary/databaseconn");
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
      },
    ])
  );
  res.end();
});

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

module.exports = router;
