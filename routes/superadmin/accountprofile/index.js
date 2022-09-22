const express = require("express");
//////////////////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const cors = require("cors");

router.use(cors());

const multer = require("multer");

var db = require("../modulelibrary/databaseconn");
const { generateid } = require("../modulelibrary/idgenerator");
const fs = require("fs");
const { checkforxss } = require("../modulelibrary/checkstring");
////////////////// mysql query can be modified ///////////////
function displayallinfo(req, res, next) {
  let sql =
    "SELECT superadmin_tbl.lastname, superadmin_tbl.firstname, " +
    "superadmin_tbl.username, superadmin_tbl.password," +
    "superadmin_info.picture, superadmin_info.birthdate, " +
    "superadmin_info.phone, superadmin_info.email, superadmin_info.address " +
    "FROM superadmin_tbl INNER JOIN superadmin_info " +
    "ON superadmin_tbl.id = superadmin_info.id " +
    "WHERE superadmin_tbl.id = ?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.accountinfo = results;
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      next();
    }
  });
}
//////////////////////////////////////////////////////////////

////////////////// display superadmin account ////////////////
router.get("/getaccount", displayallinfo, (req, res) => {
  res.send(JSON.stringify(res.locals.accountinfo));
  res.end();
});
//////////////////////////////////////////////////////////////

////////////////// deletes file before update /////////////////
function deletemyfile(filename) {
  fs.unlink("./superadminfiles/" + filename, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("deleted file");
  });
}
///////////////////////////////////////////////////////////////

////////////////// this is for updating file of admin /////////
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./superadminfiles"); //important this is a direct path from our current file to storage location
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

////////////////////////////////// update admin info //////////////////////////////
function updateadmininfo(req, res, next) {
  var idnum = res.locals.currentid;
  var pic;
  if (req.file == null) {
    pic = res.locals.myfiles;
  } else {
    pic = req.file.filename;
    deletemyfile(res.locals.myfiles);
  }
  var birth = req.body.birthdate;
  var email = req.body.email;
  var phone = req.body.phonenumber;
  var address = req.body.address;

  let post = {
    picture: pic,
    birthdate: birth,
    email: email,
    phone: phone,
    address: address,
  };
  let sql = "UPDATE superadmin_info SET ? WHERE id=?";
  db.query(sql, [post, idnum], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
//////////////////////////////////////////////////////////////////////////

////////////////////// update admin table ////////////////////
function updateadmintable(req, res, next) {
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
  let sql = "UPDATE superadmin_tbl SET ? WHERE id=?";
  db.query(sql, [post, idnum], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
/////////////////////////////////////////////////////////////

///////////////////////// get id number /////////////////////////
function getfilename(req, res, next) {
  let sql = "SELECT picture FROM superadmin_info WHERE id = ?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.myfiles = results[0].picture;
    }
    next();
  });
}
/////////////////////////////////////////////////////////////////

function checkifvalid(req, res, next) {
  if (
    checkforxss(req.body.username) == false &&
    checkforxss(req.body.password) == false &&
    checkforxss(req.body.lastname) == false &&
    checkforxss(req.body.firstname) == false &&
    checkforxss(req.body.birthdate) == false &&
    checkforxss(req.body.phonenumber) == false &&
    checkforxss(req.body.email) == false &&
    checkforxss(req.body.address) == false
  ) {
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
var updateadmin = [updateadmintable, updateadmininfo];

////////////////////////// edit admin profile /////////////////////////
router.post(
  "/editmyprofile",
  upload.single("picture"),
  getfilename,
  checkifvalid,
  updateadmin,
  displayallinfo,
  (req, res) => {
    console.log("edit profile");
    res.send(JSON.stringify(res.locals.accountinfo));
    res.end();
  }
);
///////////////////////////////////////////////////////////////////////

module.exports = router;
