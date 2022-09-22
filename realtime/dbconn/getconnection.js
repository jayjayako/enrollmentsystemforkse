require("dotenv").config();
const db = require("../../modulelibrary/databaseconn");

function authenticate(id) {
  try {
    let sql = "SELECT socketid FROM connection_tbl WHERE id = ?";
    db.query(sql, [id], (err, results, fields) => {
      if (results.length > 0) {
        return { socketid: results[0].socketid };
      } else {
        return { socketid: "invalid" };
      }
    });
  } catch (error) {
    console.log("error");
  }
}
module.exports = {
  authenticate: authenticate,
};
