var express = require("express");
var router = express.Router();

const { superadminacc } = require("./getaccountprofile");
const { getaccountpic } = require("./getaccountpicture");
const { superadminactivity } = require("./getactivities");

const editaccount = require("./updateaccauth");

/////////////////////// for account page ///////////////////
router.get("/", superadminacc, async (req, res) => {
  try {
    var results = res.locals.results;
    res.json({
      status: "success",
      lastname: results[0].lastname,
      firstname: results[0].firstname,
      username: results[0].username,
      password: req.session.password,
      picture: results[0].superadmin_info.picture,
      birthdate: results[0].superadmin_info.birthdate,
      email: results[0].superadmin_info.email,
      phone: results[0].superadmin_info.phone,
      address: results[0].superadmin_info.address,
    });
  } catch (error) {
    res.json({ status: "invalid" });
  }
});

router.get("/activities", superadminactivity, async (req, res) => {
  try {
    var results = res.locals.results;
    res.json({
      status: "success",
      allresults: results,
    });
  } catch (error) {
    res.json({ status: "invalid" });
  }
});
///////////////////////////////////////////////////////////////

//////////////////////// updating account /////////////////////
router.use("/editaccount", editaccount);
///////////////////////////////////////////////////////////////
////////////////////// get profile picture ////////////////////
router.get("/profilepic", getaccountpic, async (req, res) => {
  try {
    res.set({
      "Content-Disposition": `inline; filename="${res.locals.filename}"`,
      "Content-Type": res.locals.file.mimeType,
    });
    res.locals.response.data.pipe(res);
  } catch (error) {
    res.json({ status: "invalid" });
  }
});
///////////////////////////////////////////////////////////////

module.exports = router;
