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
    var enrollmentsched = req.body.staffmodule1;
    var editenrolleerec = req.body.staffmodule2;
    var enrollmentres = req.body.staffmodule3;
    var schoollevel = req.body.staffmodule4;
    var yearlevel = req.body.staffmodule5;
    var section = req.body.staffmodule6;
    var schoolsched = req.body.staffmodule7;
    var studentmaxnum = req.body.staffmodule8;

    let post = {
      enrollment_sched: enrollmentsched,
      edit_enrollee_rec: editenrolleerec,
      enrollment_res: enrollmentres,
      school_lvl: schoollevel,
      year_lvl: yearlevel,
      section: section,
      school_sched_pic: schoolsched,
      student_max_num: studentmaxnum,
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
  if (res.locals.staffposition == "Accounting") {
    var otherfees = req.body.staffmodule1;
    var paymentplan = req.body.staffmodule2;
    var paymentplanamount = req.body.staffmodule3;

    let post = {
      other_fees: otherfees,
      payment_plan: paymentplan,
      payment_plan_amnt: paymentplanamount,
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
  if (res.locals.staffposition == "Cashier") {
    var verifypayment = req.body.staffmodule1;
    var editpaymentmethod = req.body.staffmodule2;
    var viewstudentbalance = req.body.staffmodule3;

    let post = {
      verify_payment: verifypayment,
      edit_payment_method: editpaymentmethod,
      view_stdnt_blnce: viewstudentbalance,
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

router.use((req, res, next) => {
  if (res.locals.staffposition == "Admin Department") {
    next();
  } else {
    next();
  }
});

module.exports = router;
