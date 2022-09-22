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
const { generateid } = require("../modulelibrary/idgenerator");
const {
  encodethecookie,
  decypherthecookie,
} = require("../modulelibrary/encryption");
const { verifyupdatestudent } = require("./updatepassword");
const { sendemail } = require("../modulelibrary/sendemail");
const { loggedin, loggedout } = require("../modulelibrary/loghistory");

///////////////////////// adding new session ////////////////////////////
function addnewsession(userid, ipaddress) {
  var sessionid = generateid();
  let post = {
    session_id: sessionid,
    id: userid,
  };
  let sql = "INSERT INTO session_tbl SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    loggedin(userid, ipaddress);
  });

  return encodethecookie(sessionid);
}
///////////////////////////////////////////////////////////////////////

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

//////////////////// forgot password function ///////////////////
function checkstudentemail(req, res, next) {
  var myemail = req.body.email;
  let sql = "SELECT id, email FROM student_info WHERE email = ?";
  db.query(sql, [myemail], (err, results, fields) => {
    if (results.length > 0) {
      var myrandomstring = randomstring.generate(20);
      var myemailresult = results[0].email;
      checkotpfirst(results[0].id, myrandomstring);
      sendemail(myemailresult, myrandomstring);

      res.locals.status = JSON.stringify([{ id: "success" }]);
    } else {
      res.locals.status = JSON.stringify([{ id: "invalid" }]);
    }
    next();
  });
}
/////////////////////////////////////////////////////////////////

//////////////////////////// reset account ////////////////////////
router.post("/resetaccount", upload.none(), checkstudentemail, (req, res) => {
  res.send(res.locals.status);
  res.end();
});
////////////////////////////////////////////////////////////////////////

/////////////////////// update otp table function ///////////////////////
function updateotptable(res, userid) {
  var sessionid = generateid();
  let post = { session_id: sessionid, validity: "valid" };
  let sql = "UPDATE otp_tbl SET ? WHERE id = ?";
  db.query(sql, [post, userid], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
  });

  res.cookie("emailsessid", encodethecookie(sessionid), {
    // maxAge: 5000,
    //expires: new Date('2 September 2021'),
    httpOnly: true,
    secure: true, // set this to true when using https
    sameSite: "lax",
  });
}
/////////////////////////////////////////////////////////////////////////

///////////////////// check code from email function ////////////////////
function checkstudentcode(req, res, next) {
  var myemail = req.params.email;
  var mycode = req.body.otpcode;
  let sql =
    "SELECT student_tbl.username, student_tbl.id " +
    "FROM ((student_info " +
    "INNER JOIN otp_tbl ON student_info.id = otp_tbl.id) " +
    "INNER JOIN student_tbl ON student_info.id = student_tbl.id) " +
    "WHERE student_info.email = ? AND otp_tbl.otp_code = ? AND otp_tbl.validity=?";
  db.query(sql, [myemail, mycode, "invalid"], (err, results, fields) => {
    if (results.length > 0) {
      updateotptable(res, results[0].id);
      res.send(
        JSON.stringify([
          {
            id: "success",
            username: results[0].username,
          },
        ])
      );
      res.end();
    } else {
      next();
    }
  });
}
////////////////////////////////////////////////////////////////////////

//////////////////////////// verify code ////////////////////////
router.post(
  "/checksentcode/:email",
  upload.none(),
  checkstudentcode,
  (req, res) => {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
);
////////////////////////////////////////////////////////////////////////

///////////////////////// get staff id first ///////////////////
function getstudentid(req, res, next) {
  var emailsessid = decypherthecookie(req.cookies.emailsessid);
  let sql = "SELECT id FROM otp_tbl WHERE session_id = ? AND validity = ?";
  db.query(sql, [emailsessid, "valid"], (err, results, fields) => {
    if (results.length > 0) {
      var myresult = results[0].id;
      res.locals.idvar = myresult;
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}
////////////////////////////////////////////////////////////////

///////////////////// delete otp table function /////////////////
function deleteotptable(idnum) {
  let sql = "DELETE FROM otp_tbl WHERE id=?";
  db.query(sql, idnum, (err, results) => {
    if (err) throw err;
    console.log("Number of records Deleted: " + results.affectedRows);
  });
}
/////////////////////////////////////////////////////////////////

//////////////////////////// verify code ////////////////////////
router.post(
  "/updatepassword",
  upload.none(),
  getstudentid,
  verifyupdatestudent,
  (req, res) => {
    var parseIp = (req) =>
      req.headers["x-forwarded-for"]?.split(",").shift() ||
      req.socket?.remoteAddress;

    res.cookie("sessionid", addnewsession(res.locals.idvar, parseIp(req)), {
      // maxAge: 5000,
      //expires: new Date('2 September 2021'),
      httpOnly: true,
      secure: true, // set this to true when using https
      sameSite: "lax",
    });

    res.clearCookie("emailsessid");
    deleteotptable(res.locals.idvar);
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
////////////////////////////////////////////////////////////////////////

module.exports = router;
