var express = require("express");
var router = express.Router();

const db = require("./databaseconn");

router.use(async (req, res, next) => {
  try {
    let sql = "SELECT id FROM superadmin_tbl WHERE id = ?";
    db.query(sql, [res.locals.currentid], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify([{ id: "superadmin" }]));
        res.end();
      } else {
        next();
      }
    });
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});

router.use(async (req, res, next) => {
  try {
    let sql = "SELECT id FROM admin_tbl WHERE id = ?";
    db.query(sql, [res.locals.currentid], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify([{ id: "admin" }]));
        res.end();
      } else {
        next();
      }
    });
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});

router.use(async (req, res, next) => {
  try {
    let sql = "SELECT id FROM staff_tbl WHERE id = ?";
    db.query(sql, [res.locals.currentid], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify([{ id: "staff" }]));
        res.end();
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
