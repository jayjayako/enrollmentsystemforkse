const express = require("express");
const fs = require("fs");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const multer = require("multer");

var db = require("../modulelibrary/databaseconn");
const { decypherthecookie } = require("../modulelibrary/encryption");
const { generateid } = require("../modulelibrary/idgenerator");

////////////////// this is for uploading payment receipt /////////
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, generateid() + "--" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false); // else fails
  }
}

const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter });
//////////////////////////////////////////////////////////////////

function deletefilesfunct(file) {
  fs.unlink("./uploads/" + file, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("deleted file");
  });
}

/////////////////////////////// get info /////////////////////////////////
function getinfo(req, res, next) {
  let sql = "SELECT superid FROM student_balance_tbl WHERE id=?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.superid = results[0].superid;
      next();
    } else {
      deletefilesfunct(req.file.filename);
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}
//////////////////////////////////////////////////////////////////////////

function displaytotalbalance(req, res, next) {
  let sql =
    "SELECT " + "totalbalance " + "FROM student_balance_tbl " + "WHERE id=?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    } else {
      res.send(JSON.stringify([{ id: "0" }]));
    }
    next();
  });
}

function displaypaymenthistory(req, res, next) {
  let sql =
    "SELECT student_balance_history_tbl.superid, " +
    "assessment_payment_stdnt_tbl.paymenttypecol, " +
    "student_balance_history_tbl.amount " +
    "FROM student_balance_history_tbl " +
    "INNER JOIN assessment_payment_stdnt_tbl " +
    "ON student_balance_history_tbl.id=assessment_payment_stdnt_tbl.id " +
    "WHERE student_balance_history_tbl.id=?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    } else {
      res.send(
        JSON.stringify([
          { superid: res.locals.currentid, paymenttypecol: "", amount: "" },
        ])
      );
    }
    next();
  });
}

function uploadstudentbalance(req, res, next) {
  var idnum = res.locals.currentid;
  var paymentmethod = req.body.paymentmethod;
  var balanceamount = req.body.proofpaymentamount;
  var pic1, filetype1;
  console.log(req.file);
  try {
    pic1 = req.file.filename;
    filetype1 = req.file.mimetype;
  } catch (error) {
    pic1 = "../../img/defaultimg.png";
    filetype1 = "";
  }

  var values = [
    [
      generateid(),
      idnum,
      res.locals.superid,
      paymentmethod,
      filetype1,
      pic1,
      parseFloat(balanceamount),
    ],
  ];
  let sql =
    "REPLACE INTO balance_payment_tbl (superid,id,studentbalanceid,paymentmethodcol,filetype,filename,amount) VALUES ?";
  db.query(sql, [values], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    next();
  });
}

////////////////////////////// check student if valid //////////////////////
function checkifvalid(req, res, next) {
  let sql = "SELECT superid FROM student_balance_tbl WHERE id=?";
  db.query(sql, [res.locals.currentid], (err, results, fields) => {
    if (results.length > 0) {
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}
////////////////////////////////////////////////////////////////////

/////////////////////////// update enrollment schedule //////////////////////
router.get("/displaypaymenthistory", displaypaymenthistory, (req, res) => {
  console.log("displaying payment history");
  res.end();
});
//////////////////////////////////////////////////////////////////

/////////////////////////// display student balance ////////////////
router.get("/displaytotalbalance", displaytotalbalance, (req, res) => {
  console.log("displaying total balance");
  res.end();
});
///////////////////////////////////////////////////////////////////

/////////////////////  upload student balance /////////////////////
router.post(
  "/uploadstudentbalance",
  checkifvalid,
  getinfo,
  upload.single("receipt"),
  uploadstudentbalance,
  (req, res) => {
    console.log("uploading student balance");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
///////////////////////////////////////////////////////////////////

module.exports = router;
