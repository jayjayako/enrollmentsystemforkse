var express = require("express");
var router = express.Router();

const { superadminacc } = require("./getaccountprofile");
const { superadminactivity } = require("./getactivities");
const { getaccountpic } = require("./getaccountpicture");

/////////////////////// for dashboard page ///////////////////
router.get("/", superadminacc, async (req, res) => {
  try {
    var results = res.locals.results;
    res.json({
      status: "success",
      name: req.session.lastname + " " + req.session.firstname,
      picture: results[0].superadmin_info.picture,
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
