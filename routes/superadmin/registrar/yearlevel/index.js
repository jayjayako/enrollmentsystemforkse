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

/////////////////////////// check if empty ///////////////////////
function checkifempty(req, res, next) {
  try {
    if (
      req.body.schoollevel != "" &&
      req.body.schoollevel != "undefined" &&
      req.body.schoollevel &&
      req.body.yearlevel != "" &&
      req.body.yearlevel != "undefined" &&
      req.body.yearlevel
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

////////////////////////// insert year level ///////////////////////
router.post(
  "/insertyearlevel",
  upload.none(),
  checkifempty,
  insertyearlevel,
  (req, res) => {
    console.log("inserting year level");
    activitylog(res.locals.currentid, "inserted year level");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

////////////////////////// delete year level ///////////////////////
router.post(
  "/deleteyearlevel",
  upload.none(),
  checkifempty,
  deleteyearlevel,
  (req, res) => {
    console.log("deleting year level");
    activitylog(res.locals.currentid, "deleted year level");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

module.exports = router;
