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

var db = require("../../modulelibrary/databaseconn");

var {
  checkforxss,
  checknumbers,
  checkuppercase,
  checklowercase,
  checkspecialchar,
} = require("../../modulelibrary/checkstring");

router.use((req, res, next) => {
  try {
    var newpass = req.body.newpassword;
    var confirmpass = req.body.confirmpassword;

    if (newpass == confirmpass) {
      if (checkforxss(newpass) == false) {
        // true
        if (
          newpass.length >= 8 &&
          checknumbers(newpass) == true &&
          checkuppercase(newpass) == true &&
          checklowercase(newpass) == true &&
          checkspecialchar(newpass) == true
        ) {
          let post = { password: newpass };
          let sql = "UPDATE admin_tbl SET ? WHERE id=?";
          db.query(sql, [post, res.locals.idvar], (err, results) => {
            if (err) throw err;
            console.log("Number of records updated:" + results.affectedRows);
            res.locals.updateadmin = "success";
            next();
          });
        } else {
          res.locals.updateadmin = "invalid";
          next();
        }
      } else {
        res.send(JSON.stringify([{ id: "invalid", error: "it contains <>" }]));
        res.end();
      }
    } else {
      res.send(
        JSON.stringify([{ id: "invalid", error: "Password doesn't match" }])
      );
      res.end();
    }
  } catch (error) {
    console.log("An error has occured", error);
  }
});

module.exports = router;
