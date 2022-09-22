var express = require("express");
var router = express.Router();

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const db = require("./databaseconn");

function deleteconn(userid) {
  try {
    let sql = "DELETE FROM connection_tbl WHERE id = ?";
    db.query(sql, [userid], (err, results, fields) => {
      if (err) throw err;
      else console.log("user disconnect:" + results.affectedRows);
    });
  } catch (error) {
    console.log("error");
  }
}

router.use(async (req, res, next) => {
  try {
    let sql = "DELETE FROM session_tbl WHERE id = ?";
    db.query(sql, [res.locals.currentid], (err, results, fields) => {
      if (err) {
        throw err;
      } else {
        console.log("user logged out:" + results.affectedRows);
        deleteconn(res.locals.currentid);
      }
    });
    res.clearCookie("sessionid");
    next();
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});

module.exports = router;
