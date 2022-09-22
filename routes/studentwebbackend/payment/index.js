const express = require("express");
/////////////////////////////////////////////////
const fs = require("fs");
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////
const multer = require("multer");

var db = require("../modulelibrary/databaseconn");
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
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false); // else fails
  }
}

const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter });
//////////////////////////////////////////////////////////////////

////////////////////////////////// newstudent files //////////////////////////////
function studentpaymentdata(req, res, next) {
  var schoollevel = req.body.schoollevel;
  var yearlevel = req.body.yearlevel;
  var paymenttype = req.body.paymenttype;
  var paymentmethod = req.body.paymentmethod;
  var amount = req.body.proofpaymentamount;

  var idnum = res.locals.currentid;
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
      schoollevel,
      yearlevel,
      paymenttype,
      paymentmethod,
      pic1,
      filetype1,
      parseFloat(amount),
      "notapproved",
    ],
  ];
  let sql =
    "REPLACE INTO assessment_payment_stdnt_tbl (superid,id,schoollevelcol,yearlevelcol,paymenttypecol,paymentmethodcol,filename,filetype,amount,approval) VALUES ?";
  db.query(sql, [values], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    next();
  });
}
///////////////////////////////////////////////////////////////////////////////////////

function deletefilesfunct(file) {
  fs.unlink("./uploads/" + file, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("deleted file");
  });
}

//////////////////////// get file names on database /////////////////////
function getpaymentfilenames(idnum) {
  let sql =
    "SELECT filename " + "FROM assessment_payment_stdnt_tbl " + "WHERE id = ?";
  db.query(sql, [idnum], (err, results, fields) => {
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        deletefilesfunct(results[i].filename);
      }
    }
  });
}
/////////////////////////////////////////////////////////////////////////

////////////////////////////// delete assessment ////////////////////////
function deletepaymentfiles(idnum) {
  let sql = "DELETE FROM assessment_payment_stdnt_tbl WHERE id=?";
  db.query(sql, idnum, (err, results) => {
    if (err) throw err;
    console.log("Number of records Deleted: " + results.affectedRows);
  });
}
/////////////////////////////////////////////////////////////////////////

////////////////////////////// check files if valid ///////////////////////////////////
function checkfiles(req, res, next) {
  var idnum = res.locals.currentid;
  let sql =
    "SELECT filename " +
    "FROM assessment_payment_stdnt_tbl " +
    'WHERE id = ? AND filename ="../../img/defaultimg.png"';
  db.query(sql, [idnum], (err, results, fields) => {
    if (results.length > 0) {
      getpaymentfilenames(res.locals.currentid);
      deletepaymentfiles(res.locals.currentid);
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    } else {
      next();
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////

////////////////////////////// delete filename /////////////////////////////
function deletefilename(file) {
  let sql = "DELETE FROM assessment_payment_stdnt_tbl WHERE filename=?";
  db.query(sql, file, (err, results) => {
    if (err) throw err;
    console.log("Number of records Deleted: " + results.affectedRows);
  });
}
////////////////////////////////////////////////////////////////////////////

////////////////////////////// check student if valid //////////////////////////////////////
function checkifvalid(req, res, next) {
  var studentid = res.locals.currentid;
  let sql =
    "SELECT id, filename " +
    "FROM assessment_payment_stdnt_tbl " +
    "WHERE id = ? AND approval=?";
  db.query(sql, [studentid, "notapproved"], (err, results, fields) => {
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        deletefilesfunct(results[i].filename);
        deletefilename(results[i].filename);
      }
      next();
    } else {
      next();
    }
  });
}
////////////////////////////////////////////////////////////////////////////////////////////

////////////////// the specific data came from school and year registrar /////////////
// but not for registrar account

//////////////////////////////// PAYMENT METHOD ////////////////////////////
///////////////////////////// display payment method function ///////////////////
function displaypaymentmethod(req, res, next) {
  let sql = "SELECT paymentmethodcol AS paymentmethod FROM paymentmethod_tbl";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

///////////////////////// display payment method account function ///////////////////
function displaypaymentmethodaccount(req, res, next) {
  var paymentmethod = req.query.paymentmethod;
  let sql =
    "SELECT accountnamecol AS accountname, accountnumbercol AS accountnumber " +
    "FROM paymentmethod_tbl WHERE paymentmethodcol=?";
  db.query(sql, [paymentmethod], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify(results));
    }
    next();
  });
}
////////////////////////////////////////////////////////////////////

////////////////////////// display payment method ///////////////////
router.get("/displaypaymentmethod", displaypaymentmethod, (req, res) => {
  console.log("displaying payment method");
  res.end();
});
////////////////////////////////////////////////////////////////////

////////////////////////// display payment method account ////////////////
router.get(
  "/displaypaymentmethodaccount",
  displaypaymentmethodaccount,
  (req, res) => {
    console.log("displaying payment method accounts");
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////////

function checkassessmentstudent(req, res, next) {
  var superid = req.query.superid;
  let sql =
    "SELECT notifications_tbl.id FROM " +
    "notifications_tbl " +
    "INNER JOIN assessment_payment_stdnt_tbl " +
    "ON notifications_tbl.id=assessment_payment_stdnt_tbl.id " +
    "WHERE notifications_tbl.superid=? AND assessment_payment_stdnt_tbl.approval=?";
  db.query(sql, [superid, "approved"], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    } else {
      next();
    }
  });
}

//////////////////////////////////// upload payment files ////////////////////////////
router.post(
  "/uploadpayment",
  checkassessmentstudent,
  checkifvalid,
  upload.single("receipt"),
  studentpaymentdata,
  checkfiles,
  (req, res) => {
    console.log("Inserted new files");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////

module.exports = router;
