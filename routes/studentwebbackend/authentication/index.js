const express = require("express");
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
/////////////////////////////////////////////////////////////////////

var db = require("../modulelibrary/databaseconn");
const {
  encodethecookie,
  decypherthecookie,
} = require("../modulelibrary/encryption");
const { generateid } = require("../modulelibrary/idgenerator");
const { date_time, intyear } = require("../modulelibrary/date_time");
const { auth } = require("../modulelibrary/auth");
const { loggedin, loggedout } = require("../modulelibrary/loghistory");
require("dotenv").config();
///////////////////////// delete session when expires ///////////////////
function deletesession(sessionid, userid, ipaddress) {
  var sessid = decypherthecookie(sessionid);
  let sql = "DELETE FROM session_tbl WHERE session_id = ?";
  db.query(sql, [sessid], (err, results, fields) => {
    if (err) throw err;
    else console.log("user logged out:" + results.affectedRows);
  });
  loggedout(userid, ipaddress);
}
/////////////////////////////////////////////////////////////////////////
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
    console.log("Number of records inserted:" + results.affectedRows);
    loggedin(userid, ipaddress);
  });
  return encodethecookie(sessionid);
}
///////////////////////////////////////////////////////////////////////

//////////////////////////// checkifexist /////////////////////////////
function getid(req, res, next) {
  var user = req.body.username;
  var pass = req.body.password;
  let sql = "SELECT id FROM student_tbl WHERE username = ? AND password = ?";
  db.query(sql, [user, pass], (err, results, fields) => {
    if (results.length > 0) {
      var myresult = results[0].id;
      res.locals.idvar = myresult;
    } else {
      res.locals.idvar = "none";
    }
    next();
  });
}
function checkifexist(req, res, next) {
  let sql = "SELECT session_id FROM session_tbl WHERE id = ?";
  db.query(sql, [res.locals.idvar], (err, results, fields) => {
    if (results.length > 0) {
      res.send(JSON.stringify([{ id: "accessdenied" }]));
      res.end();
    } else {
      next();
    }
  });
}
///////////////////////////////////////////////////////////////////////

var loginattempt = {};
var disabled = {};

///////////////////// student login module ////////////////////////
router.post("/login", upload.none(), getid, checkifexist, (req, res) => {
  var parseIp = (req) =>
    req.headers["x-forwarded-for"]?.split(",").shift() ||
    req.socket?.remoteAddress;

  console.log(req.body);
  var user = req.body.username;
  var pass = req.body.password;
  let sql = "SELECT id FROM student_tbl WHERE username = ? AND password = ?";
  db.query(sql, [user, pass], (err, results, fields) => {
    if (results.length > 0 && !disabled[parseIp(req)]) {
      var myresult = results[0].id;
      console.log(myresult);
      res.cookie("sessionid", addnewsession(myresult, parseIp(req)), {
        // maxAge: 5000,
        //expires: new Date('2 September 2021'),
        httpOnly: true,
        secure: true, // set this to true when using https
        sameSite: "lax",
      });
      res.send(JSON.stringify([{ id: "success" }]));
    } else {
      if (!disabled[parseIp(req)]) {
        if (!loginattempt[parseIp(req)]) {
          loginattempt[parseIp(req)] = 0;
        }
        loginattempt[parseIp(req)] += 1;
        res.send(
          JSON.stringify([
            { id: "accessdenied", loginattempt: loginattempt[parseIp(req)] },
          ])
        );

        if (loginattempt[parseIp(req)] == 5) {
          disabled[parseIp(req)] = "yes";
          setTimeout(function () {
            delete disabled[parseIp(req)];
          }, 10000);
          delete loginattempt[parseIp(req)];
        }
      } else {
        res.send(JSON.stringify([{ id: "accessdenied" }]));
      }
    }
    res.end();
  });
});
/////////////////////////////////////////////////////////////////////

function getcookieval(req, res, next) {
  res.locals.mycookie = req.cookies.sessionid;
  console.log(res.locals.mycookie);
  next();
}

////////////////////// for logging out ///////////////////////////////////////
router.get("/logout", getcookieval, auth, (req, res) => {
  var parseIp = (req) =>
    req.headers["x-forwarded-for"]?.split(",").shift() ||
    req.socket?.remoteAddress;
  console.log(parseIp(req));
  var sessionid = decypherthecookie(res.locals.mycookie);
  let sql = "SELECT id " + "FROM session_tbl " + "WHERE session_id = ?";
  db.query(sql, [sessionid], (err, results, fields) => {
    if (results.length > 0) {
      deletesession(res.locals.mycookie, res.locals.currentid, parseIp(req));
      res.clearCookie("sessionid");
      res.send(JSON.stringify([{ id: "success" }]));
      res.end();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
});
//////////////////////////////////////////////////////////////////////////////
module.exports = router;
