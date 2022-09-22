const express = require("express");
const router = express.Router();

var db = require("../modulelibrary/databaseconn");

var path = require("path");

/////////////////// authenticate staff if valid user ////////////////
/////////////////// dont delete this because of the specific file api ////////
function studentprofilefileaccess(req, res, next) {
  try {
    let sql =
      "SELECT picture " + "FROM student_info " + "WHERE id = ? AND picture = ?";
    db.query(
      sql,
      [req.query.studid, req.query.filename],
      (err, results, fields) => {
        if (results.length > 0) {
          //var finalpath = "../../../uploads/" + req.query.filename;
          var finalpath = "uploads/" + req.query.filename;
          //res.locals.filename = path.join(__dirname, finalpath);
          res.locals.filename = path.join(res.locals.absolutepath, finalpath);
          if (req.query.filemethod == "view") {
            res.sendFile(res.locals.filename);
          } else {
            res.send(JSON.stringify([{ id: "invalid" }]));
            res.end();
          }
        } else {
          next();
        }
      }
    );
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}

function studentregistrarfileaccess(req, res, next) {
  try {
    let sql =
      "SELECT id " + "FROM student_files " + "WHERE id = ? AND filename = ?";
    db.query(
      sql,
      [req.query.studid, req.query.filename],
      (err, results, fields) => {
        if (results.length > 0) {
          //var finalpath = "../../../uploads/" + req.query.filename;
          var finalpath = "uploads/" + req.query.filename;
          //res.locals.filename = path.join(__dirname, finalpath);
          res.locals.filename = path.join(res.locals.absolutepath, finalpath);
          if (req.query.filemethod == "view") {
            res.sendFile(res.locals.filename);
          } else if (req.query.filemethod == "download") {
            res.download(res.locals.filename);
          } else {
            res.send(JSON.stringify([{ id: "invalid" }]));
            res.end();
          }
        } else {
          next();
        }
      }
    );
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}

function studentcashierfileaccess(req, res, next) {
  try {
    let sql =
      "SELECT id " +
      "FROM assessment_payment_stdnt_tbl " +
      "WHERE id = ? AND filename = ?";
    db.query(
      sql,
      [req.query.studid, req.query.filename],
      (err, results, fields) => {
        if (results.length > 0) {
          //var finalpath = "../../../uploads/" + req.query.filename;
          var finalpath = "uploads/" + req.query.filename;
          //res.locals.filename = path.join(__dirname, finalpath);
          res.locals.filename = path.join(res.locals.absolutepath, finalpath);
          if (req.query.filemethod == "view") {
            res.sendFile(res.locals.filename);
          } else if (req.query.filemethod == "download") {
            res.download(res.locals.filename);
          } else {
            res.send(JSON.stringify([{ id: "invalid" }]));
            res.end();
          }
        } else {
          next();
        }
      }
    );
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}

function studentbalancecashierfileaccess(req, res, next) {
  try {
    let sql =
      "SELECT id " +
      "FROM balance_payment_tbl " +
      "WHERE id = ? AND filename = ?";
    db.query(
      sql,
      [req.query.studid, req.query.filename],
      (err, results, fields) => {
        if (results.length > 0) {
          //var finalpath = "../../../uploads/" + req.query.filename;
          var finalpath = "uploads/" + req.query.filename;
          //res.locals.filename = path.join(__dirname, finalpath);
          res.locals.filename = path.join(res.locals.absolutepath, finalpath);
          if (req.query.filemethod == "view") {
            res.sendFile(res.locals.filename);
          } else {
            res.send(JSON.stringify([{ id: "invalid" }]));
            res.end();
          }
        } else {
          next();
        }
      }
    );
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}

router.get(
  "/",
  studentprofilefileaccess,
  studentregistrarfileaccess,
  studentcashierfileaccess,
  studentbalancecashierfileaccess,
  (req, res) => {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
);

module.exports = router;
