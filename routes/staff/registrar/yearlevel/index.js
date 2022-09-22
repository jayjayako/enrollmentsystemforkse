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

////////////////// checking year level module //////////////////
function registrarmodule(req, res, next) {
  let sql = "SELECT year_lvl FROM registrar_module WHERE year_lvl=? AND id=?";
  db.query(
    sql,
    ["staffmodule5", res.locals.currentid],
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
////////////////////////////////////////////////////////////////////////

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

////////////////// insert year level function ///////////////////
function insertyearlevel(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;

  let post = { schoollevelcol: schoollevel, yearlevelcol: yearlevel };
  let sql = "INSERT INTO year_level SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted:" + results.affectedRows);
  });
  next();
}
////////////////////////////////////////////////////////////////////

////////////////// delete year level function /////////////////////
function deleteyearlevel(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;

  let sql =
    "DELETE FROM year_level WHERE schoollevelcol = ? AND yearlevelcol = ?";
  db.query(sql, [schoollevel, yearlevel], (err, results, fields) => {
    if (err) throw err;
    else console.log("deleted records:" + results.affectedRows);
  });
  next();
}
/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
/////////////////////////// display year level /////////////////////////
router.get("/displayyearlevel", displayyearlevel, (req, res) => {
  console.log("displaying school and yearlevel");
  res.end();
});
//////////////////////////////////////////////////////////////////////

////////////////////////// insert year level ///////////////////////
router.post("/insertyearlevel", upload.none(), insertyearlevel, (req, res) => {
  console.log("inserting year level");
  activitylog(res.locals.currentid, "inserted year level");
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////////

////////////////////////// delete year level ///////////////////////
router.post("/deleteyearlevel", upload.none(), deleteyearlevel, (req, res) => {
  console.log("deleting year level");
  activitylog(res.locals.currentid, "deleted year level");
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////////

module.exports = router;
