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

////////////////// checking payment plan amount module //////////////////
function accountingmodule(req, res, next) {
  let sql =
    "SELECT payment_plan_amnt FROM accounting_module WHERE payment_plan_amnt=? AND id=?";
  db.query(
    sql,
    ["staffmodule3", res.locals.currentid],
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
/////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////// display payment type ///////////////////////////////
function displaypaymenttype(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  let sql =
    "SELECT payment_typecol FROM payment_tbl WHERE schoollevelcol = ? AND yearlevelcol = ?";
  db.query(sql, [schoollevel, yearlevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////////////////////

////////////////// display specific payment plan amount function ///////////////////
function displayspecificpaymentplanamount(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  var paymenttype = req.query.paymenttype;
  let sql =
    "SELECT schoollevelcol,yearlevelcol,payment_typecol,particularcol,amount,discount FROM payment_tbl WHERE schoollevelcol = ? AND yearlevelcol = ? AND payment_typecol = ?";
  db.query(
    sql,
    [schoollevel, yearlevel, paymenttype],
    (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify(results));
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
      }
      next();
    }
  );
}
//////////////////////////////////////////////////////////////////////////////
function checkForSpecialChar(string) {
  var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,/~`-=";
  for (i = 0; i < specialChars.length; i++) {
    if (string.indexOf(specialChars[i]) > -1) {
      return true;
    }
  }
  return false;
}
////////////////// update payment plan amount function /////////////////////
function updatepaymentplanamount(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;
  var paymenttype = req.body.paymenttype;
  var particulars = req.body.particulars;
  var amount = req.body.amount;
  var discount = req.body.discount;

  if (
    checkForSpecialChar(amount) == false &&
    checkForSpecialChar(discount) == false
  ) {
    let post = { amount: parseFloat(amount), discount: parseFloat(discount) };
    let sql =
      "UPDATE payment_tbl SET ? WHERE schoollevelcol = ? AND yearlevelcol = ? AND payment_typecol =? AND particularcol = ?";
    db.query(
      sql,
      [post, schoollevel, yearlevel, paymenttype, particulars],
      (err, results) => {
        if (err) throw err;
        console.log("Number of records updated: " + results.affectedRows);
        next();
      }
    );
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
/////////////////////////////////////////////////////////////////////

/////////////////////////// display specific payment plan amount /////////////////////////
router.get("/displaypaymenttype", displaypaymenttype, (req, res) => {
  console.log("displaying payment type");
  res.end();
});
//////////////////////////////////////////////////////////////////////

/////////////////////////// display specific payment plan amount /////////////////////////
router.get(
  "/displayspecificpaymentplanamount",
  displayspecificpaymentplanamount,
  (req, res) => {
    console.log("displaying payment plan amount table");
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

////////////////////////// update payment plan amount ///////////////////////
router.post(
  "/updatepaymentplanamount",
  upload.none(),
  updatepaymentplanamount,
  (req, res) => {
    console.log("update payment plan amount");
    activitylog(res.locals.currentid, "updated payment plan amount");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

module.exports = router;
