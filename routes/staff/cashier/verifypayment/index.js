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
//////////////////// id generator ///////////////////
const { generateid } = require("../../modulelibrary/idgenerator");
/////////////////////////////////////////////////////
//////////////////// notifications //////////////////
const { notification } = require("../../modulelibrary/msgnotifications");
/////////////////////////////////////////////////////

////////////////// checking verify payment module //////////////////
function cashiermodule(req, res, next) {
  let sql =
    "SELECT verify_payment FROM cashier_module WHERE verify_payment=? AND id=?";
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
    "SELECT assessment_payment_stdnt_tbl.superid, student_tbl.lastname, student_tbl.firstname " +
    "FROM assessment_payment_stdnt_tbl " +
    "INNER JOIN " +
    "student_tbl ON student_tbl.id=assessment_payment_stdnt_tbl.id " +
    "WHERE assessment_payment_stdnt_tbl.schoollevelcol=? " +
    "AND assessment_payment_stdnt_tbl.yearlevelcol=? " +
    "AND assessment_payment_stdnt_tbl.approval=?";
  db.query(
    sql,
    [schoollevel, yearlevel, "notapproved"],
    (err, results, fields) => {
      if (results.length > 0) {
        res.locals.displaytable = JSON.stringify(results);
      } else {
        res.locals.displaytable = JSON.stringify([{ id: "invalid" }]);
      }
      next();
    }
  );
}
/////////////////////////////////////////////////////////////////////
////////////////////// display id filter table //////////////////////
function filterbyid(req, res, next) {
  var id = req.query.idnumber;
  let sql =
    "SELECT assessment_payment_stdnt_tbl.superid, student_tbl.lastname, student_tbl.firstname " +
    "FROM assessment_payment_stdnt_tbl " +
    "INNER JOIN " +
    "student_tbl ON student_tbl.id=assessment_payment_stdnt_tbl.id " +
    "WHERE assessment_payment_stdnt_tbl.id=? " +
    "AND assessment_payment_stdnt_tbl.approval=?";
  db.query(sql, [id, "notapproved"], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.displaytable = JSON.stringify(results);
    } else {
      res.locals.displaytable = JSON.stringify([{ id: "invalid" }]);
    }
    next();
  });
}
/////////////////////////////////////////////////////////////////////
//////////////////// display specific table function ////////////////
function displayspecifictable(req, res, next) {
  var superid = req.query.superid;
  console.log(superid);
  let sql =
    "SELECT student_tbl.id, student_tbl.lastname, student_tbl.firstname, " +
    "student_info.picture, assessment_payment_stdnt_tbl.filename, " +
    "student_personal_info.birthdate, student_personal_info.gender, " +
    "student_personal_info.address, student_personal_info.contact_no, " +
    "assessment_payment_stdnt_tbl.paymenttypecol, " +
    "assessment_payment_stdnt_tbl.paymentmethodcol, " +
    "assessment_payment_stdnt_tbl.amount " +
    "FROM (((student_tbl " +
    "INNER JOIN " +
    "student_personal_info " +
    "ON student_tbl.id=student_personal_info.id) " +
    "INNER JOIN " +
    "assessment_payment_stdnt_tbl " +
    "ON student_tbl.id=assessment_payment_stdnt_tbl.id) " +
    "INNER JOIN " +
    "student_info " +
    "ON student_tbl.id=student_info.id) " +
    "WHERE assessment_payment_stdnt_tbl.superid=? AND assessment_payment_stdnt_tbl.approval=?";
  db.query(sql, [superid, "notapproved"], (err, results, fields) => {
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
    "SELECT superid, id, schoollevelcol, yearlevelcol, paymenttypecol " +
    "FROM assessment_payment_stdnt_tbl WHERE superid=?";
  db.query(sql, [superid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.getassessid = results[0].superid;
      res.locals.getid = results[0].id;
      res.locals.schoollevel = results[0].schoollevelcol;
      res.locals.yearlevel = results[0].yearlevelcol;
      res.locals.paymenttype = results[0].paymenttypecol;
    }
    next();
  });
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
/////////////////////////// get id first /////////////////////////////////
function getstudentbalance(req, res, next) {
  var superid = res.locals.getassessid;
  let sql =
    "SELECT amount " + "FROM assessment_payment_stdnt_tbl WHERE superid=?";
  db.query(sql, [superid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.totalamountbalance =
        res.locals.totalamount - results[0].amount;
      res.locals.initialamount = results[0].amount;
    }
    next();
  });
}
//////////////////////////////////////////////////////////////////////////
/////////////////////////// approve payment //////////////////////////////
function approvepayment(req, res, next) {
  var superid = req.query.superid;
  let post = { approval: "approved" };
  let sql = "UPDATE assessment_payment_stdnt_tbl SET ? " + "WHERE superid = ?";
  db.query(sql, [post, superid], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
}
//////////////////////////////////////////////////////////////////////////

/////////////////////////// insert balance history ///////////////////////
function insertbalancehistory(myid, assessid, amount) {
  let post = {
    superid: generateid(),
    id: myid,
    assessmentid: assessid,
    amount: parseFloat(amount),
  };
  let sql = "INSERT INTO student_balance_history_tbl SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("Added to balance history " + results.affectedRows);
  });
}
//////////////////////////////////////////////////////////////////////////

