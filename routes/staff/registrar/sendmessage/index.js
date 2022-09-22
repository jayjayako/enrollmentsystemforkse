const express = require("express");
////////////////////////////////////////////////////////
// initialize router
const router = express.Router();
////////////////////////////////////////////////////////

var db = require("../../modulelibrary/databaseconn");
//////////////////// activity log ///////////////////
const { activitylog } = require("../../modulelibrary/activitylog");
/////////////////////////////////////////////////////
//////////////////// notifications //////////////////
const { notification } = require("../../modulelibrary/msgnotifications");
/////////////////////////////////////////////////////

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
///////////////////////// message enrollee ///////////////////////
router.get("/sendmessageenrollee", getid, (req, res) => {
  console.log("Send message enrollee");
  activitylog(res.locals.currentid, "sent message enrollee");
  let finamessage =
    "[Message]\n" + req.query.message + "\n" + formatAMPM(new Date());
  notification(res.locals.getid, req.query.msgtype, "message", finamessage);
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////

module.exports = router;
