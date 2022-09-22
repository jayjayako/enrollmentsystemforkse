/////////////////// check position of staff ////////////////
var express = require("express");
var router = express.Router();

const db = require("./databaseconn");

router.use((req, res, next) => {
  try {
    let sql = "SELECT position FROM staff_info WHERE id = ?";
    db.query(sql, [res.locals.currentid], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.myposition = results[0].position;
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
