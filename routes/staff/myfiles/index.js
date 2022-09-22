const express = require("express");
const router = express.Router();

const db = require("../modulelibrary/databaseconn");

router.use((req, res, next) => {
  let sql = "SELECT id FROM staff_tbl WHERE id = ?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      console.log("staff fileaccess authenticated..");
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
});

router.use("/", express.static("uploads"));

module.exports = router;
