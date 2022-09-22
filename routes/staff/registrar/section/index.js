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

////////////////// checking section module //////////////////
function registrarmodule(req, res, next) {
  let sql = "SELECT section FROM registrar_module WHERE section=? AND id=?";
  db.query(
    sql,
    ["staffmodule6", res.locals.currentid],
    (err, results, fields) => {
      if (results.length > 0) {
        next();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    }
  );
}
router.use(registrarmodule);
////////////////////////////////////////////////////////////

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

/////////////////////////// display school level /////////////////////////
router.get("/displayschoollevel", displayschoollevel, (req, res) => {
  console.log("displaying schoollevel");
  res.end();
});
//////////////////////////////////////////////////////////////////////

////////////////// display year level function ///////////////////
function displayyearlevel(req, res, next) {
  var schoollevel = req.query.schoollevel;
  let sql = "SELECT yearlevelcol FROM year_level WHERE schoollevelcol = ?";
  db.query(sql, [schoollevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

/////////////////////////// display year level /////////////////////////
router.get("/displayyearlevel", displayyearlevel, (req, res) => {
  console.log("displaying school and yearlevel");
  res.end();
});
//////////////////////////////////////////////////////////////////////

/////////////////////////// display section /////////////////////////
router.get("/displaysection", displaysection, (req, res) => {
  console.log("displaying school yearlevel and section");
  res.end();
});
//////////////////////////////////////////////////////////////////////

////////////////////////// insert section ///////////////////////
router.post("/insertsection", upload.none(), insertsection, (req, res) => {
  console.log("inserting section");
  activitylog(res.locals.currentid, "inserted section");
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////////

////////////////////////// delete section ///////////////////////
router.post("/deletesection", upload.none(), deletesection, (req, res) => {
  console.log("deleting section");
  activitylog(res.locals.currentid, "deleted section");
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////////

module.exports = router;
