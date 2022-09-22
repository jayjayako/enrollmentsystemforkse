var db = require("./databaseconn");
const { generateid } = require("./idgenerator");

function notification(currentid, enrollmenttype, stats, content) {
  var mysuperid = generateid();

  let post = {
    superid: mysuperid,
    id: currentid,
    enrolltype: enrollmenttype,
    status: stats,
    content: content,
  };
  let sql = "INSERT INTO notifications_tbl SET ?";
  db.query(sql, [post], (err, results) => {
    if (err) throw err;
    console.log("Added to activity log " + results.affectedRows);
  });
}

module.exports = {
  notification: notification,
};
