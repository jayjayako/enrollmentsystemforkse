const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

var db = require("../modulelibrary/databaseconn");

router.use((req, res, next) => {
  let post = {
    add_new_staff: req.body.addnewstaff,
    manage_staff: req.body.managestaff,
    manage_student: req.body.managestudent,
    audit_trail: req.body.audittrail,
    view_report: req.body.viewreport,
  };
  let sql = "UPDATE admin_module SET ? WHERE id=?";
  db.query(sql, [post, req.query.id], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
});

module.exports = router;
