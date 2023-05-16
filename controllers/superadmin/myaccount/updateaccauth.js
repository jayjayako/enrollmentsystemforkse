require("dotenv").config();
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const superadmin_info = require("../../../models/superadmin_info");

const { updateusertbl } = require("./updateprofile");
const { updatepicture } = require("./updatepicture");

const { validateinput } = require("./inputvalidation");

const {
  checknumbers,
  checkuppercase,
  checklowercase,
  checkspecialchar,
} = require("../../modulelibrary/checkstring");

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

/////////////////////// get all info first /////////////////////
router.use(async (req, res, next) => {
  let user;
  user = await superadmin_info.findOne({ id: req.session.userid });
  if (user) {
    res.locals.mypicture = user.picture;
    next();
  }
});
////////////////////////////////////////////////////////////////

/////////////////////// input validation /////////////////////
router.use(validateinput, (req, res, next) => {
  const { password } = req.body;
  if (
    checknumbers(password) &&
    checkuppercase(password) &&
    checklowercase(password) &&
    checkspecialchar(password)
  ) {
    next();
  } else {
    if (!checknumbers(password) == false) {
      res.json({ status: "invalid", passwordauth: "must contain number" });
    }
    if (checkuppercase(password) == false) {
      res.json({ status: "invalid", passwordauth: "must contain uppercase" });
    }
    if (checklowercase(password) == false) {
      res.json({ status: "invalid", passwordauth: "must contain lowercase" });
    }
    if (checkspecialchar(password) == false) {
      res.json({
        status: "invalid",
        passwordauth: "must contain special character",
      });
    }
  }
});
//////////////////////////////////////////////////////////////

///////////////////////// update profile ///////////////////////
router.post("/updateprofile", async (req, res) => {
  try {
    const {
      username,
      password,
      lastname,
      firstname,
      birthdate,
      email,
      phone,
      address,
    } = req.body;
    if (req.files != null) {
      console.log("with picture");
      updatepicture(
        req.session.userid,
        res.locals.absolutepath,
        res.locals.mypicture,
        req.files.profilepic
      );
      updateusertbl(
        req.session.userid,
        username,
        password,
        lastname,
        firstname,
        birthdate,
        email,
        phone,
        address
      );
    } else {
      console.log("without picture");
      updateusertbl(
        req.session.userid,
        username,
        password,
        lastname,
        firstname,
        birthdate,
        email,
        phone,
        address
      );
    }
    res.json({
      status: "success",
    });
  } catch (error) {
    res.json({
      status: "invalid",
    });
  }
});
//////////////////////////////////////////////////////////////////
module.exports = router;
