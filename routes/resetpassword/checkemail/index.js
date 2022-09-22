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

const { generateid } = require("../modulelibrary/idgenerator");
const { encodethecookie } = require("../modulelibrary/encryption");

/////////////////// update otp table function /////////////////
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
///////////////////////////////////////////////////////////////////////

router.use((req, res, next) => {
  try {
    var myemail = req.query.email;
    var mycode = req.body.otpcode;
    let sql =
      "SELECT admin_tbl.username, admin_tbl.id " +
      "FROM ((admin_tbl " +
      "INNER JOIN admin_info ON admin_tbl.id = admin_info.id) " +
      "INNER JOIN otp_tbl ON admin_tbl.id = otp_tbl.id) " +
      "WHERE admin_info.email = ? AND otp_tbl.otp_code = ? AND otp_tbl.validity=?";
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
  } catch (error) {
    console.log("An error has occured");
  }
});

module.exports = router;
