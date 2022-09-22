const express = require("express");
const router = express.Router();

var db = require("../modulelibrary/databaseconn");
router.use("/", validatefile, express.static("uploads"));

/////////////////// authenticate staff if valid user ////////////////

function validatefile(req, res, next) {
  var myvar = req.url; // !important req.url use to get end url of a request
  var files = myvar.split("/").join("");
  res.locals.files = files;
  try {
    let sql =
      "SELECT filename " + "FROM school_schedule_tbl " + "WHERE filename = ?";
    db.query(sql, [res.locals.files], (err, results, fields) => {
      if (results.length > 0) {
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
}

module.exports = router;
