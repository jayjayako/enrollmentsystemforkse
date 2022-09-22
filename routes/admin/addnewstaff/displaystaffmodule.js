const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const cors = require("cors");

router.use(cors());

var db = require("../modulelibrary/databaseconn");

router.use((req, res, next) => {
  let sql = "SELECT position FROM staff_info WHERE id=?";
  db.query(sql, [req.query.id], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.staffposition = results[0].position;
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
});

router.use((req, res, next) => {
  if (res.locals.staffposition == "Registrar") {
    let sql = "SELECT * FROM registrar_module WHERE id=?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.specificstaffmodule = results;
        next();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } else {
    next();
  }
});

router.use((req, res, next) => {
  if (res.locals.staffposition == "Accounting") {
    let sql = "SELECT * FROM accounting_module WHERE id=?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.specificstaffmodule = results;
        next();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } else {
    next();
  }
});

router.use((req, res, next) => {
  if (res.locals.staffposition == "Cashier") {
    let sql = "SELECT * FROM cashier_module WHERE id=?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.specificstaffmodule = results;
        next();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } else {
    next();
  }
});

router.use((req, res, next) => {
  if (res.locals.staffposition == "Admin Department") {
    let sql = "SELECT * FROM admin_dept_module WHERE id=?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.specificstaffmodule = results;
        next();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } else {
    next();
  }
});

module.exports = router;
