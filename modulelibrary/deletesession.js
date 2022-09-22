const db = require("./databaseconn");

function authlogout(userid) {
  try {
    let sql = "DELETE FROM session_tbl WHERE id = ?";
    db.query(sql, [userid], (err, results, fields) => {
      if (err) {
        throw err;
      } else {
        console.log("user logged out:" + results.affectedRows);
      }
    });
  } catch (error) {
    console.log("error");
  }
}

module.exports = {
  authlogout: authlogout,
};
