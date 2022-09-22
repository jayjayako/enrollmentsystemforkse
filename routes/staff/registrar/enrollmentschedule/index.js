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
/////////////////// checking enrollment sched module ///////////////////
function registrarmodule(req, res, next) {
  let sql =
    "SELECT enrollment_sched FROM registrar_module WHERE enrollment_sched=? AND id=?";
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
router.use(registrarmodule);
////////////////////////////////////////////////////////////////////////

function displaymonth(req, res, next) {
  let sql = "SELECT monthname,number FROM monthvalue_tbl";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}

var getDaysInMonth = function (month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
};

function displaydays(req, res, next) {
  var month = req.query.month;
  console.log(month);
  const d = new Date();
  let year = d.getFullYear();
  var results = getDaysInMonth(month, year);
  res.locals.strresults = results.toString();
  next();
}

function displaycurrentschedule(req, res, next) {
  let sql =
    "SELECT frommonth,fromday,tomonth,today FROM enrollment_sched_tbl WHERE id=?";
  db.query(sql, ["1"], (err, results, fields) => {
    if (results.length > 0) {
      console.log(results);
      res.send(JSON.stringify(results));
    }
    next();
  });
}

function updateschedule(req, res, next) {
  var frommonth = req.body.frommonth;
  var fromday = req.body.fromdays;

  var tomonth = req.body.tomonth;
  var today = req.body.todays;

  let post = {
    frommonth: frommonth,
    fromday: fromday,
    tomonth: tomonth,
    today: today,
  };
  let sql = 'UPDATE enrollment_sched_tbl SET ? WHERE id="1"';
  db.query(sql, [post], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}

/////////////////////////// displayfrommonth /////////////////////////
router.get("/displaymonth", displaymonth, (req, res) => {
  console.log("displaying month");
  res.end();
});
//////////////////////////////////////////////////////////////////////
//////////////////// display days according to monthyear /////////////
router.get("/displaydays", displaydays, (req, res) => {
  console.log("displaying days");
  res.send(JSON.stringify([{ number: res.locals.strresults }]));
  res.end();
});
//////////////////////////////////////////////////////////////////////

/////////////////////////// display current schedule /////////////////////////
router.get("/displaycursched", displaycurrentschedule, (req, res) => {
  console.log("displaying current schedule");
  res.end();
});
//////////////////////////////////////////////////////////////////////

////////////////////////// update the schedule ///////////////////////
router.post("/updateschedule", upload.none(), updateschedule, (req, res) => {
  console.log("updating schedule");
  activitylog(res.locals.currentid, "updated the schedule");
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////////

module.exports = router;
