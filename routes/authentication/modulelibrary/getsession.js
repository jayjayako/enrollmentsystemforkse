var express = require("express");
var router = express.Router();

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const { encodethecookie, decypherthecookie } = require("./encryption");
const db = require("./databaseconn");

router.use(async (req, res, next) => {
  try {
    var sessid = await decypherthecookie(req.cookies.sessionid);
    let sql = "SELECT id FROM session_tbl WHERE session_id = ?";
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
});

module.exports = router;
