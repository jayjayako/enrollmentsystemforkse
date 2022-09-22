const express = require("express");
////////////////////////////////////////////////////////
// initialize router
const router = express.Router();
////////////////////////////////////////////////////////

const multer = require("multer");
const upload = multer();

const cors = require("cors");

router.use(cors());

var db = require("../modulelibrary/databaseconn");
var { generateid } = require("../modulelibrary/idgenerator");

function checkifvalid(req, res, next) {
  var last = req.body.lastname;
  var first = req.body.firstname;
  var user = req.body.username;
  var email = req.body.email;
  var pass = req.body.password;
  var confirmpass = req.body.confirmpassword;

  if (last && first && user && email && pass && confirmpass) {
    if (pass == confirmpass) {
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}

function registerstudenttable(req, res, next) {
  res.locals.tempstdntid = generateid();
  var last = req.body.lastname;
  var first = req.body.firstname;
  var user = req.body.username;
  var pass = req.body.password;

  let post = {
    id: res.locals.tempstdntid,
    username: user,
    password: pass,
    lastname: last,
    firstname: first,
  };
  let sql = "INSERT INTO student_tbl SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    next();
  });
}

function registerstudentinfo(req, res, next) {
  var email = req.body.email;

  let post = {
    id: res.locals.tempstdntid,
    picture: "../images/defaultimg.png",
    email: email,
    status: "enrollee",
  };
  let sql = "INSERT INTO student_info SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    next();
  });
}

/////////////////////////// student dashboard //////////////////////
router.post(
  "/register",
  upload.none(),
  checkifvalid,
  registerstudenttable,
  registerstudentinfo,
  (req, res) => {
    console.log("displaying account");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////

module.exports = router;
