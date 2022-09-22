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

var {
  checkforxss,
  checknumbers,
  checkuppercase,
  checklowercase,
  checkspecialchar,
} = require("../../modulelibrary/checkstring");

///////////////////////// validate password /////////////////////
router.use((req, res, next) => {
  var newpass = req.body.newpassword;
  var confirmpass = req.body.confirmpassword;

  if (newpass == confirmpass) {
    if (checkforxss(newpass) == false) {
      // must more than 8 characters
      if (newpass.length < 8) {
        res.send(
          JSON.stringify([
            { id: "invalid", error: "must more than 8 characters" },
          ])
        );
        res.end();
      }
      // must have numbers
      if (checknumbers(newpass) == false) {
        res.send(
          JSON.stringify([{ id: "invalid", error: "must have numbers" }])
        );
        res.end();
      }
      // must have uppercase letters
      if (checkuppercase(newpass) == false) {
        res.send(
          JSON.stringify([
            { id: "invalid", error: "must have uppercase letters" },
          ])
        );
        res.end();
      }
      // must have lowercase letters
      if (checklowercase(newpass) == false) {
        res.send(
          JSON.stringify([
            { id: "invalid", error: "must have lowercase letters" },
          ])
        );
        res.end();
      }
      // must have special characters
      if (checkspecialchar(newpass) == false) {
        res.send(
          JSON.stringify([
            { id: "invalid", error: "must have special characters" },
          ])
        );
        res.end();
      }
      if (res.locals.updateadmin == "success") {
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
});
/////////////////////////////////////////////////////////////////////////

module.exports = router;
