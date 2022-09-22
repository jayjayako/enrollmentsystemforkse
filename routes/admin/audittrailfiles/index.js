const express = require("express");
const router = express.Router();

const db = require("../modulelibrary/databaseconn");

var path = require("path");

function superadmin(req, res, next) {
  let sql =
    "SELECT picture " +
    "FROM superadmin_info " +
    "WHERE id = ? AND picture = ?";
  db.query(
    sql,
    [req.query.myid, req.query.filename],
    (err, results, fields) => {
      if (results.length > 0) {
        var finalpath = "superadminfiles/" + req.query.filename;
        res.locals.filename = path.join(res.locals.absolutepath, finalpath);
        res.sendFile(res.locals.filename);
      } else {
        next();
      }
    }
  );
}

function admin(req, res, next) {
  let sql =
    "SELECT picture " + "FROM admin_info " + "WHERE id = ? AND picture = ?";
  db.query(
    sql,
    [req.query.myid, req.query.filename],
    (err, results, fields) => {
      if (results.length > 0) {
        var finalpath = "uploads/" + req.query.filename;
        res.locals.filename = path.join(res.locals.absolutepath, finalpath);
        res.sendFile(res.locals.filename);
      } else {
        next();
      }
    }
  );
}

function staff(req, res, next) {
  let sql =
    "SELECT picture " + "FROM staff_info " + "WHERE id = ? AND picture = ?";
  db.query(
    sql,
    [req.query.myid, req.query.filename],
    (err, results, fields) => {
      if (results.length > 0) {
        var finalpath = "uploads/" + req.query.filename;
        res.locals.filename = path.join(res.locals.absolutepath, finalpath);
        res.sendFile(res.locals.filename);
      } else {
        next();
      }
    }
  );
}

router.use("/", superadmin, admin, staff, (req, res) => {
  res.send(JSON.stringify([{ id: "invalid" }]));
  res.end();
});

module.exports = router;
