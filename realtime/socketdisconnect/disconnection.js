const { authlogout } = require("../../modulelibrary/deletesession");
const db = require("../../modulelibrary/databaseconn");
function disconnect(socketid, userid, resid) {
  function deleteconn(currentid) {
    try {
      let sql = "DELETE FROM connection_tbl WHERE id = ?";
      db.query(sql, [currentid], (err, results, fields) => {
        if (err) {
          throw err;
        }
      });
    } catch (error) {
      console.log("error");
    }
  }
  if (socketid == resid) {
    deleteconn(userid);
    authlogout(userid);
  }
}
module.exports = {
  disconnect: disconnect,
};