/////////////////////////// check student balance ////////////////////////
function checkstudentbalance(req, res, next) {
  if (res.locals.totalamountbalance > 0) {
    let sql = "SELECT superid FROM student_balance_tbl " + "WHERE id=?";
    db.query(sql, [res.locals.getid], (err, results, fields) => {
      if (results.length > 0) {
        updatestudentbalance(res.locals.getid, res.locals.totalamountbalance);
      } else {
        insertnewstudentbalance(
          res.locals.totalamountbalance,
          res.locals.getid,
          res.locals.getassessid
        );
      }
    });
    insertbalancehistory(
      res.locals.getid,
      res.locals.getassessid,
      res.locals.initialamount
    );
  }
  next();
}
//////////////////////////////////////////////////////////////////////////

/////////////////////////// update student balance ///////////////////////
function updatestudentbalance(idnum, totalbalance) {
  let post = { totalbalance: totalbalance };
  let sql = "UPDATE student_balance_tbl SET ? " + "WHERE id = ?";
  db.query(sql, [post, idnum], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
  });
}
//////////////////////////////////////////////////////////////////////////

//////////////////////// insert new student balance //////////////////////
function insertnewstudentbalance(totalbalance, myid, assessid) {
  let post = {
    superid: generateid(),
    id: myid,
    assessmentid: assessid,
    totalbalance: totalbalance,
  };
  let sql = "INSERT INTO student_balance_tbl SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("Added to log history " + results.affectedRows);
  });
}
//////////////////////////////////////////////////////////////////////////

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
router.get("/filterbyid", filterbyid, (req, res) => {
  console.log("id filter table");
  res.send(res.locals.displaytable);
  res.end();
});
//////////////////////////////////////////////////////////////////////////
///////////////////////// display specific table /////////////////////////
router.get("/displayspecifictable", displayspecifictable, (req, res) => {
  console.log("displaying specific table");
  res.end();
});
//////////////////////////////////////////////////////////////////////////

///////////////////////// display all payment amount /////////////////////
router.get(
  "/displayallpayment",
  getinfo,
  displaytotalpaymentplans,
  displaytotalotherfees,
  (req, res) => {
    console.log("displaying all payment");
    res.send(JSON.stringify([{ totalamount: res.locals.totalamount }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////////

///////////////////////////// approve payment ////////////////////////////
router.get(
  "/approve",
  getinfo,
  displaytotalpaymentplans,
  displaytotalotherfees,
  getstudentbalance,
  checkstudentbalance,
  approvepayment,
  (req, res) => {
    console.log("staff approve payment");
    activitylog(res.locals.currentid, "approved payment");
    let finamessage =
      "[Notification]\n" +
      "Cashier has approved your payment. You can now proceed to enlistment." +
      "\n" +
      formatAMPM(new Date());
    notification(res.locals.getid, "Enlistment", "approved", finamessage);
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////////

function getid(req, res, next) {
  let superid = req.query.superid;
  let sql =
    "SELECT id " + "FROM assessment_payment_stdnt_tbl " + "WHERE superid=?";
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
  notification(res.locals.getid, "cashier", "message", finamessage);
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
