const express = require("express");
const router = express.Router();

var db = require("../modulelibrary/databaseconn");
const { decypherthecookie } = require("../modulelibrary/encryption");

router.use("/", auth, express.static("uploads"));

/////////////////// authenticate staff if valid user ////////////////
/////////////////// dont delete this because of the specific file api ////////
function auth(req, res, next) {
  try {
    var myvar = req.url; // !important req.url use to get end url of a request
    var files = myvar.split("/").join("");
    var sessid = decypherthecookie(res.locals.mycookie);

    let sql =
      "SELECT student_info.id " +
      "FROM student_info INNER JOIN session_tbl ON student_info.id=session_tbl.id " +
      "WHERE session_tbl.session_id = ? AND student_info.picture = ?";
    db.query(sql, [sessid, files], (err, results, fields) => {
      if (results.length > 0) {
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

module.exports = router;
