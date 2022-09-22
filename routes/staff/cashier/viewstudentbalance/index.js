const express = require("express");
const fs = require("fs");
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

//////////////////// notifications //////////////////
const { notification } = require("../../modulelibrary/msgnotifications");
/////////////////////////////////////////////////////

////////////////// checking view student balance module //////////////////
function cashiermodule(req, res, next) {
  let sql =
    "SELECT view_stdnt_blnce FROM cashier_module WHERE view_stdnt_blnce=? AND id=?";
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
router.use(cashiermodule);
/////////////////////////////////////////////////////////////////////////

////////////////// display schoollevel function ///////////////////
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

////////////////////// display yearlevel function ///////////////////
function displayyearlevel(req, res, next) {
  var schoollevel = req.query.schoollevel;
  let sql = "SELECT yearlevelcol FROM year_level WHERE schoollevelcol=?";
  db.query(sql, [schoollevel], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
/////////////////////////////////////////////////////////////////////

//////////////////////// display table function /////////////////////
function displaytable(req, res, next) {
  var schoollevel = req.query.schoollevel;
  var yearlevel = req.query.yearlevel;
  let sql =
    "SELECT balance_payment_tbl.superid, student_tbl.lastname, student_tbl.firstname, " +
    "assessment_payment_stdnt_tbl.schoollevelcol, " +
    "assessment_payment_stdnt_tbl.yearlevelcol " +
    "FROM (((student_balance_tbl " +
    "INNER JOIN assessment_payment_stdnt_tbl " +
    "ON student_balance_tbl.assessmentid=assessment_payment_stdnt_tbl.superid) " +
    "INNER JOIN balance_payment_tbl " +
    "ON student_balance_tbl.superid=balance_payment_tbl.studentbalanceid) " +
    "INNER JOIN student_tbl " +
    "ON student_balance_tbl.id=student_tbl.id) " +
    "WHERE assessment_payment_stdnt_tbl.schoollevelcol=? " +
    "AND assessment_payment_stdnt_tbl.yearlevelcol=?";
  db.query(sql, [schoollevel, yearlevel], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.displaytable = JSON.stringify(results);
    } else {
      res.locals.displaytable = JSON.stringify([{ id: "invalid" }]);
    }
    next();
  });
}
/////////////////////////////////////////////////////////////////////
////////////////////////////// id filter /////////////////////////////////
function idfilter(req, res, next) {
  var idnumber = req.query.idnumber;
  let sql =
    "SELECT balance_payment_tbl.superid,student_tbl.lastname, student_tbl.firstname, " +
    "assessment_payment_stdnt_tbl.schoollevelcol, " +
    "assessment_payment_stdnt_tbl.yearlevelcol " +
    "FROM (((student_balance_tbl " +
    "INNER JOIN assessment_payment_stdnt_tbl " +
    "ON student_balance_tbl.assessmentid=assessment_payment_stdnt_tbl.superid) " +
    "INNER JOIN balance_payment_tbl " +
    "ON student_balance_tbl.superid=balance_payment_tbl.studentbalanceid) " +
    "INNER JOIN student_tbl " +
    "ON student_balance_tbl.id=student_tbl.id) " +
    "WHERE student_balance_tbl.id=?";
  db.query(sql, [idnumber], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
//////////////////////////////////////////////////////////////////////////

////////////////////////// display specific table ////////////////////////
function displayspecifictable(req, res, next) {
  var superid = req.query.superid;
  console.log(superid);
  let sql =
    "SELECT student_tbl.id,student_tbl.lastname, student_tbl.firstname, " +
    "student_info.picture, balance_payment_tbl.paymentmethodcol, " +
    "balance_payment_tbl.filename, balance_payment_tbl.amount, " +
    "student_balance_tbl.id, student_balance_tbl.totalbalance, " +
    "assessment_payment_stdnt_tbl.schoollevelcol, " +
    "assessment_payment_stdnt_tbl.yearlevelcol, " +
    "assessment_payment_stdnt_tbl.paymenttypecol, " +
    "student_personal_info.birthdate, " +
    "student_personal_info.gender, " +
    "student_personal_info.address, " +
    "student_personal_info.contact_no " +
    "FROM (((((student_balance_tbl " +
    "INNER JOIN " +
    "assessment_payment_stdnt_tbl " +
    "ON student_balance_tbl.assessmentid=assessment_payment_stdnt_tbl.superid) " +
    "INNER JOIN " +
    "student_info " +
    "ON student_balance_tbl.id=student_info.id) " +
    "INNER JOIN " +
    "student_tbl " +
    "ON student_balance_tbl.id=student_tbl.id) " +
    "INNER JOIN " +
    "balance_payment_tbl " +
    "ON student_balance_tbl.superid=balance_payment_tbl.studentbalanceid) " +
    "INNER JOIN " +
    "student_personal_info " +
    "ON student_personal_info.id=student_balance_tbl.id) " +
    "WHERE balance_payment_tbl.superid=?";
  db.query(sql, [superid], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
//////////////////////////////////////////////////////////////////////////

/////////////////////////// get id first /////////////////////////////////
function getinfo(req, res, next) {
  var superid = req.query.superid;
  let sql =
    "SELECT student_balance_tbl.id, " +
    "assessment_payment_stdnt_tbl.schoollevelcol, " +
    "assessment_payment_stdnt_tbl.yearlevelcol, " +
    "assessment_payment_stdnt_tbl.paymenttypecol " +
    "FROM ((student_balance_tbl " +
    "INNER JOIN assessment_payment_stdnt_tbl " +
    "ON student_balance_tbl.assessmentid=assessment_payment_stdnt_tbl.superid) " +
    "INNER JOIN balance_payment_tbl " +
    "ON student_balance_tbl.superid=balance_payment_tbl.studentbalanceid) " +
    "WHERE balance_payment_tbl.superid=?";
  db.query(sql, [superid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.getid = results[0].id;
      res.locals.schoollevel = results[0].schoollevelcol;
      res.locals.yearlevel = results[0].yearlevelcol;
      res.locals.paymenttype = results[0].paymenttypecol;
    }
    next();
  });
}
//////////////////////////////////////////////////////////////////////////

//////////////////////// delete all balance table ////////////////////////
function deleteallbalancetable(myidnum) {
  let sql =
    "DELETE student_balance_tbl, balance_payment_tbl " +
    "FROM student_balance_tbl " +
    "INNER JOIN balance_payment_tbl " +
    "ON student_balance_tbl.id=balance_payment_tbl.id " +
    "WHERE student_balance_tbl.id = ?";
  db.query(sql, [myidnum], (err, results, fields) => {
    if (err) throw err;
    else console.log("deleted records:" + results.affectedRows);
  });
}
//////////////////////////////////////////////////////////////////////////

function deletefilesfunct(file) {
  fs.unlink("./uploads/" + file, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("deleted file");
  });
}

///////////////////// get all proof payment filenames ////////////////
function getallproofpaymentfiles(idnumber) {
  let sql = "SELECT filename FROM balance_payment_tbl " + "WHERE id=?";
  db.query(sql, [idnumber], (err, results, fields) => {
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        deleteallbalancetable(idnumber);
        deletefilesfunct(results[i].filename);
      }
    }
  });
}
//////////////////////////////////////////////////////////////////////

///////////////////// approve student balance function ///////////////////
function payremainingstudentbalance(req, res, next) {
  if (res.locals.totalbalance > 0) {
    let post = { totalbalance: res.locals.totalbalance };
    let sql = "UPDATE student_balance_tbl SET ? " + "WHERE id = ?";
    db.query(sql, [post, res.locals.getid], (err, results) => {
      if (err) throw err;
      console.log("Number of records updated: " + results.affectedRows);
      next();
    });
  } else {
    getallproofpaymentfiles(res.locals.getid);
    next();
  }
}
//////////////////////////////////////////////////////////////////////////

////////////////// display total payment plans function ///////////////////
function displaytotalpaymentplans(req, res, next) {
  var schoollevel = res.locals.schoollevel;
  var yearlevel = res.locals.yearlevel;
  var paymenttype = res.locals.paymenttype;
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
  var schoollevel = res.locals.schoollevel;
  var yearlevel = res.locals.yearlevel;
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

/////////////////////////// display schoollevel //////////////////////////
router.get("/displayschoollevel", displayschoollevel, (req, res) => {
  console.log("displaying schoollevel");
  res.end();
});
//////////////////////////////////////////////////////////////////////////

/////////////////////////// display yearlevel ////////////////////////////
router.get("/displayyearlevel", displayyearlevel, (req, res) => {
  console.log("displaying yearlevel");
  res.end();
});
//////////////////////////////////////////////////////////////////////////

////////////////////////////// display table /////////////////////////////
router.get("/displaytable", displaytable, (req, res) => {
  console.log("displaying table");
  res.send(res.locals.displaytable);
  res.end();
});
//////////////////////////////////////////////////////////////////////////

////////////////////////////// display table /////////////////////////////
router.get("/filterbyid", idfilter, (req, res) => {
  console.log("displaying id filter table");
  res.end();
});
//////////////////////////////////////////////////////////////////////////

///////////////////////// display specific table /////////////////////////
router.get("/displayspecifictable", displayspecifictable, (req, res) => {
  console.log("displaying specific table");
  res.end();
});
//////////////////////////////////////////////////////////////////////////

/////////////////////////// display total balance ////////////////////////
router.get(
  "/displayallbalancepayment",
  getinfo,
  displaytotalpaymentplans,
  displaytotalotherfees,
  (req, res) => {
    console.log("displaying total payments and balance");
    res.send(
      JSON.stringify([
        {
          totalpayments: res.locals.totalamount,
        },
      ])
    );
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////////

function getstudentcomputedbalance(req, res, next) {
  let sql =
    "SELECT student_balance_tbl.totalbalance, SUM(balance_payment_tbl.amount) " +
    "FROM student_balance_tbl " +
    "INNER JOIN balance_payment_tbl " +
    "ON student_balance_tbl.id=balance_payment_tbl.id " +
    "WHERE student_balance_tbl.id=?";
  db.query(sql, [res.locals.getid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.totalbalance = results[0].totalbalance - results[0].amount;
      next();
    }
  });
}
///////////////////////// display total balance //////////////////////////
router.get(
  "/approvebalance",
  getinfo,
  getstudentcomputedbalance,
  payremainingstudentbalance,
  (req, res) => {
    console.log("approving student balance");
    activitylog(res.locals.currentid, "approve student balance");
    let finamessage =
      "[Notification]\n" +
      "Cashier has paid your balance payment." +
      "\n" +
      formatAMPM(new Date());
    notification(res.locals.getid, "Cashier", "message", finamessage);
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////////
function getid(req, res, next) {
  let superid = req.query.superid;
  let sql = "SELECT id " + "FROM balance_payment_tbl " + "WHERE superid=?";
  db.query(sql, [superid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.getid = results[0].id;
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}
////////////////////////// send message enrollee //////////////////
router.get("/sendmessageenrollee", getid, (req, res) => {
  console.log("Send message enrollee");
  activitylog(res.locals.currentid, "sent message enrollee");
  let finamessage =
    "[Message]\n" + req.query.message + "\n" + formatAMPM(new Date());
  notification(res.locals.getid, "Cashier", "message", finamessage);
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
///////////////////////////////////////////////////////////////////

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

module.exports = router;
