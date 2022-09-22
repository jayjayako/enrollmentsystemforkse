const express = require("express");
const fs = require("fs");
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

const staffposition = require("./staffposition");

const displaystaffmodule = require("./displaystaffmodule");
const updatestaffmodule = require("./updateuseraccess");
const deletestaffmodule = require("./deleteuseraccess");
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

/////////////////////////// add new admin info ///////////////////////
function addnewstaffinfo(req, res, next) {
  var idnum = res.locals.idvar;
  var pic;
  if (req.file == null) {
    pic = "../../img/defaultimg.png";
  } else {
    pic = req.file.filename;
  }
  let post = { id: idnum, picture: pic, position: req.body.staffposition };
  let sql = "INSERT INTO staff_info SET ?";
  db.query(sql, [post], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    next();
  });
}
//////////////////////////////////////////////////////////////////////

/////////////////////////// add new admin table //////////////////////
function addnewstafftbl(req, res, next) {
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
  let sql = "INSERT INTO staff_tbl SET ?";
  db.query(sql, [post], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
//////////////////////////////////////////////////////////////////

var addnewstaff = [addnewstafftbl, addnewstaffinfo, staffposition];

/////////////////////////// check xss ////////////////////////////
function checkxssforaddnewstaff(req, res, next) {
  var user = req.body.username;
  var pass = req.body.password;
  var last = req.body.lastname;
  var first = req.body.firstname;
  if (
    checkforxss(user) == false &&
    checkforxss(pass) == false &&
    checkforxss(last) == false &&
    checkforxss(first) == false &&
    req.body.staffposition
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
    let sql = "SELECT id FROM staff_tbl WHERE username=? OR password=?";
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
function checkifempty(req, res, next) {
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

/////////////////////////// add new staff ////////////////////////
router.post(
  "/addnewstaff",
  upload.single("picture"),
  checkifempty,
  checkxssforaddnewstaff,
  checkifvalid,
  addnewstaff,
  (req, res) => {
    res.send(JSON.stringify([{ id: "valid" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////

////////////////////// display staff position ////////////////////
router.get("/displaystaffposition", (req, res) => {
  let sql = "SELECT value FROM staff_positions";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
      res.end();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
});
//////////////////////////////////////////////////////////////////

////////////////////// display table function ///////////////////////
function displaytable(req, res, next) {
  let sql =
    "SELECT staff_tbl.id, staff_tbl.lastname, staff_tbl.firstname, staff_info.email " +
    "FROM staff_tbl " +
    "INNER JOIN staff_info " +
    "ON staff_tbl.id=staff_info.id";
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

///////////////////////// display specific user //////////////////////////
router.get("/displayspecificuser", displaystaffmodule, (req, res) => {
  let sql = "SELECT * FROM staff_tbl WHERE id=?";
  db.query(sql, [req.query.id], (err, results, fields) => {
    if (results.length > 0) {
      res.send(
        JSON.stringify([
          {
            stafftable: results,
            staffposition: res.locals.staffposition,
            staffmodule: res.locals.specificstaffmodule,
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

function checkxssforupdatestaff(req, res, next) {
  var user = req.body.username;
  var pass = req.body.password;
  var last = req.body.lastname;
  var first = req.body.firstname;

  if (
    checkforxss(user) == false &&
    checkforxss(pass) == false &&
    checkforxss(last) == false &&
    checkforxss(first) == false &&
    req.body.staffposition
  ) {
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}

function updatestafftbl(req, res, next) {
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
  let sql = "UPDATE staff_tbl SET ? WHERE id=?";
  db.query(sql, [post, req.query.id], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}

var updatestaff = [updatestafftbl, updatestaffmodule];

/////////////////////////// update admin  /////////////////////////
router.post(
  "/updatestaff",
  upload.none(),
  checkifempty,
  checkxssforupdatestaff,
  updatestaff,
  (req, res) => {
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
///////////////////////////////////////////////////////////////////

function getfilename(req, res, next) {
  let sql = "SELECT picture FROM staff_info WHERE id=?";
  db.query(sql, [req.query.id], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.staffpicture = results[0].picture;
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}

function deletestafftable(req, res, next) {
  let sql = "DELETE FROM staff_tbl WHERE id = ?";
  db.query(sql, [req.query.id], (err, results, fields) => {
    if (err) throw err;
    else console.log("deleted records:" + results.affectedRows);
  });
  next();
}

function deletestaffinfo(req, res, next) {
  let sql = "DELETE FROM staff_info WHERE id = ?";
  db.query(sql, [req.query.id], (err, results, fields) => {
    if (err) throw err;
    else console.log("deleted records:" + results.affectedRows);
  });
  next();
}

function deletestaffpicture(req, res, next) {
  try {
    fs.unlink("./uploads/" + res.locals.staffpicture, (err) => {
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

var deletestaff = [
  checkfilename,
  getfilename,
  deletestafftable,
  deletestaffpicture,
  deletestaffmodule,
  deletestaffinfo,
];

/////////////////////////// delete admin  /////////////////////////
router.get("/deletestaff", deletestaff, (req, res) => {
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
///////////////////////////////////////////////////////////////////
module.exports = router;
