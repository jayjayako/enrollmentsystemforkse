var db = require("../modulelibrary/databaseconn");
const { generateid } = require("../modulelibrary/idgenerator");
const { date_time, intyear } = require("../modulelibrary/date_time");

///////////////////////// loggedin ///////////////////////////////////
function loggedin(userid, ipaddress) {
  try {
    if (ipaddress) {
      var mysuperid = generateid();

      let post = {
        superid: mysuperid,
        id: userid,
        time: date_time(),
        loginout: "loggedin",
        usertype: "student",
        ip_address: ipaddress,
        year: intyear(),
      };
      let sql = "INSERT INTO log_history SET ?";
      db.query(sql, post, (err, results) => {
        if (err) throw err;
        console.log("Added to log history " + results.affectedRows);
      });
    } else {
      loggedin(userid, "127.0.0.1");
    }
  } catch (error) {
    loggedin(userid, "127.0.0.1");
  }
}
////////////////////////////////////////////////////////////////////////

///////////////////////// loggedout ///////////////////////////////////
function loggedout(userid, ipaddress) {
  try {
    if (ipaddress) {
      var mysuperid = generateid();
      let post = {
        superid: mysuperid,
        id: userid,
        time: date_time(),
        loginout: "loggedout",
        usertype: "student",
        ip_address: ipaddress,
        year: intyear(),
      };
      let sql = "INSERT INTO log_history SET ?";
      db.query(sql, post, (err, results) => {
        if (err) throw err;
        console.log("Added to log history " + results.affectedRows);
      });
    } else {
      loggedout(userid, "127.0.0.1");
    }
  } catch (error) {
    loggedout(userid, "127.0.0.1");
  }
}
////////////////////////////////////////////////////////////////////////

module.exports = {
  loggedin: loggedin,
  loggedout: loggedout,
};
