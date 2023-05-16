const superadmin_tbl = require("../../../models/superadmin_tbl");
const admin_tbl = require("../../../models/admin_tbl");
const staff_tbl = require("../../../models/staff_tbl");

const superadminauth = async (req, res, next) => {
  res.locals.results = "none";
  res.locals.position = "none";
  res.locals.loggedinstat = "none";
  try {
    const { username } = req.body;
    const results = await superadmin_tbl.findOne({ username });
    if (results) {
      res.locals.results = results;
      res.locals.position = "superadmin";
      res.locals.loggedinstat = "success";
      next();
    } else {
      res.locals.results = "none";
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

const adminauth = async (req, res, next) => {
  if (res.locals.loggedinstat != "success") {
    try {
      const { username } = req.body;
      const results = await admin_tbl.findOne({ username });
      if (results) {
        res.locals.results = results;
        res.locals.position = "admin";
        next();
      } else {
        res.locals.results = "none";
        next();
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    next();
  }
};

const staffauth = async (req, res, next) => {
  if (res.locals.loggedinstat != "success") {
    try {
      const { username } = req.body;
      const results = await staff_tbl.findOne({ username });
      if (results) {
        res.locals.results = results;
        res.locals.position = "staff";
        next();
      } else {
        res.locals.results = "none";
        next();
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    next();
  }
};

module.exports = {
  superadminauth: superadminauth,
  adminauth: adminauth,
  staffauth: staffauth,
};
