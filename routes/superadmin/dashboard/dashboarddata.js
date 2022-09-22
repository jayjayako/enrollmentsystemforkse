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
    let sql = "SELECT lastname, firstname FROM superadmin_tbl WHERE id = ?";
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
    let sql = "SELECT picture FROM superadmin_info WHERE id = ?";
    db.query(sql, [res.locals.currentid], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.dashboardaccountpic = results;
      }
      next();
    });
  } catch (error) {
    console.log("An error has occured");
  }
});
//////////////////////////////////////////////////////////////////

function getschoollevel(req, res, next) {
  try {
    let sql = "SELECT schoollevelcol FROM school_level";
    db.query(sql, (err, results, fields) => {
      if (results.length > 0) {
        res.locals.schoollevel = results;
        next();
      } else {
        res.locals.schoollevel = "none";
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
}

function getnumofenrolledstudentsschoollevel(req, res, next) {
  try {
    let sql =
      "SELECT COUNT(*) AS totalschoollevelenrolled FROM masterlist_tbl WHERE schoollevelcol=? AND approval = ?;";
    db.query(
      sql,
      [req.query.schoollevel, "approved"],
      (err, results, fields) => {
        if (results.length > 0) {
          res.locals.totalschoollevelenrolled = results;
          next();
        } else {
          next();
        }
      }
    );
  } catch (error) {
    console.log("An error has occured");
  }
}

function getyearlevel(req, res, next) {
  try {
    let sql = "SELECT yearlevelcol FROM year_level WHERE schoollevelcol = ?";
    db.query(sql, [req.query.schoollevel], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.yearlevel = results;
        next();
      } else {
        res.locals.yearlevel = "none";
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
}

function getnumofenrolledstudentsyearlevel(req, res, next) {
  try {
    let sql =
      "SELECT COUNT(*) AS totalyearlevelenrolled FROM masterlist_tbl WHERE schoollevelcol=? AND yearlevelcol=? AND approval = ?;";
    db.query(
      sql,
      [req.query.schoollevel, req.query.yearlevel, "approved"],
      (err, results, fields) => {
        if (results.length > 0) {
          res.locals.totalyearlevelenrolled = results;
          next();
        } else {
          next();
        }
      }
    );
  } catch (error) {
    console.log("An error has occured");
  }
}

function getsection(req, res, next) {
  try {
    let sql =
      "SELECT sectioncol FROM section_tbl WHERE schoollevelcol = ? AND yearlevelcol = ?";
    db.query(
      sql,
      [req.query.schoollevel, req.query.yearlevel],
      (err, results, fields) => {
        if (results.length > 0) {
          res.locals.section = results;
          next();
        } else {
          res.locals.section = "none";
          next();
        }
      }
    );
  } catch (error) {
    console.log("An error has occured");
  }
}

function getnumofenrolledstudentssection(req, res, next) {
  try {
    let sql =
      "SELECT COUNT(*) AS totalsectionenrolled FROM masterlist_tbl WHERE schoollevelcol=? AND yearlevelcol=? AND sectioncol=? AND approval = ?";
    db.query(
      sql,
      [
        req.query.schoollevel,
        req.query.yearlevel,
        req.query.section,
        "approved",
      ],
      (err, results, fields) => {
        if (results.length > 0) {
          res.locals.totalsectionenrolled = results;
          next();
        } else {
          next();
        }
      }
    );
  } catch (error) {
    console.log("An error has occured");
  }
}

function gettotalnumofsection(req, res, next) {
  try {
    let sql = "SELECT COUNT(*) AS totalsectionnum FROM section_tbl";
    db.query(
      sql,

      (err, results, fields) => {
        if (results.length > 0) {
          res.locals.totalsectionnum = results;
          next();
        } else {
          next();
        }
      }
    );
  } catch (error) {
    console.log("An error has occured");
  }
}

////////////////////// student statistics //////////////////////
router.use(
  getschoollevel,
  getnumofenrolledstudentsschoollevel,
  getyearlevel,
  getnumofenrolledstudentsyearlevel,
  getsection,
  getnumofenrolledstudentssection,
  gettotalnumofsection,
  (req, res, next) => {
    console.log("displaying student statistics");
    if (res.locals.schoollevel && res.locals.totalschoollevelenrolled) {
      res.locals.schoollevelstats = [
        {
          schoollevel: res.locals.schoollevel,
          totalschoollevelenrolled: res.locals.totalschoollevelenrolled,
        },
      ];
    }
    if (res.locals.yearlevel) {
      res.locals.yearlevelstats = [
        {
          yearlevel: res.locals.yearlevel,
          totalyearlevelenrolled: res.locals.totalyearlevelenrolled,
        },
      ];
    }
    if (res.locals.section) {
      res.locals.sectionstats = [
        {
          section: res.locals.section,
          totalsectionenrolled: res.locals.totalsectionenrolled,
        },
      ];
    }
    if (res.locals.totalsectionnum) {
      res.locals.numsection = [
        {
          totalsectionnum: res.locals.totalsectionnum,
        },
      ];
    }
    next();
  }
);
////////////////////////////////////////////////////////////////

module.exports = router;
