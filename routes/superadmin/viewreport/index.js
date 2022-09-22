const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const cors = require("cors");

router.use(cors());

var db = require("../modulelibrary/databaseconn");

/////////////////////// display admin table /////////////////////
router.get("/displayadmintable", (req, res) => {
  try {
    let sql =
      "SELECT * FROM admin_tbl " +
      "INNER JOIN admin_info ON admin_tbl.id=admin_info.id";
    db.query(sql, (err, results, fields) => {
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
/////////////////////////////////////////////////////////////////

/////////////////////// display position /////////////////////
router.get("/displayposition", (req, res) => {
  try {
    let sql = "SELECT * FROM staff_positions";
    db.query(sql, (err, results, fields) => {
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
/////////////////////////////////////////////////////////////////

/////////////////////// display staff table /////////////////////
router.get("/displaystafftable", (req, res) => {
  try {
    let sql =
      "SELECT * FROM staff_tbl " +
      "INNER JOIN staff_info ON staff_tbl.id=staff_info.id " +
      "WHERE staff_info.position=?";
    db.query(sql, [req.query.position], (err, results, fields) => {
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
/////////////////////////////////////////////////////////////////

////////////////// display schoollevel function ///////////////////
function displayschoollevel(req, res, next) {
  let sql = "SELECT schoollevelcol FROM school_level";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

////////////////////// display yearlevel function ///////////////////
function displayyearlevel(req, res, next) {
  var schoollevel = req.query.schoollevel;
  let sql = "SELECT yearlevelcol FROM year_level WHERE schoollevelcol=?";
  db.query(sql, [schoollevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
/////////////////////////////////////////////////////////////////////

////////////////////// display section function /////////////////////
function displaysection(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  let sql =
    "SELECT sectioncol FROM section_tbl WHERE schoollevelcol=? AND yearlevelcol=?";
  db.query(sql, [schoollevel, yearlevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      next();
    }
  });
}
/////////////////////////////////////////////////////////////////////
////////////////////// display table function ///////////////////////
function displayenrolledstudenttable(req, res, next) {
  let d = new Date();
  let year = d.getFullYear();
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  var section = req.query.section;

  let sql =
    "SELECT masterlist_tbl.superid,masterlist_tbl.schoollevelcol,masterlist_tbl.yearlevelcol,masterlist_tbl.sectioncol, student_tbl.lastname, student_tbl.firstname, student_info.email " +
    "FROM ((masterlist_tbl " +
    "INNER JOIN student_tbl " +
    "ON masterlist_tbl.id=student_tbl.id) " +
    "INNER JOIN student_info " +
    "ON masterlist_tbl.id=student_info.id) " +
    "WHERE masterlist_tbl.schoollevelcol=? AND masterlist_tbl.yearlevelcol=? AND masterlist_tbl.sectioncol=? " +
    "AND masterlist_tbl.approval=? AND masterlist_tbl.schoolyear=?";
  db.query(
    sql,
    [schoollevel, yearlevel, section, "approved", year],
    (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify(results));
        next();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        next();
      }
    }
  );
}
/////////////////////////////////////////////////////////////////////

//////////////////////// display student payments ////////////////////////
function displaystudentpayments(req, res, next) {
  let sql =
    "SELECT student_tbl.lastname, student_tbl.firstname, " +
    "student_info.email, " +
    "assessment_payment_stdnt_tbl.schoollevelcol, " +
    "assessment_payment_stdnt_tbl.yearlevelcol, " +
    "assessment_payment_stdnt_tbl.paymenttypecol, " +
    "assessment_payment_stdnt_tbl.paymentmethodcol, " +
    "assessment_payment_stdnt_tbl.amount " +
    "FROM ((assessment_payment_stdnt_tbl " +
    "INNER JOIN student_tbl " +
    "ON assessment_payment_stdnt_tbl.id=student_tbl.id) " +
    "INNER JOIN student_info " +
    "ON assessment_payment_stdnt_tbl.id=student_info.id) " +
    "WHERE assessment_payment_stdnt_tbl.approval=?";
  db.query(sql, ["approved"], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      next();
    }
  });
}
//////////////////////////////////////////////////////////////////////////

/////////////////////////// display schoollevel //////////////////////////
router.get("/displayschoollevel", displayschoollevel, (req, res) => {
  console.log("displaying schoollevel");
  res.end();
});
//////////////////////////////////////////////////////////////////////////

/////////////////////////// display yearlevel ////////////////////////////
router.get("/displayyearlevel", displayyearlevel, (req, res) => {
  console.log("displaying yearlevel");
  res.end();
});
//////////////////////////////////////////////////////////////////////////

/////////////////////////// display section ////////////////////////////
router.get("/displaysection", displaysection, (req, res) => {
  console.log("displaying section");
  res.end();
});
//////////////////////////////////////////////////////////////////////////

////////////////////////////// display table /////////////////////////////
router.get(
  "/displayenrolledstudenttable",
  displayenrolledstudenttable,
  (req, res) => {
    console.log("displaying table");
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////////

//////////////////////// display student payments ////////////////////////
router.get("/displaystudentpayments", displaystudentpayments, (req, res) => {
  console.log("displaying student payments");
  res.end();
});
//////////////////////////////////////////////////////////////////////////

////////////////// display usertype ///////////////////
function displayusertype(req, res, next) {
  let sql = "SELECT usertype FROM manageuseraccess";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
/////////////////////////////////////////////////////

router.get("/displayusertype", displayusertype, (req, res) => {
  console.log("displaying usertype");
  res.end();
});

/////////////// display staff position ///////////////
function displaystaffposition(req, res, next) {
  if (req.query.usertype == "staff") {
    let sql = "SELECT value FROM staff_positions";
    db.query(sql, (err, results, fields) => {
      if (results.length > 0) {
        console.log("displaying staff positions");
        res.send(JSON.stringify(results));
        res.end();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } else {
    next();
  }
}
/////////////////////////////////////////////////////

router.get("/displaystaffposition", displaystaffposition, (req, res) => {
  res.send(JSON.stringify([{ id: "invalid" }]));
  res.end();
});

////////////////////// display admin activity log ////////////////////
function displayadminactivitylog(req, res, next) {
  try {
    let sql = "SELECT * FROM activity_log WHERE usertype=?";
    db.query(sql, ["admin"], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify(results));
        res.end();
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
}

router.get("/displayadminactivitylog", displayadminactivitylog, (req, res) => {
  res.send(JSON.stringify([{ id: "invalid" }]));
  res.end();
});
/////////////////////////////////////////////////////////////////////

////////////////////// display admin activity log ////////////////////
function displaystaffactivitylog(req, res, next) {
  try {
    let sql =
      "SELECT staff_info.id, activity_log.time, activity_log.activities, staff_info.position, activity_log.year " +
      "FROM activity_log INNER JOIN staff_info " +
      "ON staff_info.id=activity_log.id WHERE activity_log.usertype=? AND staff_info.position=?";
    db.query(sql, ["staff", req.query.position], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify(results));
        res.end();
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
}

router.get("/displaystaffactivitylog", displaystaffactivitylog, (req, res) => {
  res.send(JSON.stringify([{ id: "invalid" }]));
  res.end();
});
/////////////////////////////////////////////////////////////////////

router.get("/displayadminloghistory", (req, res) => {
  try {
    let sql = "SELECT * FROM log_history WHERE usertype=?";
    db.query(sql, ["admin"], (err, results, fields) => {
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

router.get("/displaystaffloghistory", (req, res) => {
  try {
    let sql =
      "SELECT staff_info.id, log_history.time, log_history.loginout, staff_info.position, log_history.ip_address, log_history.year " +
      "FROM log_history INNER JOIN staff_info " +
      "ON staff_info.id=log_history.id WHERE log_history.usertype=? AND staff_info.position=?";
    db.query(sql, ["staff", req.query.position], (err, results, fields) => {
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

module.exports = router;
