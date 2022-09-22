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

const sendcode = require("./forgotpassword");
const checkcode = require("./checkemail");
const changepass = require("./changepassword");

//////////////////////////// forgot password ///////////////////////////
router.post("/resetaccount", upload.none(), sendcode, (req, res) => {
  res.send(JSON.stringify([{ id: "invalid" }]));
  res.end();
});
////////////////////////////////////////////////////////////////////////

//////////////////////////// check code from email /////////////////////
router.post("/checksentcode", upload.none(), checkcode, (req, res) => {
  res.send(JSON.stringify([{ id: "invalid" }]));
  res.end();
});
////////////////////////////////////////////////////////////////////////

//////////////////////////// verify code ////////////////////////
router.post("/updatepassword", upload.none(), changepass, (req, res) => {
  res.send(JSON.stringify([{ id: "invalid" }]));
  res.end();
});
////////////////////////////////////////////////////////////////////////

module.exports = router;
