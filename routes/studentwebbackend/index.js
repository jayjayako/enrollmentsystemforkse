var express = require("express");
var router = express.Router();

const cors = require("cors");

router.use(cors());

///////// this is for cookie parser library ////////////
const cookieParser = require("cookie-parser");
////////////////////////////////////////////////////////
/////////// configures cors to be used in app //////////
router.use(cors({ credentials: true, origin: true }));
router.use(cookieParser());
////////////////////////////////////////////////////////

const { auth } = require("./modulelibrary/auth");

function getcookieval(req, res, next) {
  res.locals.mycookie = req.cookies.sessionid;
  next();
}

var authentication = require("./authentication");
var dashboard = require("./dashboard");
var accountprofile = require("./accountprofile");
var myfiles = require("./myfiles");
var signup = require("./signup");
var resetpassword = require("./resetpassword");

///////////////////////// transaction ///////////////////////
var admission = require("./admission");
var assessment = require("./assessment");
var payment = require("./payment");
var enlistment = require("./enlistment");
var fileschedule = require("./fileschedule");
var inquiry = require("./inquiry");
var messagenotif = require("./messagenotif");
var balance = require("./balance");

/////////////////////////////////////////////////////////////

router.use("/authentication", authentication);
router.use("/dashboard", getcookieval, auth, dashboard);
router.use("/accountprofile", getcookieval, auth, accountprofile);
router.use("/myfiles", getcookieval, auth, myfiles);
router.use("/signup", signup);
router.use("/resetpassword", resetpassword);

//////////////////////// transaction ////////////////////////
router.use("/admission", getcookieval, auth, admission);
router.use("/assessment", getcookieval, auth, assessment);
router.use("/payment", getcookieval, auth, payment);
router.use("/enlistment", getcookieval, auth, enlistment);
router.use("/fileschedule", getcookieval, auth, fileschedule);
router.use("/inquiry", getcookieval, auth, inquiry);
router.use("/messagenotif", getcookieval, auth, messagenotif);
router.use("/balance", getcookieval, auth, balance);
/////////////////////////////////////////////////////////////

module.exports = router;
