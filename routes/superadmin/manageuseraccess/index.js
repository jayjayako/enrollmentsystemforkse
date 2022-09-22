const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

const cors = require("cors");

router.use(cors());

var db = require("../modulelibrary/databaseconn");
const { checkforxss } = require("../modulelibrary/checkstring");
const updateuseraccess = require("./updateuseraccess");
////////////////// display usertype ///////////////////
function displayusertype(req, res, next) {
  let sql = "SELECT usertype FROM manageuseraccess";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
/////////////////////////////////////////////////////

router.get("/displayusertype", displayusertype, (req, res) => {
  console.log("displaying usertype");
  res.end();
});

////////////////// display staff position ///////////////////
function displaystaffposition(req, res, next) {
  if (req.query.usertype == "staff") {
    let sql = "SELECT value FROM staff_positions";
    db.query(sql, (err, results, fields) => {
      if (results.length > 0) {
        console.log("displaying staff positions");
        res.send(JSON.stringify(results));
        res.end();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    });
  } else {
    next();
  }
}
/////////////////////////////////////////////////////////////

router.get("/displaystaffposition", displaystaffposition, (req, res) => {
  res.send(JSON.stringify([{ id: "invalid" }]));
  res.end();
});

//////////////////////// display admin table ///////////////////////
function displayadmintable(req, res, next) {
  let sql =
    "SELECT admin_tbl.id, admin_tbl.lastname, admin_tbl.firstname, admin_info.email " +
    "FROM admin_tbl " +
    "INNER JOIN admin_info ON admin_tbl.id=admin_info.id";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.locals.admintable = results;
      next();
    } else {
      res.locals.admintable = "invalid";
      next();
    }
  });
}
////////////////////////////////////////////////////////////////////

//////////////////////// display staff table ///////////////////////
function displaystafftable(req, res, next) {
  let sql =
    "SELECT staff_tbl.id, staff_tbl.lastname, staff_tbl.firstname, staff_info.email " +
    "FROM staff_tbl " +
    "INNER JOIN staff_info ON staff_tbl.id=staff_info.id " +
    "WHERE staff_info.position=?";
  db.query(sql, [req.query.position], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.stafftable = results;
      next();
    } else {
      res.locals.stafftable = "invalid";
      next();
    }
  });
}
////////////////////////////////////////////////////////////////////

router.get(
  "/displaytable",
  displayadmintable,
  displaystafftable,
  (req, res) => {
    res.send(
      JSON.stringify([
        {
          admintable: res.locals.admintable,
          stafftable: res.locals.stafftable,
        },
      ])
    );
    res.end();
  }
);

function displayspecificadmin(req, res, next) {
  res.locals.specificadmin = "invalid";
  if (req.query.usertype == "admin") {
    let sql =
      "SELECT admin_tbl.id, admin_tbl.firstname, admin_tbl.lastname, admin_info.picture " +
      "FROM admin_tbl " +
      "INNER JOIN admin_info ON admin_tbl.id=admin_info.id " +
      "WHERE admin_tbl.id=?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.specificadmin = results;
        next();
      } else {
        next();
      }
    });
  } else {
    next();
  }
}

function displayspecificstaff(req, res, next) {
  res.locals.specificstaff = "invalid";
  if (req.query.usertype == "staff") {
    let sql =
      "SELECT staff_tbl.id, staff_info.position, staff_tbl.firstname, staff_tbl.lastname, staff_info.picture " +
      "FROM staff_tbl " +
      "INNER JOIN staff_info ON staff_tbl.id=staff_info.id " +
      "WHERE staff_tbl.id=?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.specificstaff = results;
        next();
      } else {
        next();
      }
    });
  } else {
    next();
  }
}

function displayspecificadminmodule(req, res, next) {
  res.locals.specificadminmodule = "invalid";
  if (req.query.usertype == "admin") {
    let sql = "SELECT * " + "FROM admin_module " + "WHERE id=?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.specificadminmodule = results;
        next();
      } else {
        next();
      }
    });
  } else {
    next();
  }
}

function displayspecificregistrarmodule(req, res, next) {
  res.locals.specificstaffmodule = "invalid";
  res.locals.staffposition = "invalid";
  if (req.query.usertype == "staff") {
    let sql = "SELECT * " + "FROM registrar_module " + "WHERE id=?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.specificstaffmodule = results;
        res.locals.staffposition = "registrar";
        next();
      } else {
        next();
      }
    });
  } else {
    next();
  }
}

