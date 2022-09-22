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

////////////////// checking student max number module //////////////////
function registrarmodule(req, res, next) {
  let sql =
    "SELECT student_max_num FROM registrar_module WHERE student_max_num=? AND id=?";
  db.query(
    sql,
    ["staffmodule8", res.locals.currentid],
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

////////////////// display student max number function ///////////////////
function displaystdntmaxnumber(req, res, next) {
  let sql = "SELECT maxnumbercol FROM student_max_number WHERE id='1'";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

////////////////// display classroom max number function ///////////////////
function displayclassmaxnumber(req, res, next) {
  let sql = "SELECT maxnumbercol FROM classroom_max_number WHERE id='1'";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

////////////////// update student max number function /////////////////////
function updatestdntmaxnumber(req, res, next) {
  var maxnumber = req.body.maxnumber;
  console.log(maxnumber);

  let post = { maxnumbercol: parseInt(maxnumber) };
  let sql = 'UPDATE student_max_number SET ? WHERE id="1"';
  db.query(sql, [post], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
/////////////////////////////////////////////////////////////////////

////////////////// update classroom max number function /////////////////////
function updateclassmaxnumber(req, res, next) {
  var maxnumber = req.body.classmaxnumber;
  console.log(maxnumber);

  let post = { maxnumbercol: parseInt(maxnumber) };
  let sql = 'UPDATE classroom_max_number SET ? WHERE id="1"';
  db.query(sql, [post], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
/////////////////////////////////////////////////////////////////////

/////////////////////////// display student max number /////////////////////////
router.get("/displaystdntmaxnumber", displaystdntmaxnumber, (req, res) => {
  console.log("displaying student max number");
  res.end();
});
//////////////////////////////////////////////////////////////////////

/////////////////////////// display classroom max number /////////////////////////
router.get("/displayclassmaxnumber", displayclassmaxnumber, (req, res) => {
  console.log("displaying classroom max number");
  res.end();
});
//////////////////////////////////////////////////////////////////////

////////////////////////// update student max number ///////////////////////
router.post(
  "/updatestdntmaxnumber",
  upload.none(),
  updatestdntmaxnumber,
  (req, res) => {
    console.log("updating student max number");
    activitylog(res.locals.currentid, "updated student max number");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

////////////////////////// update classroom max number ///////////////////////
router.post(
  "/updateclassmaxnumber",
  upload.none(),
  updateclassmaxnumber,
  (req, res) => {
    console.log("updating classroom max number");
    activitylog(res.locals.currentid, "updated student max number");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

module.exports = router;
