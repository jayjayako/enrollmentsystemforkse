const express = require("express");
////////////////////////////////////////////////////////
// initialize router
const router = express.Router();
////////////////////////////////////////////////////////

var db = require("../modulelibrary/databaseconn");
const { decypherthecookie } = require("../modulelibrary/encryption");
//////////////////// activity log ///////////////////
const { activitylog } = require("../modulelibrary/activitylog");
/////////////////////////////////////////////////////
//////////////////// notifications //////////////////
const { notification } = require("../modulelibrary/msgnotifications");
/////////////////////////////////////////////////////

const getposition = require("../modulelibrary/getposition");
const { checkposition } = require("./checkifadmindepartment");
router.use(getposition, checkposition);

/////////////////////////// get id first /////////////////////////////////
function getinfo(req, res, next) {
  var superid = req.query.superid;
  let sql = "SELECT id " + "FROM masterlist_tbl WHERE superid=?";
  db.query(sql, [superid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.getid = results[0].id;
    }
    next();
  });
}
//////////////////////////////////////////////////////////////////////////

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
    }
    next();
  });
}
/////////////////////////////////////////////////////////////////////

////////////////////// display table function ///////////////////////
function displaytable(req, res, next) {
  let d = new Date();
  let year = d.getFullYear();
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  let sql =
    "SELECT masterlist_tbl.superid,masterlist_tbl.schoollevelcol,masterlist_tbl.yearlevelcol,masterlist_tbl.sectioncol, student_tbl.lastname, student_tbl.firstname " +
    "FROM masterlist_tbl " +
    "INNER JOIN student_tbl " +
    "ON masterlist_tbl.id=student_tbl.id " +
    "WHERE masterlist_tbl.schoollevelcol=? AND masterlist_tbl.yearlevelcol=? " +
    "AND masterlist_tbl.approval=? AND masterlist_tbl.schoolyear=?";
  db.query(
    sql,
    [schoollevel, yearlevel, "notapproved", year],
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
////////////////////// display specific data ////////////////////////
function displayspecificdata(req, res, next) {
  var superid = req.query.superid;
  let sql =
    "SELECT student_tbl.lastname, student_tbl.firstname, student_info.picture, " +
    "masterlist_tbl.id, masterlist_tbl.schoollevelcol, " +
    "masterlist_tbl.yearlevelcol, masterlist_tbl.sectioncol " +
    "FROM ((student_tbl " +
    "INNER JOIN masterlist_tbl " +
    "ON student_tbl.id=masterlist_tbl.id) " +
    "INNER JOIN student_info " +
    "ON student_tbl.id=student_info.id) " +
    "WHERE masterlist_tbl.superid=?";
  db.query(sql, [superid], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
/////////////////////////////////////////////////////////////////////
////////////////////// enlist function //////////////////////////////
function enlist(req, res, next) {
  try {
    var superid = req.query.superid;
    let post = { approval: "approved" };
    let sql = "UPDATE masterlist_tbl SET ? " + "WHERE superid = ?";
    db.query(sql, [post, superid], (err, results) => {
      if (err) throw err;
      console.log("Number of records updated: " + results.affectedRows);
      next();
    });
  } catch (error) {
    console.log("Invalid");
  }
}
/////////////////////////////////////////////////////////////////////

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
router.get("/displaytable", displaytable, (req, res) => {
  console.log("displaying table");
  res.end();
});
//////////////////////////////////////////////////////////////////////////

//////////////////////////// display specific data ///////////////////////
router.get("/displayspecificdata", displayspecificdata, (req, res) => {
  console.log("displaying specific data");
  res.end();
});
//////////////////////////////////////////////////////////////////////////
//////////////////////////// enlist now //////////////////////////////////
router.post("/enlist", getinfo, enlist, (req, res) => {
  console.log("enlist student");
  activitylog(res.locals.currentid, "enlisted student");
  let finamessage =
    "[Notification]\n" +
    "Congratulations You are now officially enrolled." +
    "\n" +
    formatAMPM(new Date());
  notification(res.locals.getid, "Admindept", "approved", finamessage);
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////////////

///////////////////// for enrolled students ///////////////////////
function displayenrolledtable(req, res, next) {
  let d = new Date();
  let year = d.getFullYear();
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  let sql =
    "SELECT masterlist_tbl.superid,masterlist_tbl.schoollevelcol,masterlist_tbl.yearlevelcol,masterlist_tbl.sectioncol, student_tbl.lastname, student_tbl.firstname " +
    "FROM masterlist_tbl " +
    "INNER JOIN student_tbl " +
    "ON masterlist_tbl.id=student_tbl.id " +
    "WHERE masterlist_tbl.schoollevelcol=? AND masterlist_tbl.yearlevelcol=? " +
    "AND masterlist_tbl.approval=? AND masterlist_tbl.schoolyear=?";
  db.query(
    sql,
    [schoollevel, yearlevel, "approved", year],
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

router.get("/displayenrolledtable", displayenrolledtable, (req, res) => {
  console.log("displaying enrolled table");
  res.end();
});

///////////////////////////////////////////////////////////////////

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

function displaystudentpersonalinfo(req, res, next) {
  var superid = req.query.superid;
  let sql =
    "SELECT student_tbl.lastname, student_tbl.firstname, " +
    "student_personal_info.birthdate, student_personal_info.gender, " +
    "student_personal_info.address, student_personal_info.contact_no, " +
    "student_personal_info.mothers_name, student_personal_info.mothers_occupation, " +
    "student_personal_info.mothers_contact_no, student_personal_info.fathers_name, " +
    "student_personal_info.fathers_occupation, student_personal_info.fathers_contact_no, " +
    "student_personal_info.guardians_name, student_personal_info.relationship_to_guardian, " +
    "student_personal_info.guardians_contact_no, student_personal_info.guardians_address " +
    "FROM ((student_personal_info " +
    "INNER JOIN masterlist_tbl " +
    "ON student_personal_info.id=masterlist_tbl.id) " +
    "INNER JOIN student_tbl " +
    "ON student_personal_info.id=student_tbl.id) " +
    "WHERE masterlist_tbl.superid=?";
  db.query(sql, [superid], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      next();
    }
  });
}

router.get(
  "/displaystudentpersonalinfo",
  displaystudentpersonalinfo,
  (req, res) => {
    console.log("displaying student personal info");
    res.end();
  }
);

module.exports = router;