function displayspecificaccountingmodule(req, res, next) {
  if (req.query.usertype == "staff") {
    let sql = "SELECT * " + "FROM accounting_module " + "WHERE id=?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.specificstaffmodule = results;
        res.locals.staffposition = "accounting";
        next();
      } else {
        next();
      }
    });
  } else {
    next();
  }
}

function displayspecificcashiermodule(req, res, next) {
  if (req.query.usertype == "staff") {
    let sql = "SELECT * " + "FROM cashier_module " + "WHERE id=?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.specificstaffmodule = results;
        res.locals.staffposition = "cashier";
        next();
      } else {
        next();
      }
    });
  } else {
    next();
  }
}

function displayspecificadmindeptmodule(req, res, next) {
  if (req.query.usertype == "staff") {
    let sql = "SELECT * " + "FROM admin_dept_module " + "WHERE id=?";
    db.query(sql, [req.query.id], (err, results, fields) => {
      if (results.length > 0) {
        res.locals.specificstaffmodule = results;
        res.locals.staffposition = "admindept";
        next();
      } else {
        next();
      }
    });
  } else {
    next();
  }
}

router.get(
  "/displayspecificuser",
  displayspecificadmin,
  displayspecificstaff,
  displayspecificadminmodule,
  displayspecificregistrarmodule,
  displayspecificaccountingmodule,
  displayspecificcashiermodule,
  displayspecificadmindeptmodule,
  (req, res) => {
    res.send(
      JSON.stringify([
        {
          specificadmin: res.locals.specificadmin,
          specificstaff: res.locals.specificstaff,
          specificadminmodule: res.locals.specificadminmodule,
          specificstaffmodule: res.locals.specificstaffmodule,
          specificstaffposition: res.locals.staffposition,
        },
      ])
    );
    res.end();
  }
);

function checkxssformanageuseraccess(req, res, next) {
  var addnewstaff = req.body.addnewstaff;
  var managestaff = req.body.managestaff;
  var managestudent = req.body.managestudent;
  var audittrail = req.body.audittrail;
  var viewreport = req.body.viewreport;
  var staffmodule1 = req.body.staffmodule1;
  var staffmodule2 = req.body.staffmodule2;
  var staffmodule3 = req.body.staffmodule3;
  var staffmodule4 = req.body.staffmodule4;
  var staffmodule5 = req.body.staffmodule5;
  var staffmodule6 = req.body.staffmodule6;
  var staffmodule7 = req.body.staffmodule7;
  var staffmodule8 = req.body.staffmodule8;
  if (
    checkforxss(addnewstaff) == false &&
    checkforxss(managestaff) == false &&
    checkforxss(managestudent) == false &&
    checkforxss(audittrail) == false &&
    checkforxss(viewreport) == false &&
    checkforxss(staffmodule1) == false &&
    checkforxss(staffmodule2) == false &&
    checkforxss(staffmodule3) == false &&
    checkforxss(staffmodule4) == false &&
    checkforxss(staffmodule5) == false &&
    checkforxss(staffmodule6) == false &&
    checkforxss(staffmodule7) == false &&
    checkforxss(staffmodule8) == false
  ) {
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}

/////////////////////////// check if empty ///////////////////////
function checkifempty(req, res, next) {
  try {
    if (
      req.body.addnewstaff &&
      req.body.managestaff &&
      req.body.managestudent &&
      req.body.audittrail &&
      req.body.viewreport &&
      req.body.staffmodule1 &&
      req.body.staffmodule2 &&
      req.body.staffmodule3 &&
      req.body.staffmodule4 &&
      req.body.staffmodule5 &&
      req.body.staffmodule6 &&
      req.body.staffmodule7 &&
      req.body.staffmodule8
    ) {
      if (req.query.id != "undefined" && req.query.id != "" && req.query.id) {
        next();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
//////////////////////////////////////////////////////////////////

//////////////////////// save user modules ////////////////////////
router.post(
  "/saveuseraccess",
  upload.none(),
  checkifempty,
  checkxssformanageuseraccess,
  updateuseraccess,
  (req, res) => {
    res.send(JSON.stringify([{ id: "valid" }]));
    res.end();
  }
);
///////////////////////////////////////////////////////////////////

module.exports = router;
