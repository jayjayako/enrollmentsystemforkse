var { connect } = require("./connection");
const db = require("../../modulelibrary/databaseconn");
function authenticate(
  io,
  socket,
  socketmessage,
  currentid,
  datatype,
  datadest,
  msgtype
) {
  // checking user if already connected
  // put database here
  try {
    let sql = "SELECT socketid FROM connection_tbl WHERE id = ?";
    db.query(sql, [currentid], (err, results, fields) => {
      if (results.length > 0) {
        io.sockets.sockets.forEach((socket2) => {
          ///////// disconnect if connection doubles //////
          if (socket2.id === results[0].socketid) {
            socket2.disconnect(true);
          }
          /////////////////////////////////////////////////
        });
      }
      console.log("connected ", socket.id);
      connect(
        io,
        socket,
        socketmessage,
        currentid,
        socket.id,
        datatype,
        datadest,
        msgtype
      );
    });
  } catch (error) {
    console.log("Invalid");
  }
}

module.exports = {
  authenticate: authenticate,
};
