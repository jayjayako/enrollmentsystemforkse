const express = require("express");
////////////////////////////////////////////////////////
// initialize router
const router = express.Router();
////////////////////////////////////////////////////////

var db = require("../modulelibrary/databaseconn");
const {
  enrollmentsched,
  checkstudentifbalance,
  checkstudentenrollment,
} = require("../modulelibrary/enrollmentauth");

function displayallinfo(req, res, next) {
  let sql =
    "SELECT student_tbl.id,student_tbl.lastname,student_tbl.firstname" +
    ",student_info.picture " +
    "FROM student_tbl INNER JOIN student_info ON student_tbl.id = student_info.id " +
    "WHERE student_tbl.id = ?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.mydata = JSON.stringify(results);
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}

/////////////////////////// update enrollment schedule //////////////////////
var checkstudentvalidity = [
  enrollmentsched,
  checkstudentifbalance,
  checkstudentenrollment,
];
router.get("/enrollmentsched", checkstudentvalidity, (req, res) => {
  console.log("enrollment sched update");
  if (
    res.locals.enrollmentsched == "opened" &&
    res.locals.enrollbalance == "valid" &&
    res.locals.enrollhistory == "valid"
  ) {
    res.locals.enrollstat = "opened";
  } else {
    res.locals.enrollstat = "invalid";
  }

  res.send(JSON.stringify([{ enrollstat: res.locals.enrollstat }]));
  res.end();
});
//////////////////////////////////////////////////////////////////

/////////////////////////// student dashboard //////////////////////
router.get("/dashboard", displayallinfo, (req, res) => {
  console.log("displaying account");
  res.send(res.locals.mydata);
  res.end();
});
//////////////////////////////////////////////////////////////////

module.exports = router;
