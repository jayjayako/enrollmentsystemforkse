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

////////////////// checking payment plan module //////////////////
function accountingmodule(req, res, next) {
  let sql =
    "SELECT payment_plan FROM accounting_module WHERE payment_plan=? AND id=?";
  db.query(
    sql,
    ["staffmodule2", res.locals.currentid],
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
//////////////////////////////////////////////////////////////////

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
  console.log("displaying school level");
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
  console.log("displaying year level");
  res.end();
});
//////////////////////////////////////////////////////////////////////

//////////////////////////////// display month function//////////////////////////////////
function displaymonth(req, res, next) {
  let sql = "SELECT monthname,number FROM monthvalue_tbl";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// display day function /////////////////////////////////
var getDaysInMonth = function (month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
};

function displayday(req, res, next) {
  var myyear = req.query.year;
  var month = req.query.month;

  console.log(month);
  //const d = new Date();
  //let year = d.getFullYear();

  var results = getDaysInMonth(month, parseInt(myyear));
  res.locals.strresults = results.toString();
  next();
}
///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// display month ////////////////////////////////////
router.get("/displaymonth", displaymonth, (req, res) => {
  console.log("displaying month");
  res.end();
});
///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// display day ////////////////////////////////////
router.get("/displayday", displayday, (req, res) => {
  console.log("displaying day");
  res.send(JSON.stringify([{ number: res.locals.strresults }]));
  res.end();
});
///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// display day ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

////////////////// the specific data came from school and year registrar /////////////
// but not for registrar account
////////////////// display specific payment plans function ///////////////////
function displayspecificpaymentplans(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  let sql =
    "SELECT schoollevelcol,yearlevelcol,payment_typecol,particularcol,yearcol,monthcol,daycol FROM payment_tbl WHERE schoollevelcol = ? AND yearlevelcol = ?";
  db.query(sql, [schoollevel, yearlevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
    next();
  });
}
//////////////////////////////////////////////////////////////////////////////

////////////////// check payment plans if exist function /////////////////////
function checkpaymentplansifexist(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;
  var paymenttype = req.body.paymenttype;
  var particulars = req.body.particulars;
  let sql =
    "SELECT schoollevelcol FROM payment_tbl WHERE schoollevelcol = ? AND yearlevelcol = ? AND payment_typecol =? AND particularcol = ?";
  db.query(
    sql,
    [schoollevel, yearlevel, paymenttype, particulars],
    (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      } else {
        next();
      }
    }
  );
}
//////////////////////////////////////////////////////////////////////////////

////////////////// insert payment plans function /////////////////////////////
function insertpaymentplans(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;
  var paymenttype = req.body.paymenttype;
  var particulars = req.body.particulars;
  if (schoollevel && yearlevel && paymenttype && particulars) {
    let post = {
      schoollevelcol: schoollevel,
      yearlevelcol: yearlevel,
      payment_typecol: paymenttype,
      particularcol: particulars,
    };
    let sql = "INSERT INTO payment_tbl SET ?";
    db.query(sql, post, (err, results) => {
      if (err) throw err;
      console.log("Number of records inserted:" + results.affectedRows);
    });
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
////////////////////////////////////////////////////////////////////

////////////////// update payment plans function /////////////////////
function updatepaymentplans(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;
  var paymenttype = req.body.paymenttype;
  var particulars = req.body.particulars;
  var year = req.body.year;
  var month = req.body.month;
  var day = req.body.day;
  function updatepaymentplanstable() {
    let post = {
      yearcol: parseInt(year),
      monthcol: parseInt(month),
      daycol: parseInt(day),
    };
    let sql =
      "UPDATE payment_tbl SET ? WHERE schoollevelcol = ? AND yearlevelcol = ? AND payment_typecol =? AND particularcol = ?";
    db.query(
      sql,
      [post, schoollevel, yearlevel, paymenttype, particulars],
      (err, results) => {
        if (err) throw err;
        console.log("Number of records updated: " + results.affectedRows);
      }
    );
  }

  const d = new Date();
  let curyear = d.getFullYear();
  let curmonth = d.getMonth() + 1;
  let curday = d.getDate();
  console.log(year, month, day);

  if (
    schoollevel &&
    yearlevel &&
    paymenttype &&
    particulars &&
    year &&
    month &&
    day
  ) {
    if (parseInt(year) > curyear) {
      updatepaymentplanstable();
      next();
    } else if (parseInt(year) == curyear && parseInt(month) > curmonth) {
      updatepaymentplanstable();
      next();
    } else if (
      parseInt(year) == curyear &&
      parseInt(month) == curmonth &&
      parseInt(day) >= curday
    ) {
      updatepaymentplanstable();
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
/////////////////////////////////////////////////////////////////////

////////////////// delete payment plans function /////////////////////
function deletepaymentplans(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;
  var paymenttype = req.body.paymenttype;
  var particulars = req.body.particulars;

  let sql =
    "DELETE FROM payment_tbl WHERE schoollevelcol = ? AND yearlevelcol = ? AND payment_typecol =? AND particularcol = ?";
  db.query(
    sql,
    [schoollevel, yearlevel, paymenttype, particulars],
    (err, results, fields) => {
      if (err) throw err;
      else console.log("deleted records:" + results.affectedRows);
    }
  );
  next();
}
/////////////////////////////////////////////////////////////////////

/////////////////////////// display specific payment plans /////////////////////////
router.get(
  "/displayspecificpaymentplans",
  displayspecificpaymentplans,
  (req, res) => {
    console.log("displaying payment plans");
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

////////////////////////// insert payment plans ///////////////////////
router.post(
  "/insertpaymentplans",
  upload.none(),
  checkpaymentplansifexist,
  insertpaymentplans,
  (req, res) => {
    console.log("inserting payment plans");
    activitylog(res.locals.currentid, "inserted payment plans");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

////////////////////////// update payment plans ///////////////////////
router.post(
  "/updatepaymentplans",
  upload.none(),
  updatepaymentplans,
  (req, res) => {
    console.log("update payment plans");
    activitylog(res.locals.currentid, "updated payment plans");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

////////////////////////// delete payment plans ///////////////////////
router.post(
  "/deletepaymentplans",
  upload.none(),
  deletepaymentplans,
  (req, res) => {
    console.log("deleting payment plans");
    activitylog(res.locals.currentid, "deleted payment plans");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

module.exports = router;
