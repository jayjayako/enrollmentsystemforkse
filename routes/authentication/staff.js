var express = require("express");
var router = express.Router();

const cors = require("cors");

const cookieParser = require("cookie-parser");
router.use(cors({ credentials: true, origin: true }));
router.use(cookieParser());

const addnewsession = require("./modulelibrary/addnewsession");
var db = require("./modulelibrary/databaseconn");

router.use((req, res, next) => {
  try {
    var user = req.body.username;
    var pass = req.body.password;
    let sql = "SELECT id FROM staff_tbl WHERE username = ? AND password = ?";
    db.query(sql, [user, pass], (err, results, fields) => {
      if (results.length > 0) {
        console.log(results[0].id);
        res.locals.currentid = results[0].id;

        res.locals.staffloginstats = "success";
        next();
      } else {
        res.locals.staffloginstats = "failed";
        next();
        // if (!disabled[parseIp(req)]) {
        //   if (!loginattempt[parseIp(req)]) {
        //     loginattempt[parseIp(req)] = 0;
        //   }
        //   loginattempt[parseIp(req)] += 1;
        //   res.send(
        //     JSON.stringify([
        //       { id: "accessdenied", loginattempt: loginattempt[parseIp(req)] },
        //     ])
        //   );

        //   if (loginattempt[parseIp(req)] == 5) {
        //     disabled[parseIp(req)] = "yes";
        //     setTimeout(function () {
        //       delete disabled[parseIp(req)];
        //     }, 10000);
        //     delete loginattempt[parseIp(req)];
        //   }
        // } else {
        //   res.send(JSON.stringify([{ id: "accessdenied" }]));
        // }
      }
    });
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});

router.use(addnewsession);

module.exports = router;
