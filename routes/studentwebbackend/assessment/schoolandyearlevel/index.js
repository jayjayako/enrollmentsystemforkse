const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////
const multer = require("multer");
const upload = multer();

var db = require("../../modulelibrary/databaseconn");

////////////////// the specific data came from school and year registrar /////////////
// but not for registrar account

////////////////// display school level function ///////////////////
function displayschoollevel(req, res, next) {
  let sql =
    "SELECT schoollevelcol AS name, schoollevelcol AS id FROM school_level";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

////////////////// display year level function ///////////////////
function displayyearlevel(req, res, next) {
  var schoollevel = req.query.schoollevel;
  let sql =
    "SELECT yearlevelcol AS name, yearlevelcol AS id FROM year_level WHERE schoollevelcol = ?";
  db.query(sql, [schoollevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

/////////////////////////// display school level /////////////////////////
router.get("/displayschoollevel", displayschoollevel, (req, res) => {
  console.log("displaying school level");
  res.end();
});
////////////////////////////////////////////////////////////////////

/////////////////////////// display year level /////////////////////////
router.get("/displayyearlevel", displayyearlevel, (req, res) => {
  console.log("displaying year level");
  res.end();
});
//////////////////////////////////////////////////////////////////////

module.exports = router;
