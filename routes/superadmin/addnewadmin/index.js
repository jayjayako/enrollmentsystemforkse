const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const multer = require("multer");

const cors = require("cors");

router.use(cors());

var db = require("../modulelibrary/databaseconn");
var { generateid } = require("../modulelibrary/idgenerator");
var { generatenewpassword } = require("../modulelibrary/generatenewpassword");
const { checkforxss } = require("../modulelibrary/checkstring");
const updateadminmodule = require("./updateuseraccess");
const fs = require("fs");

////////////////// this is for uploading picture of admin /////////
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, generateid() + "--" + file.originalname);
  },
});

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

const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter });
//////////////////////////////////////////////////////////////////

/////////////////////////// deletes file  /////////////////////
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

///////////////////////// add new admin module ///////////////////////
function adminmodule(req, res, next) {
  var idnum = res.locals.idvar;
  var addnewstaff = req.body.addnewstaff;
  var managestaff = req.body.managestaff;
  var managestudent = req.body.managestudent;
  var audittrail = req.body.audittrail;
  var viewreport = req.body.viewreport;

  let post = {
    id: idnum,
    add_new_staff: addnewstaff,
    manage_staff: managestaff,
    manage_student: managestudent,
    audit_trail: audittrail,
    view_report: viewreport,
  };
  let sql = "INSERT INTO admin_module SET ?";
  db.query(sql, [post], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
//////////////////////////////////////////////////////////////////////

/////////////////////////// add new admin info ///////////////////////
function addnewadmininfo(req, res, next) {
  var idnum = res.locals.idvar;
  var pic;
  if (req.file == null) {
    pic = "../../img/defaultimg.png";
  } else {
    pic = req.file.filename;
  }
  let post = { id: idnum, picture: pic };
  let sql = "INSERT INTO admin_info SET ?";
  db.query(sql, [post], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    next();
  });
}
//////////////////////////////////////////////////////////////////////

/////////////////////////// add new admin table //////////////////////
function addnewadmintbl(req, res, next) {
  var newid = res.locals.idvar;
  var user = req.body.username;
  var pass = req.body.password;
  var last = req.body.lastname;
  var first = req.body.firstname;

  let post = {
    id: newid,
    username: user,
    password: pass,
    lastname: last,
    firstname: first,
  };
  let sql = "INSERT INTO admin_tbl SET ?";
  db.query(sql, [post], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
//////////////////////////////////////////////////////////////////

var addnewadmin = [addnewadmintbl, addnewadmininfo, adminmodule];

/////////////////////////// check xss ////////////////////////////
function checkxssforaddnewadmin(req, res, next) {
  var user = req.body.username;
  var pass = req.body.password;
  var last = req.body.lastname;
  var first = req.body.firstname;
  if (
    checkforxss(user) == false &&
    checkforxss(pass) == false &&
    checkforxss(last) == false &&
    checkforxss(first) == false &&
    req.body.addnewstaff &&
    req.body.managestaff &&
    req.body.managestudent &&
    req.body.audittrail &&
    req.body.viewreport
  ) {
    next();
  } else {
    deletemyfile(req.file.filename);
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
//////////////////////////////////////////////////////////////////

function checkifvalid(req, res, next) {
  var user = req.body.username;
  var pass = req.body.password;
  var last = req.body.lastname;
  var first = req.body.firstname;
  console.log("this is the user", user);
  if (user && pass && last && first) {
    let sql = "SELECT id FROM admin_tbl WHERE username=? OR password=?";
    db.query(sql, [user, pass], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      } else {
        var idnum = generateid();
        res.locals.idvar = idnum;
        next();
      }
    });
  } else {
    deletemyfile(req.file.filename);
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}

/////////////////////////// check if empty ///////////////////////
function addnewadmincheckifempty(req, res, next) {
  try {
    if (
      req.body.username != "" &&
      req.body.username != "undefined" &&
      req.body.username &&
      req.body.password != "" &&
      req.body.password != "undefined" &&
      req.body.password &&
      req.body.lastname != "" &&
      req.body.lastname != "undefined" &&
      req.body.lastname &&
      req.body.firstname != "" &&
      req.body.firstname != "undefined" &&
      req.body.firstname
    ) {
      next();
    } else {
      deletemyfile(req.file.filename);
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  } catch (error) {
    deletemyfile(req.file.filename);
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
//////////////////////////////////////////////////////////////////

/////////////////////////// check if empty ///////////////////////
function updateadmincheckifempty(req, res, next) {
  try {
    if (
      req.body.username != "" &&
      req.body.username != "undefined" &&
      req.body.username &&
      req.body.password != "" &&
      req.body.password != "undefined" &&
      req.body.password &&
      req.body.lastname != "" &&
      req.body.lastname != "undefined" &&
      req.body.lastname &&
      req.body.firstname != "" &&
      req.body.firstname != "undefined" &&
      req.body.firstname &&
      req.query.id != "" &&
      req.query.id != "undefined" &&
      req.query.id
    ) {
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
//////////////////////////////////////////////////////////////////

/////////////////////////// add new admin //////////////////////
router.post(
  "/addnewadmin",
  upload.single("picture"),
  addnewadmincheckifempty,
  checkxssforaddnewadmin,
  checkifvalid,
  addnewadmin,
  (req, res) => {
    res.send(JSON.stringify([{ id: "valid" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////

////////////////////// display table function ///////////////////////
function displaytable(req, res, next) {
  let sql =
    "SELECT admin_tbl.id, admin_tbl.lastname, admin_tbl.firstname, admin_info.email " +
    "FROM admin_tbl " +
    "INNER JOIN admin_info " +
    "ON admin_tbl.id=admin_info.id";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      next();
    }
  });
}
/////////////////////////////////////////////////////////////////////

////////////////////////////// display table /////////////////////////////
router.get("/displaytable", displaytable, (req, res) => {
  console.log("displaying table");
  res.end();
});
//////////////////////////////////////////////////////////////////////////

///////////////////////// generate new password //////////////////////////
router.get("/getnewpassword", (req, res) => {
  console.log("generate new password");
  res.send(JSON.stringify([{ password: generatenewpassword() }]));
  res.end();
});
//////////////////////////////////////////////////////////////////////////

///////////////////////// display admin module ///////////////////////////
function displayadminmodule(req, res, next) {
  let sql = "SELECT * " + "FROM admin_module " + "WHERE id=?";
  db.query(sql, [req.query.id], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.specificadminmodule = results;
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}
//////////////////////////////////////////////////////////////////////////

///////////////////////// display specific user //////////////////////////
router.get("/displayspecificuser", displayadminmodule, (req, res) => {
  let sql = "SELECT * FROM admin_tbl WHERE id=?";
  db.query(sql, [req.query.id], (err, results, fields) => {
    if (results.length > 0) {
      res.send(
        JSON.stringify([
          {
            admintable: results,
            adminmodule: res.locals.specificadminmodule,
          },
        ])
      );
      res.end();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
});
//////////////////////////////////////////////////////////////////////////

function checkxssforupdateadmin(req, res, next) {
  var user = req.body.username;
  var pass = req.body.password;
  var last = req.body.lastname;
  var first = req.body.firstname;

  if (
    checkforxss(user) == false &&
    checkforxss(pass) == false &&
    checkforxss(last) == false &&
    checkforxss(first) == false &&
    req.body.addnewstaff &&
    req.body.managestaff &&
    req.body.managestudent &&
    req.body.audittrail &&
    req.body.viewreport
  ) {
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}

function updateadmintbl(req, res, next) {
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
  let sql = "UPDATE admin_tbl SET ? WHERE id=?";
  db.query(sql, [post, req.query.id], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}

var updateadmin = [updateadmintbl, updateadminmodule];

/////////////////////////// update admin  /////////////////////////
router.post(
  "/updateadmin",
  upload.none(),
  updateadmincheckifempty,
  checkxssforupdateadmin,
  updateadmin,
  (req, res) => {
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
///////////////////////////////////////////////////////////////////

function getfilename(req, res, next) {
  let sql = "SELECT picture FROM admin_info WHERE id=?";
  db.query(sql, [req.query.id], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.adminpicture = results[0].picture;
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}

function deleteadmintable(req, res, next) {
  let sql = "DELETE FROM admin_tbl WHERE id = ?";
  db.query(sql, [req.query.id], (err, results, fields) => {
    if (err) throw err;
    else console.log("deleted records:" + results.affectedRows);
  });
  next();
}

function deleteadmininfo(req, res, next) {
  let sql = "DELETE FROM admin_info WHERE id = ?";
  db.query(sql, [req.query.id], (err, results, fields) => {
    if (err) throw err;
    else console.log("deleted records:" + results.affectedRows);
  });
  next();
}

function deleteadminpicture(req, res, next) {
  try {
    fs.unlink("./uploads/" + res.locals.adminpicture, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("deleted file");
    });
  } finally {
    next();
  }
}

function deleteadminmodule(req, res, next) {
  let sql = "DELETE FROM admin_module WHERE id = ?";
  db.query(sql, [req.query.id], (err, results, fields) => {
    if (err) throw err;
    else console.log("deleted records:" + results.affectedRows);
  });
  next();
}

/////////////////////////// check if empty ///////////////////////
function checkfilename(req, res, next) {
  try {
    if (req.query.id != "" && req.query.id != "undefined" && req.query.id) {
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
//////////////////////////////////////////////////////////////////

/////////////////////////// delete admin  /////////////////////////
router.get(
  "/deleteadmin",
  checkfilename,
  getfilename,
  deleteadmintable,
  deleteadmininfo,
  deleteadminpicture,
  deleteadminmodule,
  (req, res) => {
    res.send(JSON.stringify([{ id: "valid" }]));
    res.end();
  }
);
///////////////////////////////////////////////////////////////////

module.exports = router;
