const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////
const multer = require("multer");

const upload = multer();

var db = require("../modulelibrary/databaseconn");
const { generateid } = require("../modulelibrary/idgenerator");

///////////////////////// display payment details function ///////////////////
function displaypaymentdetails(req, res, next) {
  let sql =
    "SELECT schoollevelcol AS schoollevel, yearlevelcol AS yearlevel " +
    "FROM assessment_payment_stdnt_tbl WHERE id=?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.schoollevel = results[0].schoollevel;
      res.locals.yearlevel = results[0].yearlevel;
    }
    next();
  });
}
//////////////////////////////////////////////////////////////////////////////

///////////////////////// display section function ///////////////////
function displaysection(req, res, next) {
  var schoollevel = res.locals.schoollevel;
  var yearlevel = res.locals.yearlevel;
  let sql =
    "SELECT sectioncol AS section " +
    "FROM section_tbl WHERE schoollevelcol=? AND yearlevelcol=?";
  db.query(sql, [schoollevel, yearlevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

///////////////////////// display schedule function ///////////////////
function displayschedule(req, res, next) {
  let sql = "SELECT filename " + "FROM school_schedule_tbl WHERE id=?";
  db.query(sql, ["1"], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

///////////////////////// upload masterlist function ///////////////////
function uploadmasterlist(req, res, next) {
  var userid = res.locals.currentid;
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;
  var section = req.body.section;

  let d = new Date();
  let year = d.getFullYear();

  let post = {
    superid: generateid(),
    id: userid,
    schoollevelcol: schoollevel,
    yearlevelcol: yearlevel,
    sectioncol: section,
    approval: "notapproved",
    schoolyear: year,
  };
  let sql = "REPLACE INTO masterlist_tbl SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("Added to masterlist " + results.affectedRows);
  });
  next();
}
////////////////////////////////////////////////////////////////////

///////////////////////////////// display section ////////////////////////////
router.get(
  "/displaysection",
  displaypaymentdetails,
  displaysection,
  (req, res) => {
    console.log("displaying section");
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////////////

///////////////////////////////// display enlistment info ////////////////////////////
router.get("/displayenlistmentinfo", displaypaymentdetails, (req, res) => {
  console.log("displaying section");
  res.send(
    JSON.stringify([
      {
        schoollevel: res.locals.schoollevel,
        yearlevel: res.locals.yearlevel,
      },
    ])
  );
  res.end();
});
//////////////////////////////////////////////////////////////////////////////

///////////////////////////////// display schedule ///////////////////////
router.get("/displayschedule", displayschedule, (req, res) => {
  console.log("displaying schedule");
  res.end();
});
//////////////////////////////////////////////////////////////////////////

////////////////////////////// delete enlistment ///////////////////////////
function deleteenlistment(superid) {
  let sql = "DELETE FROM masterlist_tbl WHERE superid=?";
  db.query(sql, superid, (err, results) => {
    if (err) throw err;
    console.log("Number of records Deleted: " + results.affectedRows);
  });
}
////////////////////////////////////////////////////////////////////////////

////////////////////////////// check student if valid //////////////////////
function checkifvalid(req, res, next) {
  var studentid = res.locals.currentid;
  let sql =
    "SELECT superid " + "FROM masterlist_tbl " + "WHERE id = ? AND approval=?";
  db.query(sql, [studentid, "notapproved"], (err, results, fields) => {
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        deleteenlistment(results[i].superid);
      }
      next();
    } else {
      next();
    }
  });
}
////////////////////////////////////////////////////////////////////////////

//////////////////////////////////// upload section ////////////////////////////
function checkenlistmentstudentfilter(req, res, next) {
  var superid = req.query.superid;
  let sql =
    "SELECT notifications_tbl.id FROM " +
    "notifications_tbl " +
    "INNER JOIN masterlist_tbl " +
    "ON notifications_tbl.id=masterlist_tbl.id " +
    "WHERE notifications_tbl.superid=? AND masterlist_tbl.approval=?";
  db.query(sql, [superid, "approved"], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    } else {
      next();
    }
  });
}

router.post(
  "/uploadsection",
  checkenlistmentstudentfilter,
  upload.none(),
  checkifvalid,
  uploadmasterlist,
  (req, res) => {
    console.log("uploaded section");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
////////////////////////////////////////////////////////////////////////////////////////////

function checkenlistmentstudent(req, res, next) {
  var superid = req.query.superid;
  let sql =
    "SELECT notifications_tbl.id FROM " +
    "notifications_tbl " +
    "INNER JOIN masterlist_tbl " +
    "ON notifications_tbl.id=masterlist_tbl.id " +
    "WHERE notifications_tbl.superid=? AND masterlist_tbl.approval=?";
  db.query(sql, [superid, "approved"], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.status = "invalid";
    } else {
      res.locals.status = "valid";
    }
    next();
  });
}

/////////////////////////// check enlistment ///////////////////////////
router.get("/checkenlistmentstudent", checkenlistmentstudent, (req, res) => {
  res.send(JSON.stringify([{ id: res.locals.status }]));
  res.end();
});
////////////////////////////////////////////////////////////////////////

module.exports = router;
