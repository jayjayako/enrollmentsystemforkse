const { decypherthecookie } = require("./encryption.js");
var db = require("./databaseconn");

/////////////////// authenticate admin or staff if valid user ////////////////
function auth(req, res, next) {
  try {
    var sessid = decypherthecookie(res.locals.mycookie);

    let sql =
      "SELECT student_tbl.id " +
      "FROM student_tbl " +
      "INNER JOIN session_tbl ON student_tbl.id=session_tbl.id " +
      "WHERE session_tbl.session_id = ?";
    db.query(sql, [sessid], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.currentid = results[0].id;
        next();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
/////////////////////////////////////////////////////////////////////////////

module.exports = {
  auth: auth,
};
