const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////
const multer = require("multer");
const upload = multer();

var db = require("../modulelibrary/databaseconn");
const { generateid } = require("../modulelibrary/idgenerator");
const {
  enrollmentsched,
  checkstudentifbalance,
  checkifexist,
} = require("../modulelibrary/enrollmentauth");
var xss = require("xss");

function sendinquiry(req, res, next) {
  //var message = req.body.message; // warning dangerous no sanitation
  var message = xss(req.body.message);
  var values = [[generateid(), res.locals.currentid, message]];
  let sql = "INSERT INTO inquiries_tbl (superid,id,message) VALUES ?";
  db.query(sql, [values], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    next();
  });
}

//////////////////////////// for freshman only /////////////////////////
function studentvalidation(req, res, next) {
  if (res.locals.enrollmentsched == "opened") {
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
////////////////////////////////////////////////////////////////////////

//////////////////////////// send inquiry ////////////////////////
router.post(
  "/sendinquiry",
  enrollmentsched,
  studentvalidation,
  upload.none(),
  sendinquiry,
  (req, res) => {
    console.log("sending inquiry");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////

module.exports = router;
