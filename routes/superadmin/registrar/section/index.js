const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////
const multer = require("multer");
const upload = multer();

var db = require("../../modulelibrary/databaseconn");
//////////////////// activity log ///////////////////
const { activitylog } = require("../../modulelibrary/activitylog");
/////////////////////////////////////////////////////

////////////////// display section function ///////////////////
function displaysection(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  let sql =
    "SELECT sectioncol FROM section_tbl WHERE schoollevelcol = ? AND yearlevelcol = ?";
  db.query(sql, [schoollevel, yearlevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
/////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// insert section function ////////////////////////////
function insertsection(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;
  var section = req.body.section;

  let post = {
    schoollevelcol: schoollevel,
    yearlevelcol: yearlevel,
    sectioncol: section,
  };
  let sql = "INSERT INTO section_tbl SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted:" + results.affectedRows);
  });
  next();
}
////////////////////////////////////////////////////////////////////

////////////////// delete section function /////////////////////
function deletesection(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;
  var section = req.body.section;

  let sql =
    "DELETE FROM section_tbl WHERE schoollevelcol = ? AND yearlevelcol = ? AND sectioncol=?";
  db.query(sql, [schoollevel, yearlevel, section], (err, results, fields) => {
    if (err) throw err;
    else console.log("deleted records:" + results.affectedRows);
  });
  next();
}
/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/////////////////////////// display section /////////////////////////
router.get("/displaysection", displaysection, (req, res) => {
  console.log("displaying school yearlevel and section");
  res.end();
});
//////////////////////////////////////////////////////////////////////

/////////////////////////// check if empty ///////////////////////
function checkifempty(req, res, next) {
  try {
    if (
      req.body.schoollevel != "" &&
      req.body.schoollevel != "undefined" &&
      req.body.schoollevel &&
      req.body.yearlevel != "" &&
      req.body.yearlevel != "undefined" &&
      req.body.yearlevel &&
      req.body.section != "" &&
      req.body.section != "undefined" &&
      req.body.section
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

////////////////////////// insert section ///////////////////////
router.post(
  "/insertsection",
  upload.none(),
  checkifempty,
  insertsection,
  (req, res) => {
    console.log("inserting section");
    activitylog(res.locals.currentid, "inserted section");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

////////////////////////// delete section ///////////////////////
router.post(
  "/deletesection",
  upload.none(),
  checkifempty,
  deletesection,
  (req, res) => {
    console.log("deleting section");
    activitylog(res.locals.currentid, "deleted section");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

module.exports = router;
