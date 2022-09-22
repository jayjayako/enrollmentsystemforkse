const db = require("../../modulelibrary/databaseconn");
var xss = require("xss");

////////////////////////// send to admin ///////////////////////////
function sendtoeachadmin(sessionid, socketid, datatype, datadest, msgtype) {
  var msgtypefiltered = xss(msgtype);

  let sql =
    "SELECT connection_tbl.socketid FROM " +
    "connection_tbl INNER JOIN admin_info " +
    "ON connection_tbl.id=admin_info.id";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      for (var x in results) {
        socket.to(results[x].socketid).emit("socket-message", {
          messagetype: msgtypefiltered,
        });
      }
    }
  });
}
////////////////////////////////////////////////////////////////////

/////////////////////// send to each client function /////////////////////
function sendtoeachclient(sessionid, socketid, datatype, datadest, msgtype) {
  var msgtypefiltered = xss(msgtype);

  let sql =
    "SELECT connection_tbl.socketid FROM " +
    "connection_tbl INNER JOIN staff_info " +
    "ON connection_tbl.id=staff_info.id " +
    "WHERE staff_info.position = ?";
  db.query(sql, [datadest], (err, results, fields) => {
    if (results.length > 0) {
      for (var x in results) {
        socket.to(results[x].socketid).emit("socket-message", {
          messagetype: msgtypefiltered,
        });
      }
    } else {
      sendtoeachadmin(sessionid, socketid, datatype, datadest, msgtype);
    }
  });
}
//////////////////////////////////////////////////////////////////////////

function messageconn(io, socketmessage, socket, datatype, datadest, msgtype) {
  if (msgtype != "connection") {
    let sql = "SELECT socketid FROM connection_tbl WHERE id = ?";
    db.query(sql, [datadest], (err, results, fields) => {
      if (results.length > 0) {
        socketmessage(socket, datatype, datadest, msgtype, results[0].socketid);
      } else {
        sendtoeachclient(sessionid, socketid, datatype, datadest, msgtype);
      }
    });
  }
}

module.exports = {
  messageconn: messageconn,
};
