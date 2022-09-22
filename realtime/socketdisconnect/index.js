var cookie = require("cookie");
var { disconnvalidate } = require("./socketdisconn");
const {
  encodethecookie,
  decypherthecookie,
} = require("../../modulelibrary/encryption");
const db = require("../../modulelibrary/databaseconn");
function socketdissconn(socket, socketmessage, io) {
  /////////////////// for connection //////////////////
  socket.on("disconnect", (data) => {
    /////////////////// for web based ///////////////////
    var cookies;
    var sessionid;
    try {
      cookies = cookie.parse(socket.handshake.headers.cookie);
      sessionid = decypherthecookie(cookies.sessionid);
      // put database here
    } catch (error) {
      console.log("Invalid");
    }
    let sql = "SELECT id FROM session_tbl WHERE session_id = ?";
    db.query(sql, [sessionid], (err, results, fields) => {
      if (results.length > 0) {
        disconnvalidate(socket.id, socketmessage, results[0].id);
      } else {
        console.log("Access Denied");
      }
    });
  });
  /////////////////////////////////////////////////////
}

module.exports = {
  socketdissconn: socketdissconn,
};
