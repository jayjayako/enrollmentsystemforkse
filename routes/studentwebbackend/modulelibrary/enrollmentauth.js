var db = require("./databaseconn");
const fs = require("fs");

/////////////////// check student if valid for enrollment ////////////////
function enrollmentsched(req, res, next) {
  var m = new Date();
  var d = new Date();

  let sql =
    'SELECT frommonth,fromday,tomonth,today FROM enrollment_sched_tbl WHERE id = "1"';
  db.query(sql, (err, results, fields) => {
    var fromdaystr,
      todaystr,
      tempfrommonthday,
      temptomonthday,
      tempcurmonthcurday;
    if (results.length > 0) {
      var frommonth = results[0].frommonth;
      var tomonth = results[0].tomonth;
      var fromday = results[0].fromday;
      var today = results[0].today;
      if (fromday < 10 && fromday >= 0) {
        fromdaystr = "" + "0" + fromday;
        tempfrommonthday = "" + frommonth + fromdaystr;
      } else if (fromday >= 10) {
        tempfrommonthday = "" + frommonth + fromday;
      }

      if (today < 10 && today >= 0) {
        todaystr = "" + "0" + today;
        temptomonthday = "" + tomonth + todaystr;
      } else if (today >= 10) {
        temptomonthday = "" + tomonth + today;
      }

      var finaltempfrommonthday = Number(tempfrommonthday);
      var finaltemptomonthday = Number(temptomonthday);
      var curmonth = m.getMonth() + 1;
      var curday = d.getDate();

      if (curday < 10 && curday >= 0) {
        curdaystr = "" + "0" + curday;
        tempcurmonthcurday = "" + curmonth + curdaystr;
      } else if (curday >= 10) {
        tempcurmonthcurday = "" + curmonth + curday;
      }

      var finaltempcurmonthcurday = Number(tempcurmonthcurday);

      if (
        finaltempfrommonthday <= finaltempcurmonthcurday + 1 &&
        finaltemptomonthday >= finaltempcurmonthcurday
      ) {
        res.locals.enrollmentsched = "opened";
      } else {
        res.locals.enrollmentsched = "closed";
      }
    } else {
      res.locals.enrollmentsched = "invalid";
    }
    next();
  });
}

function checkstudentifbalance(req, res, next) {
  let sql = "SELECT id FROM student_balance_tbl WHERE id = ?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.enrollbalance = "invalid";
    } else {
      res.locals.enrollbalance = "valid";
    }
    next();
  });
}

function checkstudentenrollment(req, res, next) {
  let d = new Date();
  let year = d.getFullYear();
  let sql =
    "SELECT student_personal_info.id, masterlist_tbl.schoolyear " +
    "FROM ((student_personal_info " +
    "INNER JOIN assessment_payment_stdnt_tbl " +
    "ON student_personal_info.id=assessment_payment_stdnt_tbl.id) " +
    "INNER JOIN masterlist_tbl " +
    "ON student_personal_info.id=masterlist_tbl.id) " +
    "WHERE masterlist_tbl.id = ?";
  db.query(sql, [res.locals.currentid, year], (err, results, fields) => {
    if (results.length > 0) {
      if (parseInt(year) > parseInt(results[0].schoolyear)) {
        res.locals.enrollhistory = "valid";
      } else {
        res.locals.enrollhistory = "invalid";
      }
    } else {
      res.locals.enrollhistory = "valid";
    }
    next();
  });
}

////////////////////////////// delete files /////////////////////////////
function deletefilesfunct(file) {
  fs.unlink("./uploads/" + file, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("deleted file");
  });
}
/////////////////////////////////////////////////////////////////////////

////////////////////////////// delete filenames /////////////////////////
function deletefilename(file) {
  let sql = "DELETE FROM student_files WHERE filename=?";
  db.query(sql, file, (err, results) => {
    if (err) throw err;
    console.log("Number of records Deleted: " + results.affectedRows);
  });
}
/////////////////////////////////////////////////////////////////////////

////////////////////////////////// check if exist //////////////////////////////////////////
function checkifexist(req, res, next) {
  var studentid = res.locals.currentid;
  let sql =
    "SELECT student_personal_info.id, student_files.filename " +
    "FROM student_personal_info " +
    "INNER JOIN student_files " +
    "ON student_personal_info.id=student_files.id " +
    "WHERE student_personal_info.id = ? AND student_personal_info.approval=?";
  db.query(sql, [studentid, "notapproved"], (err, results, fields) => {
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        deletefilesfunct(results[i].filename);
        deletefilename(results[i].filename);
      }
      next();
    } else {
      next();
    }
  });
}
////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////

module.exports = {
  enrollmentsched: enrollmentsched,
  checkstudentifbalance: checkstudentifbalance,
  checkstudentenrollment: checkstudentenrollment,
  checkifexist: checkifexist,
};
