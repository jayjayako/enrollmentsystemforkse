var db = require("./databaseconn");
const { generateid } = require("./idgenerator");
const { date_time, intyear } = require("./date_time");

///////////////////////// loggedin ///////////////////////////////////
function loggedin(userid, ipaddress, position) {
  try {
    if (ipaddress) {
      var mysuperid = generateid();

      let post = {
        superid: mysuperid,
        id: userid,
        time: date_time(),
        loginout: "loggedin",
        usertype: position,
        ip_address: ipaddress,
        year: intyear(),
      };
      let sql = "INSERT INTO log_history SET ?";
      db.query(sql, post, (err, results) => {
        if (err) throw err;
        console.log("Added to log history " + results.affectedRows);
      });
    } else {
      loggedin(userid, "127.0.0.1", position);
    }
  } catch (error) {
    loggedin(userid, "127.0.0.1", position);
  }
}
////////////////////////////////////////////////////////////////////////

///////////////////////// loggedout ///////////////////////////////////
function loggedout(userid, ipaddress, position) {
  try {
    if (ipaddress) {
      var mysuperid = generateid();

      let post = {
        superid: mysuperid,
        id: userid,
        time: date_time(),
        loginout: "loggedout",
        usertype: position,
        ip_address: ipaddress,
        year: intyear(),
      };
      let sql = "INSERT INTO log_history SET ?";
      db.query(sql, post, (err, results) => {
        if (err) throw err;
        console.log("Added to log history " + results.affectedRows);
      });
    } else {
      loggedout(userid, "127.0.0.1", position);
    }
  } catch (error) {
    loggedout(userid, "127.0.0.1", position);
  }
}
////////////////////////////////////////////////////////////////////////

module.exports = {
  loggedin: loggedin,
  loggedout: loggedout,
};
