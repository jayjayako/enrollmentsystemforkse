var express = require("express");
var router = express.Router();
var db = require("../../modulelibrary/databaseconn");

function getaccountingmodule(req, res, next) {
  let sql = "SELECT * FROM accounting_module WHERE id=?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      next();
    }
  });
}

router.get("/", getaccountingmodule, (req, res) => {
  res.end();
});

module.exports = router;
