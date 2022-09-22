const express = require("express");
const fs = require("fs");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////
const multer = require("multer");

var db = require("../../modulelibrary/databaseconn");
const { generateid } = require("../../modulelibrary/idgenerator");
//////////////////// activity log ///////////////////
const { activitylog } = require("../../modulelibrary/activitylog");
/////////////////////////////////////////////////////

///////////////////////// get file name ///////////////////////
function getfilename(req, res, next) {
  let sql = "SELECT filename FROM school_schedule_tbl WHERE id=?";
  db.query(sql, ["1"], (err, results, fields) => {
    if (err) throw err;
    if (results.length > 0) {
      res.locals.filename = results[0].filename;
    } else {
      res.locals.filename = "none";
    }
    next();
  });
}
///////////////////////////////////////////////////////////////

////////////////// deletes file before update /////////////////
function deleteschedule(req, res, next) {
  if (res.locals.filename != "none") {
    fs.unlink("./uploads/" + res.locals.filename, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("deleted file");
    });
  }
  next();
}
///////////////////////////////////////////////////////////////

// store files to folder
////////////////// this is for uploading picture of staff /////////
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

////////////////// insert school level function ///////////////////
function saveschedule(req, res, next) {
  var pic;
  if (req.file == null) {
    pic = "../../img/defaultimg.png";
  } else {
    pic = req.file.filename;
  }

  let post = { filename: pic };
  let sql = "UPDATE school_schedule_tbl SET ? WHERE id=?";
  db.query(sql, [post, "1"], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
////////////////////////////////////////////////////////////////////

////////////////////////// update school schedule ////////////////////
router.post(
  "/saveschedule",
  upload.single("picture"),
  getfilename,
  deleteschedule,
  saveschedule,
  (req, res) => {
    console.log("updating school schedule");
    activitylog(res.locals.currentid, "updated school schedule");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

module.exports = router;
