const express = require("express");
////////////////////////////////////////////////////////
// initialize router
const router = express.Router();
////////////////////////////////////////////////////////

var db = require("../../modulelibrary/databaseconn");
const { generateid } = require("../../modulelibrary/idgenerator");
//////////////////// activity log ///////////////////
const { activitylog } = require("../../modulelibrary/activitylog");
/////////////////////////////////////////////////////
//////////////////// notifications //////////////////
const { notification } = require("../../modulelibrary/msgnotifications");
/////////////////////////////////////////////////////

function displaytable(req, res, next) {
  let sql =
    "SELECT inquiries_tbl.superid, student_tbl.lastname, student_tbl.firstname " +
    "FROM inquiries_tbl INNER JOIN student_tbl " +
    "ON inquiries_tbl.id = student_tbl.id";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.locals.mydata = JSON.stringify(results);
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}

function displayspecificinfo(req, res, next) {
  let superid = req.query.superid;
  let sql =
    "SELECT inquiries_tbl.id, student_tbl.lastname, student_info.picture, " +
    "student_tbl.firstname, inquiries_tbl.message " +
    "FROM ((inquiries_tbl INNER JOIN student_tbl " +
    "ON inquiries_tbl.id = student_tbl.id) " +
    "INNER JOIN student_info ON inquiries_tbl.id = student_info.id) " +
    "WHERE inquiries_tbl.superid=?";
  db.query(sql, [superid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.mydata2 = JSON.stringify(results);
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}

function getid(req, res, next) {
  let superid = req.query.superid;
  let sql = "SELECT id " + "FROM inquiries_tbl " + "WHERE superid=?";
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

function approve(req, res, next) {
  let post = {
    superid: generateid(),
    id: res.locals.getid,
    approval: "approved",
  };
  let sql = "INSERT INTO reserved_tbl SET ?";
  db.query(sql, [post], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    deletereservation(res.locals.getid);
    next();
  });
}

function deletereservation(idnum) {
  let sql = "DELETE FROM inquiries_tbl WHERE id = ?";
  db.query(sql, [idnum], (err, results, fields) => {
    if (err) throw err;
    else console.log("deleted records:" + results.affectedRows);
  });
}

/////////////////////////// display table //////////////////////
router.get("/displaytable", displaytable, (req, res) => {
  console.log("displaying table");
  res.send(res.locals.mydata);
  res.end();
});
//////////////////////////////////////////////////////////////////

/////////////////////////// display specific info //////////////////
router.get("/displayspecificinfo", displayspecificinfo, (req, res) => {
  console.log("displaying specific info");
  res.send(res.locals.mydata2);
  res.end();
});
//////////////////////////////////////////////////////////////////

/////////////////////////// approve enrollee /////////////////////
router.get("/approve", getid, approve, (req, res) => {
  console.log("approved enrollee");
  activitylog(res.locals.currentid, "approved reservation enrollee");
  let finamessage =
    "[Notification]\n" +
    "Your Inquiries has approved by registrar." +
    "\n" +
    formatAMPM(new Date());
  notification(res.locals.getid, "inquiry", "approved", finamessage);
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////

////////////////////////// delete reservation ////////////////////
router.get("/deletereserve", getid, (req, res) => {
  deletereservation(res.locals.getid);
  console.log("Deleted reservations enrollee");
  activitylog(res.locals.currentid, "deleted enrollee");
  let finamessage =
    "[Notification]\n" +
    "Your Inquiries has deleted by registrar." +
    "\n" +
    formatAMPM(new Date());
  notification(res.locals.getid, "inquiry", "notapproved", finamessage);
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////
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
