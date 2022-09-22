const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const cors = require("cors");

router.use(cors());

var db = require("../modulelibrary/databaseconn");

/////////////////////// display log history /////////////////////
router.get("/displaysuperadminloghistory", (req, res) => {
  try {
    let sql = "SELECT * FROM log_history WHERE usertype=?";
    db.query(sql, ["superadmin"], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify(results));
        res.end();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
});

router.get("/displayadminloghistory", (req, res) => {
  try {
    let sql = "SELECT * FROM log_history WHERE usertype=?";
    db.query(sql, ["admin"], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify(results));
        res.end();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
});

router.get("/displaystaffloghistory", (req, res) => {
  try {
    let sql =
      "SELECT staff_info.id, log_history.time, log_history.loginout, staff_info.position, log_history.ip_address, log_history.year " +
      "FROM log_history INNER JOIN staff_info " +
      "ON staff_info.id=log_history.id WHERE log_history.usertype=?";
    db.query(sql, ["staff"], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify(results));
        res.end();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
});
//////////////////////////////////////////////////////////////////

/////////////////// display specific log history////////////////////
function getloghistorysuperadmin(req, res, next) {
  try {
    let sql =
      "SELECT log_history.id, log_history.usertype, superadmin_tbl.firstname, superadmin_tbl.lastname, superadmin_info.picture " +
      "FROM ((log_history INNER JOIN superadmin_tbl " +
      "ON log_history.id=superadmin_tbl.id) " +
      "INNER JOIN superadmin_info " +
      "ON log_history.id=superadmin_info.id) " +
      "WHERE log_history.id = ?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        console.log("specific audit trail");
        res.send(JSON.stringify(results));
        res.end();
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
}

function getloghistoryadmin(req, res, next) {
  try {
    let sql =
      "SELECT log_history.id, log_history.usertype, admin_tbl.firstname, admin_tbl.lastname, admin_info.picture " +
      "FROM ((log_history INNER JOIN admin_tbl " +
      "ON log_history.id=admin_tbl.id) " +
      "INNER JOIN admin_info " +
      "ON log_history.id=admin_info.id) " +
      "WHERE log_history.id = ?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        console.log("specific audit trail");
        res.send(JSON.stringify(results));
        res.end();
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
}

function getloghistorystaff(req, res, next) {
  try {
    let sql =
      "SELECT log_history.id, log_history.usertype, staff_tbl.firstname, staff_tbl.lastname, staff_info.picture " +
      "FROM ((log_history INNER JOIN staff_tbl " +
      "ON log_history.id=staff_tbl.id) " +
      "INNER JOIN staff_info " +
      "ON log_history.id=staff_info.id) " +
      "WHERE log_history.id = ?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        console.log("specific audit trail");
        res.send(JSON.stringify(results));
        res.end();
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
}
router.get(
  "/displayspecificloghistory",
  getloghistorysuperadmin,
  getloghistoryadmin,
  getloghistorystaff,
  (req, res) => {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////

/////////////////////// display activity log /////////////////////
router.get("/displaysuperadminactivitylog", (req, res) => {
  try {
    let sql = "SELECT * FROM activity_log WHERE usertype=?";
    db.query(sql, ["superadmin"], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify(results));
        res.end();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
});

router.get("/displayadminactivitylog", (req, res) => {
  try {
    let sql = "SELECT * FROM activity_log WHERE usertype=?";
    db.query(sql, ["admin"], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify(results));
        res.end();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
});

router.get("/displaystaffactivitylog", (req, res) => {
  try {
    let sql =
      "SELECT staff_info.id, activity_log.time, activity_log.activities, staff_info.position, activity_log.year " +
      "FROM activity_log INNER JOIN staff_info " +
      "ON staff_info.id=activity_log.id WHERE activity_log.usertype=?";
    db.query(sql, ["staff"], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify(results));
        res.end();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
});
//////////////////////////////////////////////////////////////////

/////////////////// display specific activity log////////////////////
function getactivitylogsuperadmin(req, res, next) {
  try {
    let sql =
      "SELECT activity_log.id, activity_log.usertype, superadmin_tbl.firstname, superadmin_tbl.lastname, superadmin_info.picture " +
      "FROM ((activity_log INNER JOIN superadmin_tbl " +
      "ON activity_log.id=superadmin_tbl.id) " +
      "INNER JOIN superadmin_info " +
      "ON activity_log.id=superadmin_info.id) " +
      "WHERE activity_log.id = ?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        console.log("specific audit trail");
        res.send(JSON.stringify(results));
        res.end();
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
}

function getactivitylogadmin(req, res, next) {
  try {
    let sql =
      "SELECT activity_log.id, activity_log.usertype, admin_tbl.firstname, admin_tbl.lastname, admin_info.picture " +
      "FROM ((activity_log INNER JOIN admin_tbl " +
      "ON activity_log.id=admin_tbl.id) " +
      "INNER JOIN admin_info " +
      "ON activity_log.id=admin_info.id) " +
      "WHERE activity_log.id = ?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        console.log("specific audit trail");
        res.send(JSON.stringify(results));
        res.end();
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
}

function getactivitylogstaff(req, res, next) {
  try {
    let sql =
      "SELECT activity_log.id, activity_log.usertype, staff_tbl.firstname, staff_tbl.lastname, staff_info.picture " +
      "FROM ((activity_log INNER JOIN staff_tbl " +
      "ON activity_log.id=staff_tbl.id) " +
      "INNER JOIN staff_info " +
      "ON activity_log.id=staff_info.id) " +
      "WHERE activity_log.id = ?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        console.log("specific audit trail");
        res.send(JSON.stringify(results));
        res.end();
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
}
router.get(
  "/displayspecificactivitylog",
  getactivitylogsuperadmin,
  getactivitylogadmin,
  getactivitylogstaff,
  (req, res) => {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
);
//////////////////////////////////////////////////////////////////

module.exports = router;
