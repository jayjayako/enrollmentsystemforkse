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

////////////////// display payment method function ///////////////////
function displaypaymentmethod(req, res, next) {
  let sql = "SELECT paymentmethodcol FROM paymentmethod_tbl";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

////////////////// display specific payment method function ///////////////////
function displayspecificpaymentmethod(req, res, next) {
  var paymentmethod = req.query.paymentmethod;
  let sql =
    "SELECT paymentmethodcol,accountnamecol,accountnumbercol FROM paymentmethod_tbl WHERE paymentmethodcol = ?";
  db.query(sql, [paymentmethod], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

////////////////// insert payment method function ///////////////////
function inserpaymentmethod(req, res, next) {
  var paymentmethod = req.body.paymentmethod;
  var accountname = req.body.accountname;
  var accountnumber = req.body.accountnumber;

  let post = {
    paymentmethodcol: paymentmethod,
    accountnamecol: accountname,
    accountnumbercol: accountnumber,
  };
  let sql = "INSERT INTO paymentmethod_tbl SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted:" + results.affectedRows);
  });
  next();
}
////////////////////////////////////////////////////////////////////

////////////////// delete payment method function /////////////////////
function deletepaymentmethod(req, res, next) {
  var paymentmethod = req.body.paymentmethod;
  let sql = "DELETE FROM paymentmethod_tbl WHERE paymentmethodcol = ?";
  db.query(sql, [paymentmethod], (err, results, fields) => {
    if (err) throw err;
    else console.log("deleted records:" + results.affectedRows);
  });
  next();
}
/////////////////////////////////////////////////////////////////////

/////////////////////////// display payment method /////////////////////////
router.get("/displaypaymentmethod", displaypaymentmethod, (req, res) => {
  console.log("displaying payment method");
  res.end();
});
//////////////////////////////////////////////////////////////////////

/////////////////////////// display specific method /////////////////////////
router.get(
  "/displayspecificpaymentmethod",
  displayspecificpaymentmethod,
  (req, res) => {
    console.log("displaying specific payment method");
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

/////////////////////////// check if empty ///////////////////////
function inserpaymentmethodcheckifempty(req, res, next) {
  try {
    if (
      req.body.paymentmethod != "" &&
      req.body.paymentmethod != "undefined" &&
      req.body.paymentmethod &&
      req.body.accountname != "" &&
      req.body.accountname != "undefined" &&
      req.body.accountname &&
      req.body.accountnumber != "" &&
      req.body.accountnumber != "undefined" &&
      req.body.accountnumber
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

/////////////////////////// check if empty ///////////////////////
function deletepaymentmethodcheckifempty(req, res, next) {
  try {
    if (
      req.body.paymentmethod != "" &&
      req.body.paymentmethod != "undefined" &&
      req.body.paymentmethod
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

////////////////////////// insert payment method /////////////////////
router.post(
  "/inserpaymentmethod",
  upload.none(),
  inserpaymentmethodcheckifempty,
  inserpaymentmethod,
  (req, res) => {
    console.log("inserting payment method");
    activitylog(res.locals.currentid, "inserted payment method");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

////////////////////////// delete payment method ///////////////////////
router.post(
  "/deletepaymentmethod",
  upload.none(),
  deletepaymentmethodcheckifempty,
  deletepaymentmethod,
  (req, res) => {
    console.log("deleting payment method");
    activitylog(res.locals.currentid, "deleted payment method");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////

module.exports = router;
