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
////////////////////////////////////////////////////////

var db = require("../modulelibrary/databaseconn");
const verifyupdateadmin = require("./updateadminpassword");
const passwordvalidation = require("./passwordvalidation");

const { generateid } = require("../modulelibrary/idgenerator");
const {
  encodethecookie,
  decypherthecookie,
} = require("../modulelibrary/encryption");

const { loggedin, loggedout } = require("../modulelibrary/loghistory");

/////////////////// adding new session /////////////////
function addnewsession(userid) {
  var sessionid = generateid();
  let post = {
    session_id: sessionid,
    id: userid,
  };
  let sql = "INSERT INTO session_tbl SET ?";
  db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log("user logged in:" + results.affectedRows);
  });
  return encodethecookie(sessionid);
}
///////////////////////////////////////////////////////////////////////

///////////////////// delete otp table function /////////////////
function deleteotptable(idnum) {
  let sql = "DELETE FROM otp_tbl WHERE id=?";
  db.query(sql, idnum, (err, results) => {
    if (err) throw err;
    console.log("Number of records Deleted: " + results.affectedRows);
  });
}
/////////////////////////////////////////////////////////////////

///////////////////////// for admin only ///////////////////
function getadminid(req, res, next) {
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

router.use(
  getadminid,
  verifyupdateadmin,
  passwordvalidation,
  (req, res, next) => {
    try {
      if (res.locals.updateadmin == "success") {
        res.cookie("sessionid", addnewsession(res.locals.idvar), {
          // maxAge: 5000,
          //expires: new Date('2 September 2021'),
          httpOnly: true,
          secure: true, // set this to true when using https
          sameSite: "lax",
        });
        res.clearCookie("emailsessid");
        deleteotptable(res.locals.idvar);

        var parseIp = (req) =>
          req.headers["x-forwarded-for"]?.split(",").shift() ||
          req.socket?.remoteAddress;

        loggedin(res.locals.idvar, parseIp(req), "admin");
        res.send(JSON.stringify([{ id: "adminloginsuccess" }]));
        res.end();
      } else {
        next();
      }
    } catch (error) {
      console.log("An error has occured");
      next();
    }
  }
);
////////////////////////////////////////////////////////////////////

module.exports = router;
