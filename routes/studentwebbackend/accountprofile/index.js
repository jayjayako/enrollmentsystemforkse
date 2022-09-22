const express = require("express");
const fs = require("fs");
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const multer = require("multer");

var db = require("../modulelibrary/databaseconn");
const { decypherthecookie } = require("../modulelibrary/encryption");
const { generateid } = require("../modulelibrary/idgenerator");
// check for validation
const {
  checkforxss,
  checknumbers,
  checkuppercase,
  checklowercase,
  checkspecialchar,
} = require("../modulelibrary/checkstring");

////////////////// deletes file before update /////////////////
function deletemyfile(filename) {
  fs.unlink("./uploads/" + filename, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("deleted file");
  });
}
///////////////////////////////////////////////////////////////

////////////////// this is for updating file of staff /////////
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); //important this is a direct path from our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null, generateid() + "--" + file.originalname);
  },
});
///////////////////////////////////////////////////////////////

///////////////////////// this is for filtering allowed files to upload ///////////
function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false); // else fails
  }
}
///////////////////////////////////////////////////////////////////////////////////

const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter });
//////////////////////////////////////////////////////////////

/////////////////////////// display staff all data ///////////////
////////////////////////// mysql query can be modified //////////////////////
function displaystudentallinfo(req, res, next) {
  var sessid = decypherthecookie(res.locals.mycookie);
  let sql =
    "SELECT student_tbl.lastname,student_tbl.firstname, " +
    "student_tbl.username," +
    "student_tbl.password," +
    "student_info.email,student_info.picture " +
    "FROM ((student_tbl " +
    "INNER JOIN session_tbl ON student_tbl.id = session_tbl.id) " +
    "INNER JOIN student_info ON student_tbl.id = student_info.id) " +
    "WHERE session_tbl.session_id = ?";
  db.query(sql, [sessid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.display = JSON.stringify(results);
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}
/////////////////////////////////////////////////////////////////////////////

/////////////////////////// display student profile //////////////////////
router.get("/displayprofile", displaystudentallinfo, (req, res) => {
  console.log("display student profile");
  res.send(res.locals.display);
  res.end();
});
//////////////////////////////////////////////////////////////////

////////////////////////////////// update student info //////////////////////////////
function updatestudentinfo(req, res, next) {
  var idnum = res.locals.currentid;
  var pic;
  if (req.file == null) {
    pic = res.locals.myfiles;
  } else {
    pic = req.file.filename;
    deletemyfile(res.locals.myfiles);
  }
  var email = req.body.email;

  let post = {
    picture: pic,
    email: email,
  };
  let sql = "UPDATE student_info SET ? WHERE id=?";
  db.query(sql, [post, idnum], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
///////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////// update student table ////////////////////////////////
function updatestudenttable(req, res, next) {
  var idnum = res.locals.currentid;
  var user = req.body.username;
  var pass = req.body.password;
  var last = req.body.lastname;
  var first = req.body.firstname;

  let post = {
    username: user,
    password: pass,
    lastname: last,
    firstname: first,
  };
  let sql = "UPDATE student_tbl SET ? WHERE id=?";
  db.query(sql, [post, idnum], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
//////////////////////////////////////////////////////////////////////////////////////////

///////////////////////// get id number /////////////////////////
function getfilename(req, res, next) {
  let sql = "SELECT picture " + "FROM student_info " + "WHERE id = ?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.myfiles = results[0].picture;
    }
    next();
  });
}
/////////////////////////////////////////////////////////////////

/////////////////////////// check if valid ////////////////////////////
function checkifvalid(req, res, next) {
  var user = req.body.username;
  var pass = req.body.password;
  var last = req.body.lastname;
  var first = req.body.firstname;
  var email = req.body.email;
  if (
    checkforxss(user) == false &&
    user &&
    checkforxss(pass) == false &&
    pass &&
    checkforxss(last) == false &&
    last &&
    checkforxss(first) == false &&
    first &&
    checkforxss(email) == false &&
    email
  ) {
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
///////////////////////////////////////////////////////////////////////
var updatestudent = [updatestudenttable, updatestudentinfo];
////////////////////////// edit staff profile /////////////////////////
router.post(
  "/editmyprofile",
  upload.single("profilepic"),
  getfilename,
  checkifvalid,
  updatestudent,
  (req, res) => {
    console.log("edit profile");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////

module.exports = router;
