const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const cors = require("cors");

router.use(cors());

var db = require("../modulelibrary/databaseconn");

router.use((req, res, next) => {
  if (req.body.staffposition) {
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});

router.use((req, res, next) => {
  if (req.body.staffposition == "Registrar") {
    var idnum = res.locals.idvar;
    var enrollmentsched = req.body.staffmodule1;
    var editenrolleerec = req.body.staffmodule2;
    var enrollmentres = req.body.staffmodule3;
    var schoollevel = req.body.staffmodule4;
    var yearlevel = req.body.staffmodule5;
    var section = req.body.staffmodule6;
    var schoolsched = req.body.staffmodule7;
    var studentmaxnum = req.body.staffmodule8;

    let post = {
      id: idnum,
      enrollment_sched: enrollmentsched,
      edit_enrollee_rec: editenrolleerec,
      enrollment_res: enrollmentres,
      school_lvl: schoollevel,
      year_lvl: yearlevel,
      section: section,
      school_sched_pic: schoolsched,
      student_max_num: studentmaxnum,
    };
    let sql = "INSERT INTO registrar_module SET ?";
    db.query(sql, [post], (err, results) => {
      if (err) throw err;
      console.log("Number of records updated: " + results.affectedRows);
      next();
    });
  } else {
    next();
  }
});

router.use((req, res, next) => {
  if (req.body.staffposition == "Accounting") {
    var idnum = res.locals.idvar;
    var otherfees = req.body.staffmodule1;
    var paymentplan = req.body.staffmodule2;
    var paymentplanamount = req.body.staffmodule3;

    let post = {
      id: idnum,
      other_fees: otherfees,
      payment_plan: paymentplan,
      payment_plan_amnt: paymentplanamount,
    };
    let sql = "INSERT INTO accounting_module SET ?";
    db.query(sql, [post], (err, results) => {
      if (err) throw err;
      console.log("Number of records updated: " + results.affectedRows);
      next();
    });
  } else {
    next();
  }
});

router.use((req, res, next) => {
  if (req.body.staffposition == "Cashier") {
    var idnum = res.locals.idvar;
    var verifypayment = req.body.staffmodule1;
    var editpaymentmethod = req.body.staffmodule2;
    var viewstudentbalance = req.body.staffmodule3;

    let post = {
      id: idnum,
      verify_payment: verifypayment,
      edit_payment_method: editpaymentmethod,
      view_stdnt_blnce: viewstudentbalance,
    };
    let sql = "INSERT INTO cashier_module SET ?";
    db.query(sql, [post], (err, results) => {
      if (err) throw err;
      console.log("Number of records updated: " + results.affectedRows);
      next();
    });
  } else {
    next();
  }
});

router.use((req, res, next) => {
  if (req.body.staffposition == "Admin Department") {
    var idnum = res.locals.idvar;

    let post = {
      id: idnum,
    };
    let sql = "INSERT INTO admin_dept_module SET ?";
    db.query(sql, [post], (err, results) => {
      if (err) throw err;
      console.log("Number of records updated: " + results.affectedRows);
      next();
    });
  } else {
    next();
  }
});

module.exports = router;
