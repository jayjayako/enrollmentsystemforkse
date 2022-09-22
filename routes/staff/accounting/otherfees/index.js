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

////////////////// the specific data came from school and year registrar /////////////
// but not for registrar account

////////////////// checking other fees module //////////////////
function accountingmodule(req, res, next) {
  let sql =
    "SELECT other_fees FROM accounting_module WHERE other_fees=? AND id=?";
  db.query(
    sql,
    ["staffmodule1", res.locals.currentid],
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
router.use(accountingmodule);
///////////////////////////////////////////////////////////////

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

////////////////// display specific other fees function ///////////////////
function displayspecificotherfees(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  let sql =
    "SELECT schoollevelcol,yearlevelcol,particularscol,amountcol FROM other_fees_tbl WHERE schoollevelcol=? AND yearlevelcol=?";
  db.query(sql, [schoollevel, yearlevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

////////////////// insert other fees function ///////////////////
function insertotherfees(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;
  var particulars = req.body.particulars;
  var amount = parseFloat(req.body.amount);

  if (schoollevel && yearlevel && particulars) {
    let post = {
      schoollevelcol: schoollevel,
      yearlevelcol: yearlevel,
      particularscol: particulars,
      amountcol: amount,
    };
    let sql = "INSERT INTO other_fees_tbl SET ?";
    db.query(sql, post, (err, results) => {
      if (err) throw err;
      console.log("Number of records inserted:" + results.affectedRows);
    });
    next();
  } else {
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
}
////////////////////////////////////////////////////////////////////

////////////////// update other fees function /////////////////////
function updateotherfees(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;
  var particulars = req.body.particulars;
  var amount = req.body.amount;

  let post = { amountcol: parseFloat(amount) };
  let sql =
    "UPDATE other_fees_tbl SET ? WHERE schoollevelcol = ? AND yearlevelcol = ? AND particularscol = ?";
  db.query(sql, [post, schoollevel, yearlevel, particulars], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
/////////////////////////////////////////////////////////////////////

////////////////// delete other fees function /////////////////////
function deleteotherfees(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;
  var particulars = req.body.particulars;

  let sql =
    "DELETE FROM other_fees_tbl WHERE schoollevelcol = ? AND yearlevelcol = ? AND particularscol = ?";
  db.query(
    sql,
    [schoollevel, yearlevel, particulars],
    (err, results, fields) => {
      if (err) throw err;
      else console.log("deleted records:" + results.affectedRows);
    }
  );
  next();
}
/////////////////////////////////////////////////////////////////////

/////////////////////////// display school level /////////////////////////
router.get("/displayschoollevel", displayschoollevel, (req, res) => {
  console.log("displaying school level");
  res.end();
});
//////////////////////////////////////////////////////////////////////

/////////////////////////// display year level /////////////////////////
router.get("/displayyearlevel", displayyearlevel, (req, res) => {
  console.log("displaying year level");
  res.end();
});
//////////////////////////////////////////////////////////////////////

/////////////////////////// display specific other fees /////////////////////////
router.get(
  "/displayspecificotherfees",
  displayspecificotherfees,
  (req, res) => {
    console.log("displaying other fees table");
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

////////////////////////// insert other fees ///////////////////////
router.post("/insertotherfees", upload.none(), insertotherfees, (req, res) => {
  console.log("inserting other fees");
  activitylog(res.locals.currentid, "inserted other fees");
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////////

////////////////////////// update other fees ///////////////////////
router.post("/updateotherfees", upload.none(), updateotherfees, (req, res) => {
  console.log("update other fees");
  activitylog(res.locals.currentid, "updated other fees");
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////////

////////////////////////// delete other fees ///////////////////////
router.post("/deleteotherfees", upload.none(), deleteotherfees, (req, res) => {
  console.log("deleting other fees");
  activitylog(res.locals.currentid, "deleted other fees");
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////////

module.exports = router;
