const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////
const multer = require("multer");
const upload = multer();

var db = require("../modulelibrary/databaseconn");
const { generateid } = require("../modulelibrary/idgenerator");
const { decypherthecookie } = require("../modulelibrary/encryption");

function displaynotif(req, res, next) {
  let sql =
    "SELECT superid AS id, enrolltype, status, content " +
    "FROM notifications_tbl WHERE id=?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}

//////////////////////////// display notifications ////////////////////////
router.get("/displaynotif", displaynotif, (req, res) => {
  console.log("displaying notifications");
  res.end();
});
//////////////////////////////////////////////////////////////////

module.exports = router;
