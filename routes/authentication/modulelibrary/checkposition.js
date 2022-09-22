var express = require("express");
var router = express.Router();

const db = require("./databaseconn");

router.use((req, res, next) => {
  try {
    let sql = "SELECT id FROM superadmin_tbl WHERE id = ?";
    db.query(sql, [res.locals.currentid], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.myposition = "superadmin";
        next();
      } else {
        next();
      }
    });
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});

router.use((req, res, next) => {
  try {
    let sql = "SELECT id FROM admin_tbl WHERE id = ?";
    db.query(sql, [res.locals.currentid], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.myposition = "admin";
        next();
      } else {
        next();
      }
    });
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});

router.use((req, res, next) => {
  try {
    let sql = "SELECT id FROM staff_tbl WHERE id = ?";
    db.query(sql, [res.locals.currentid], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.myposition = "staff";
        next();
      } else {
        next();
      }
    });
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});

module.exports = router;
