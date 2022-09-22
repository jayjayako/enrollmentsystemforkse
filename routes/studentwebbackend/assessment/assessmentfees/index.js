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

//////////////////////////////// TUITION AND OTHER FEES ////////////////////////////
///////////////////////////// display payment plans function ///////////////////
function displaypaymentplans(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  let sql =
    "SELECT payment_typecol AS paymenttype, SUM(amount) " +
    "AS amount, TRUNCATE(discount, 0) AS discount FROM payment_tbl " +
    "WHERE schoollevelcol=? AND yearlevelcol=? GROUP BY payment_typecol;";
  db.query(sql, [schoollevel, yearlevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

////////////////// display other fees function ///////////////////
function displayotherfees(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  let sql =
    "SELECT particularscol AS particular, amountcol AS amount FROM other_fees_tbl " +
    "WHERE schoollevelcol=? AND yearlevelcol=?";
  db.query(sql, [schoollevel, yearlevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

///////////////////////////// SELECT TYPE OF PAYMENT ///////////////////////
//////////////////////////////////// display payment type ///////////////////////////////
function displaypaymenttype(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  let sql =
    "SELECT DISTINCT payment_typecol FROM payment_tbl WHERE schoollevelcol = ? AND yearlevelcol = ?";
  db.query(sql, [schoollevel, yearlevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////// display table /////////////////////////////////
function displaypaymenttypetable(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  var paymenttype = req.query.paymenttype;
  let sql =
    "SELECT payment_typecol AS paymenttype, particularcol AS particular, amount-(amount*(discount*0.01)) AS finalamount FROM payment_tbl WHERE schoollevelcol = ? AND yearlevelcol = ? AND payment_typecol=?";
  db.query(
    sql,
    [schoollevel, yearlevel, paymenttype],
    (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify(results));
      }
      next();
    }
  );
}
////////////////////////////////////////////////////////////////////////////////////

////////////////// display total payment plans function ///////////////////
function displaytotalpaymentplans(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  var paymenttype = req.query.paymenttype;
  let sql =
    "SELECT SUM(amount-(amount*(discount*0.01))) " +
    "AS amount FROM payment_tbl WHERE schoollevelcol=? AND " +
    "yearlevelcol=? AND payment_typecol=? GROUP BY payment_typecol;";
  db.query(
    sql,
    [schoollevel, yearlevel, paymenttype],
    (err, results, fields) => {
      if (results.length > 0) {
        res.locals.totalpaymentplans = results[0].amount;
      }
      next();
    }
  );
}
////////////////////////////////////////////////////////////////////
////////////////// display total other fees function ///////////////////
function displaytotalotherfees(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  let sql =
    "SELECT SUM(amountcol) AS amount FROM other_fees_tbl " +
    "WHERE schoollevelcol=? AND yearlevelcol=?";
  db.query(sql, [schoollevel, yearlevel], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.totalamount = res.locals.totalpaymentplans + results[0].amount;
      console.log(res.locals.totalamount);
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//////////////////////////////// TUITION AND OTHER FEES ////////////////////////////
/////////////////////////// display payment plans /////////////////////////
router.get("/displaypaymentplans", displaypaymentplans, (req, res) => {
  console.log("displaying payment plans");
  res.end();
});
////////////////////////////////////////////////////////////////////

/////////////////////////// display other fees /////////////////////////
router.get("/displayotherfees", displayotherfees, (req, res) => {
  console.log("displaying other fees");
  res.end();
});
////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////// SELECT TYPE OF PAYMENT ////////////////////////////

//////////////////////////////////// display payment type ///////////////////////////////
router.get("/displaypaymenttype", displaypaymenttype, (req, res) => {
  console.log("displaying payment type");
  res.end();
});
/////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////// display table //////////////////////////////////////
router.get("/displaypaymenttypetable", displaypaymenttypetable, (req, res) => {
  console.log("displaying payment type table");
  res.end();
});
/////////////////////////////////////////////////////////////////////////////////////////

////////////////////////// display total payment plans and other fees ///////////////////
router.get(
  "/displaytotalpaymentplansotherfees",
  displaytotalpaymentplans,
  displaytotalotherfees,
  (req, res) => {
    console.log("displaying total payment plans and other fees");
    res.send(
      JSON.stringify([
        {
          amount: res.locals.totalamount
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
        },
      ])
    );
    res.end();
  }
);
////////////////////////////////////////////////////////////////////

function checkassessmentstudent(req, res, next) {
  var superid = req.query.superid;
  let sql =
    "SELECT notifications_tbl.id FROM " +
    "notifications_tbl " +
    "INNER JOIN assessment_payment_stdnt_tbl " +
    "ON notifications_tbl.id=assessment_payment_stdnt_tbl.id " +
    "WHERE notifications_tbl.superid=? AND assessment_payment_stdnt_tbl.approval=?";
  db.query(sql, [superid, "approved"], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.status = "invalid";
    } else {
      res.locals.status = "valid";
    }
    next();
  });
}

////////////////////// check student if have assessment //////////////////
router.get("/checkassessmentstudent", checkassessmentstudent, (req, res) => {
  res.send(JSON.stringify([{ id: res.locals.status }]));
  res.end();
});
/////////////////////////////////////////////////////////////////////////

module.exports = router;
