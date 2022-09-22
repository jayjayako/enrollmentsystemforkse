const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const multer = require("multer");
const upload = multer();

const cors = require("cors");

router.use(cors());

var db = require("../modulelibrary/databaseconn");
const { checkforxss } = require("../modulelibrary/checkstring");
const editmodule = require("./editmodule");
const updatestaffmodule = require("./editmodule");
const { activitylog } = require("../modulelibrary/activitylog");

var editaccess = [editmodule];

function checkifvalid(req, res, next) {
  var idnum = req.body.id;
  if (idnum) {
    let sql = "SELECT id FROM staff_tbl WHERE id=?";
    db.query(sql, [idnum], (err, results, fields) => {
      if (results.length > 0) {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      } else {
        res.locals.idvar = idnum;
        next();
      }
    });
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}

/////////////////////////// add new staff ////////////////////////
router.post("/managestaff", checkifvalid, editaccess, (req, res) => {
  res.send(JSON.stringify([{ id: "valid" }]));
  res.end();
});
//////////////////////////////////////////////////////////////////

////////////////////// display staff position ////////////////////
router.get("/displaystaffposition", (req, res) => {
  let sql = "SELECT value FROM staff_positions";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
      res.end();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
});
//////////////////////////////////////////////////////////////////

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

////////////////////// display staff table ////////////////////
router.get("/displaytable", displaystafftable, (req, res) => {
  res.send(
    JSON.stringify([
      {
        stafftable: res.locals.stafftable,
      },
    ])
  );
  res.end();
});
//////////////////////////////////////////////////////////////////

function displayspecifistaff(req, res, next) {
  res.locals.specificstaff = "invalid";
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
}

function displayspecificregistrarmodule(req, res, next) {
  res.locals.specificstaffmodule = "invalid";
  res.locals.staffposition = "invalid";
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
}

function displayspecificaccountingmodule(req, res, next) {
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
}

function displayspecificcashiermodule(req, res, next) {
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
}

function displayspecificadmindeptmodule(req, res, next) {
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
}

////////////////////// display specific staff  ///////////////////
router.get(
  "/displayspecificstaff",
  displayspecifistaff,
  displayspecificregistrarmodule,
  displayspecificaccountingmodule,
  displayspecificcashiermodule,
  displayspecificadmindeptmodule,
  (req, res) => {
    res.send(
      JSON.stringify([
        {
          specificstaff: res.locals.specificstaff,
          specificstaffmodule: res.locals.specificstaffmodule,
          specificstaffposition: res.locals.staffposition,
        },
      ])
    );
    res.end();
  }
);
//////////////////////////////////////////////////////////////////

function checkxssformanagestaff(req, res, next) {
  var staffmodule1 = req.body.staffmodule1;
  var staffmodule2 = req.body.staffmodule2;
  var staffmodule3 = req.body.staffmodule3;
  var staffmodule4 = req.body.staffmodule4;
  var staffmodule5 = req.body.staffmodule5;
  var staffmodule6 = req.body.staffmodule6;
  var staffmodule7 = req.body.staffmodule7;
  var staffmodule8 = req.body.staffmodule8;
  if (
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

//////////////////////// save user modules ////////////////////////
router.post(
  "/savestaffmodule",
  upload.none(),
  checkxssformanagestaff,
  updatestaffmodule,
  (req, res) => {
    activitylog(res.locals.currentid, "updated staff");
    res.send(JSON.stringify([{ id: "valid" }]));
    res.end();
  }
);
///////////////////////////////////////////////////////////////////

module.exports = router;
