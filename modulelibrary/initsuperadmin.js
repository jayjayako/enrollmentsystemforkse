require("dotenv").config();
const superadmin_tbl = require("../models/superadmin_tbl");

const bcrypt = require("bcrypt");

const userregisterinsert = async (pass) => {
  let user,
    id = "1";
  try {
    user = await superadmin_tbl.findOne({ id: id });
    user.password = pass;
    let results = await user.save();
    if (results) {
      console.log("Update SuperAdmin Password Successfully");
    }
  } catch (err) {
    console.log(err);
  }
};

const initializesuperadmin = async () => {
  let password = process.env.SUPERADMINPASS;
  let pass = await bcrypt.hash(password, 10);
  userregisterinsert(pass);
};

module.exports = initializesuperadmin;
