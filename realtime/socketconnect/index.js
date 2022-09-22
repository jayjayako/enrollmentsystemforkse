var cookie = require("cookie");
var { authenticate } = require("./socketvalidation");
const {
  encodethecookie,
  decypherthecookie,
} = require("../../modulelibrary/encryption");
const db = require("../../modulelibrary/databaseconn");
function socketconn(socket, socketmessage, io) {
  /////////////////// for connection //////////////////
  socket.on("socketconnect", (data) => {
    /////////////////// for web based ///////////////////
    if (data.mobileid == "none") {
      try {
        var cookies = cookie.parse(socket.handshake.headers.cookie);
        var sessionid = decypherthecookie(cookies.sessionid);
        // put database here
        let sql = "SELECT id FROM session_tbl WHERE session_id = ?";
        db.query(sql, [sessionid], (err, results, fields) => {
          if (results.length > 0) {
            authenticate(
              io,
              socket,
              socketmessage,
              results[0].id,
              data.type,
              data.destination,
              data.messagetype
            );
          } else {
            console.log("Access Denied");
          }
        });
      } catch (error) {
        console.log("Invalid");
      }
    }
    /////////////////// for mobile based ///////////////////
    if (data.mobileid != "none") {
      try {
        var cookies = cookie.parse(data.mobileid);
        // put database here
        var sessionid = decypherthecookie(cookies);
        // put database here
        let sql = "SELECT id FROM session_tbl WHERE session_id = ?";
        db.query(sql, [sessionid], (err, results, fields) => {
          if (results.length > 0) {
            authenticate(
              io,
              socket,
              socketmessage,
              results[0].id,
              data.type,
              data.destination,
              data.messagetype
            );
          } else {
            console.log("Access Denied");
          }
        });
      } catch (error) {
        console.log("Invalid");
      }
    }
    ///////////////////////////////////////////////////
  });
  /////////////////////////////////////////////////////
}

module.exports = {
  socketconn: socketconn,
};
