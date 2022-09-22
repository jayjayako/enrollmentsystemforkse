const express = require("express");
const router = express.Router();

var db = require("../modulelibrary/databaseconn");
const { activitylog } = require("../modulelibrary/activitylog");

////////////////// display school level function ///////////////////
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

router.get("/displayschoollevel", displayschoollevel, (req, res) => {
  console.log("displaying schoollevel");
  res.end();
});
//////////////////////// display student all data //////////////////
function displaytable(req, res, next) {
  let sql =
    "SELECT masterlist_tbl.superid, masterlist_tbl.schoollevelcol, masterlist_tbl.yearlevelcol, masterlist_tbl.sectioncol, student_tbl.lastname, student_tbl.firstname " +
    "FROM student_tbl " +
    "INNER JOIN masterlist_tbl ON student_tbl.id=masterlist_tbl.id " +
    "WHERE masterlist_tbl.approval=? AND masterlist_tbl.schoollevelcol=?";
  db.query(sql, ["approved", req.query.schoollevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
  });
}
////////////////////////////////////////////////////////////////////

////////////////////// display specific data ////////////////////////
function displayspecificdata(req, res, next) {
  var superid = req.query.superid;
  let sql =
    "SELECT student_tbl.id, student_tbl.firstname, student_tbl.lastname, student_info.picture, " +
    "masterlist_tbl.schoollevelcol, masterlist_tbl.yearlevelcol," +
    "masterlist_tbl.sectioncol " +
    "FROM ((student_tbl " +
    "INNER JOIN masterlist_tbl " +
    "ON student_tbl.id=masterlist_tbl.id) " +
    "INNER JOIN student_info " +
    "ON student_tbl.id=student_info.id) " +
    "WHERE masterlist_tbl.superid=?";
  db.query(sql, [superid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.specificdata = results;
      res.locals.id = results[0].id;
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}
/////////////////////////////////////////////////////////////////////
///////////////////// display student personal info /////////////////
function displaystudentpersonalinfo(req, res, next) {
  let sql = "SELECT * FROM student_personal_info WHERE id=?";
  db.query(sql, [res.locals.id], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.personalinfo = results;
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}
/////////////////////////////////////////////////////////////////////
router.get(
  "/displayspecificdata",
  displayspecificdata,
  displaystudentpersonalinfo,
  (req, res) => {
    console.log("displaying specific data");
    res.send(
      JSON.stringify([
        {
          specificdata: res.locals.specificdata,
          personalinfo: res.locals.personalinfo,
        },
      ])
    );
    res.end();
  }
);

router.get("/displaytable", displaytable, (req, res) => {
  console.log("display student table");
  res.end();
});

function displaydeactstudent(req, res, next) {
  let sql =
    "SELECT masterlist_tbl.superid, masterlist_tbl.schoollevelcol, masterlist_tbl.yearlevelcol, masterlist_tbl.sectioncol, student_tbl.lastname, student_tbl.firstname " +
    "FROM student_tbl " +
    "INNER JOIN masterlist_tbl ON student_tbl.id=masterlist_tbl.id " +
    "WHERE masterlist_tbl.approval=?";
  db.query(sql, ["deactivated"], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
  });
}

router.get("/displaydeactstudent", displaydeactstudent, (req, res) => {
  console.log("display deactivated student");
  res.end();
});

////////////////////// delete student function //////////////////////////
function deletestudent(req, res, next) {
  var superid = req.query.superid;
  let post = {
    approval: "deactivated",
  };
  let sql = "UPDATE masterlist_tbl SET ? WHERE superid=?";
  db.query(sql, [post, superid], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
/////////////////////////////////////////////////////////////////////////

router.get("/deletestudent", deletestudent, (req, res) => {
  console.log("delete student");
  activitylog(res.locals.currentid, "deleted student");
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});

////////////////////// restore student function /////////////////////////
function restorestudent(req, res, next) {
  var superid = req.query.superid;
  let post = {
    approval: "approved",
  };
  let sql = "UPDATE masterlist_tbl SET ? WHERE superid=?";
  db.query(sql, [post, superid], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
/////////////////////////////////////////////////////////////////////////
router.get("/restorestudent", restorestudent, (req, res) => {
  console.log("restore student");
  activitylog(res.locals.currentid, "restored student");
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});

module.exports = router;
