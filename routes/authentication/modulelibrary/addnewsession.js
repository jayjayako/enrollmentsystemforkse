var express = require("express");
var router = express.Router();

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const { generateid } = require("./idgenerator");
const { encodethecookie, decypherthecookie } = require("./encryption");

const db = require("./databaseconn");

///////////////////////// adding new session ////////////////////////////
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

//////////////////////// checking if super admin //////////////////////
router.use((req, res, next) => {
  if (
    res.locals.superadminloginstats == "success" &&
    res.locals.addnewsessionchecker != "invalid"
  ) {
    res.locals.addnewsessionchecker = "valid";
    next();
  } else if (
    res.locals.adminloginstats == "success" &&
    res.locals.addnewsessionchecker != "invalid"
  ) {
    res.locals.addnewsessionchecker = "valid";
    next();
  } else if (
    res.locals.staffloginstats == "success" &&
    res.locals.addnewsessionchecker != "invalid"
  ) {
    res.locals.addnewsessionchecker = "valid";
    next();
  } else {
    next();
  }
});
///////////////////////////////////////////////////////////////////////

router.use((req, res, next) => {
  if (res.locals.addnewsessionchecker == "valid") {
    res.cookie("sessionid", addnewsession(res.locals.currentid), {
      // maxAge: 5000,
      // expires: new Date('2 September 2021'),
      httpOnly: true,
      secure: true, // set this to true when using https
      sameSite: "lax",
    });
    res.locals.addnewsessionchecker = "invalid";
  }
  next();
});

module.exports = router;
