const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

var db = require("../modulelibrary/databaseconn");

////////////////// check if admin //////////////
router.use((req, res, next) => {
    res.locals.currentuser="none";
    let sql = "SELECT * FROM admin_module WHERE id=?";
    db.query(sql,[req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.currentuser="admin";
        next();
      } else {
        next();
      }
    });
});
////////////////////////////////////////////////

////////////// check if registrar //////////////
router.use((req, res, next) => {
    let sql = "SELECT * FROM registrar_module WHERE id=?";
    db.query(sql,[req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.currentuser="registrar";
        next();
      } else {
        next();
      }
    });
});
////////////////////////////////////////////////

////////////// check if accounting //////////////
router.use((req, res, next) => {
    let sql = "SELECT * FROM accounting_module WHERE id=?";
    db.query(sql,[req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.currentuser="accounting";
        next();
      } else {
        next();
      }
    });
});
////////////////////////////////////////////////

////////////// check if cashier //////////////
router.use((req, res, next) => {
    let sql = "SELECT * FROM cashier_module WHERE id=?";
    db.query(sql,[req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.currentuser="cashier";
        next();
      } else {
        next();
      }
    });
});
////////////////////////////////////////////////

router.use((req, res, next) => {
    if (res.locals.currentuser == "admin") {
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
    } else {
      next();
    }
  });

router.use((req, res, next) => {
  if (res.locals.currentuser == "registrar") {
  let post = {
      enrollment_sched: req.body.staffmodule1,
      edit_enrollee_rec: req.body.staffmodule2,
      enrollment_res: req.body.staffmodule3,
      school_lvl: req.body.staffmodule4,
      year_lvl: req.body.staffmodule5,
      section: req.body.staffmodule6,
      school_sched_pic: req.body.staffmodule7,
      student_max_num: req.body.staffmodule8,
  };
  let sql = "UPDATE registrar_module SET ? WHERE id=?";
  db.query(sql, [post, req.query.id], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
    next();
  });
  } else {
    next();
  }
});

router.use((req, res, next) => {
    if (res.locals.currentuser == "accounting") {
    let post = {
        other_fees: req.body.staffmodule1,
        payment_plan: req.body.staffmodule2,
        payment_plan_amnt: req.body.staffmodule3,
    };
    let sql = "UPDATE accounting_module SET ? WHERE id=?";
    db.query(sql, [post, req.query.id], (err, results) => {
        if (err) throw err;
        console.log("Number of records updated: " + results.affectedRows);
        next();
    });
    } else {
        next();
    }
});

router.use((req, res, next) => {
    if (res.locals.currentuser == "cashier") {
    let post = {
        verify_payment: req.body.staffmodule1,
        edit_payment_method: req.body.staffmodule2,
        view_stdnt_blnce: req.body.staffmodule3,
    };
    let sql = "UPDATE cashier_module SET ? WHERE id=?";
    db.query(sql, [post, req.query.id], (err, results) => {
        if (err) throw err;
        console.log("Number of records updated: " + results.affectedRows);
        next();
    });
    } else {
        next();
    }
});

module.exports = router;
