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

/////////////////////////// check if empty ///////////////////////
function updatepaymentplanamountcheckifempty(req, res, next) {
  try {
    if (
      req.body.schoollevel != "" &&
      req.body.schoollevel != "undefined" &&
      req.body.schoollevel &&
      req.body.yearlevel != "" &&
      req.body.yearlevel != "undefined" &&
      req.body.yearlevel &&
      req.body.paymenttype != "" &&
      req.body.paymenttype != "undefined" &&
      req.body.paymenttype &&
      req.body.particulars != "" &&
      req.body.particulars != "undefined" &&
      req.body.particulars &&
      req.body.amount != "" &&
      req.body.amount != "undefined" &&
      req.body.amount &&
      req.body.discount != "" &&
      req.body.discount != "undefined" &&
      req.body.discount
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

////////////////////////// update payment plan amount ///////////////////////
router.post(
  "/updatepaymentplanamount",
  upload.none(),
  updatepaymentplanamountcheckifempty,
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
