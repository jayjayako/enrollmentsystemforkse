var db = require("./databaseconn");
const { generateid } = require("./idgenerator");
const { date_time, intyear } = require("./date_time");

function activitylog(currentid, activities) {
  var mysuperid = generateid();

  let post = {
    superid: mysuperid,
    id: currentid,
    time: date_time(),
    activities: activities,
    usertype: "staff",
    year: intyear(),
  };
  let sql = "INSERT INTO activity_log SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("Added to activity log " + results.affectedRows);
  });
}

module.exports = {
  activitylog: activitylog,
};
