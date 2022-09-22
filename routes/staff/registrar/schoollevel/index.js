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

/////////////////// checking school level module ///////////////////
function registrarmodule(req, res, next) {
  let sql =
    "SELECT school_lvl FROM registrar_module WHERE school_lvl=? AND id=?";
  db.query(
    sql,
    ["staffmodule4", res.locals.currentid],
    (err, results, fields) => {
      if (results.length > 0) {
        console.log("hindi gumana");
        next();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    }
  );
}
router.use(registrarmodule);
////////////////////////////////////////////////////////////////////

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

////////////////// insert school level function ///////////////////
function insertschoollevel(req, res, next) {
  var schoollevel = req.body.schoollevel;
  let post = { schoollevelcol: schoollevel };
  let sql = "INSERT INTO school_level SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted:" + results.affectedRows);
  });
  next();
}
////////////////////////////////////////////////////////////////////

////////////////// delete school level function /////////////////////
function deleteschoollevel(req, res, next) {
  var schoollevel = req.body.schoollevel;
  let sql = "DELETE FROM school_level WHERE schoollevelcol = ?";
  db.query(sql, [schoollevel], (err, results, fields) => {
    if (err) throw err;
    else console.log("deleted records:" + results.affectedRows);
  });
  next();
}
/////////////////////////////////////////////////////////////////////

/////////////////////////// display school level /////////////////////////
router.get("/displayschoollevel", displayschoollevel, (req, res) => {
  console.log("displaying schoollevel");
  res.end();
});
//////////////////////////////////////////////////////////////////////

////////////////////////// insert school level ///////////////////////
router.post(
  "/insertschoollevel",
  upload.none(),
  insertschoollevel,
  (req, res) => {
    console.log("inserting school level");
    activitylog(res.locals.currentid, "inserted school level");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

////////////////////////// delete school level ///////////////////////
router.post(
  "/deleteschoollevel",
  upload.none(),
  deleteschoollevel,
  (req, res) => {
    console.log("deleting school level");
    activitylog(res.locals.currentid, "deleted school level");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

module.exports = router;
