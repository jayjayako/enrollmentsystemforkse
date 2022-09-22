require("dotenv").config();
const {
  encodethecookie,
  decypherthecookie,
} = require("../../modulelibrary/encryption");
const db = require("../../modulelibrary/databaseconn");

function authenticate(sessidcookie) {
  try {
    var sessionid = decypherthecookie(sessidcookie);
    let sql = "SELECT id FROM session_tbl WHERE session_id = ?";
    db.query(sql, [sessionid], (err, results, fields) => {
      if (results.length > 0) {
        return { currentid: results[0].id };
      } else {
        return { currentid: "invalid" };
      }
    });
  } catch (error) {
    console.log("error");
  }
}
module.exports = {
  authenticate: authenticate,
};
