const express = require("express");
var randomstring = require("randomstring");

// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const multer = require("multer");
const upload = multer();

const cors = require("cors");

router.use(cors());

///////// this is for cookie parser library ////////////
const cookieParser = require("cookie-parser");
////////////////////////////////////////////////////////
/////////// configures cors to be used in app //////////
router.use(cors({ credentials: true, origin: true }));
router.use(cookieParser());
////////////////////////////////////////////////////////

var db = require("../modulelibrary/databaseconn");
const { sendemail } = require("../modulelibrary/sendemail");

////////////////////// update otp code ///////////////////////////
function updateotpcode(idnum, otpcode) {
  let post = { otp_code: otpcode, validity: "invalid" };
  let sql = "UPDATE otp_tbl SET ? WHERE id = ?";
  db.query(sql, [post, idnum], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
  });
}
//////////////////////////////////////////////////////////////////

////////////////////// insert otp code function //////////////////
function insertotpcode(idnum, otpcode) {
  let post = {
    id: idnum,
    otp_code: otpcode,
    validity: "invalid",
  };
  let sql = "INSERT INTO otp_tbl SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("Added to addnew history " + results.affectedRows);
  });
}
//////////////////////////////////////////////////////////////////

////////////////////// check if already have otp /////////////////
function checkotpfirst(idnum, otpcode) {
  let sql = "SELECT id FROM otp_tbl WHERE id = ?";
  db.query(sql, [idnum], (err, results, fields) => {
    if (results.length > 0) {
      updateotpcode(idnum, otpcode);
    } else {
      insertotpcode(idnum, otpcode);
    }
  });
}
//////////////////////////////////////////////////////////////////

router.use((req, res, next) => {
  try {
    var myemail = req.body.email;
    let sql = "SELECT id, email FROM admin_info WHERE email = ?";
    db.query(sql, [myemail], (err, results, fields) => {
      if (results.length > 0) {
        var myrandomstring = randomstring.generate(20);
        var myresult = results[0].email;
        checkotpfirst(results[0].id, myrandomstring);
        sendemail(myresult, myrandomstring);

        res.send(JSON.stringify([{ id: "success" }]));
        res.end();
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("An error has occured");
  }
});

module.exports = router;
