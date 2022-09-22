var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer();

const cors = require("cors");

///////// this is for cookie parser library ////////////
const cookieParser = require("cookie-parser");
////////////////////////////////////////////////////////
/////////// configures cors to be used in app //////////
router.use(cors({ credentials: true, origin: true }));
router.use(cookieParser());
////////////////////////////////////////////////////////

const { loggedin, loggedout } = require("./modulelibrary/loghistory");

const login1 = require("./superadmin");
const login2 = require("./admin");
const login3 = require("./staff");
// const login4 = require("./student");
// const login5 = require("./studentweb");

const logout = require("./modulelibrary/deletesession");
const checkuser = require("./modulelibrary/checkuser");
const checkposition = require("./modulelibrary/checkposition");
const auth = require("./modulelibrary/getsession");

// request handler using express
////////////////////// for logging in ///////////////////////
router.post("/login", upload.none(), login1, login2, login3, (req, res) => {
  ///////// dagdagan nalang for many users
  var parseIp = (req) =>
    req.headers["x-forwarded-for"]?.split(",").shift() ||
    req.socket?.remoteAddress;
  if (res.locals.superadminloginstats == "success") {
    loggedin(res.locals.currentid, parseIp(req), "superadmin");
    res.send(JSON.stringify([{ id: "superadminloginsuccess" }]));
    res.end();
  } else if (res.locals.adminloginstats == "success") {
    loggedin(res.locals.currentid, parseIp(req), "admin");
    res.send(JSON.stringify([{ id: "adminloginsuccess" }]));
    res.end();
  } else if (res.locals.staffloginstats == "success") {
    loggedin(res.locals.currentid, parseIp(req), "staff");
    res.send(JSON.stringify([{ id: "staffloginsuccess" }]));
    res.end();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});
/////////////////////////////////////////////////////////////

////////////////////// for logging out ///////////////////////
router.get("/logout", auth, checkposition, logout, (req, res) => {
  var parseIp = (req) =>
    req.headers["x-forwarded-for"]?.split(",").shift() ||
    req.socket?.remoteAddress;
  console.log(res.locals.myposition, "this is data");
  loggedout(res.locals.currentid, parseIp(req), res.locals.myposition);
  res.send(JSON.stringify([{ id: "logoutsuccess" }]));
  res.end();
});
/////////////////////////////////////////////////////////////

////////////////////// check user account ///////////////////
router.get("/checkuser", auth, checkuser, (req, res) => {
  console.log("checking account");
  res.send(JSON.stringify([{ id: "invalid" }]));
  res.end();
});
/////////////////////////////////////////////////////////////

module.exports = router;
