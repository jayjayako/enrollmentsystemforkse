var { messageconn } = require("./msgconn");
const db = require("../../modulelibrary/databaseconn");
function connect(
  io,
  socket,
  socketmessage,
  id,
  socketid,
  datatype,
  datadest,
  msgtype
) {
  try {
    var values = [[id, socketid]];
    let sql =
      "INSERT INTO connection_tbl(id,socketid) VALUES ? ON DUPLICATE KEY UPDATE socketid=VALUES(socketid)";
    db.query(sql, [values], (err, results) => {
      if (err) {
        throw err;
      } else {
        console.log("socketconnectiondb" + results.affectedRows);
        messageconn(io, socketmessage, socket, datatype, datadest, msgtype);
      }
    });
  } catch (error) {
    console.log("error");
  }
}
module.exports = {
  connect: connect,
};
