var { disconnect } = require("./disconnection");
const db = require("../../modulelibrary/databaseconn");
function disconnvalidate(socketId, socketmessage, currentid) {
  function delayedlogout(socketid, userid) {
    let sql = "SELECT socketid FROM connection_tbl WHERE id = ?";
    db.query(sql, [userid], (err, results, fields) => {
      if (results.length > 0) {
        disconnect(socketid, userid, results[0].socketid);
      }
    });
  }
  function autologout(socketid, userid) {
    setTimeout(delayedlogout, 5000, socketid, userid);
  }
  autologout(socketId, currentid);
  console.log("disconnected " + socketId);
}

module.exports = {
  disconnvalidate: disconnvalidate,
};
