const superadmin_tbl = require("../../../models/superadmin_tbl");
const superadmin_info = require("../../../models/superadmin_info");
const bcrypt = require("bcrypt");

const updateuserdbinfo = async (id, birthdate, email, phone, address) => {
  let user;
  user = await superadmin_info.findOne({ id: id });
  user.birthdate = birthdate;
  user.email = email;
  user.phone = phone;
  user.address = address;
  let results = await user.save();
  if (results) {
    console.log("Update SuperAdmin Info Successfully");
  }
};

const updateusertbl = async (
  id,
  username,
  password,
  lastname,
  firstname,
  birthdate,
  email,
  phone,
  address
) => {
  let user;
  user = await superadmin_tbl.findOne({ id: id });
  user.username = username;
  user.password = await bcrypt.hash(password, 10);
  user.lastname = lastname;
  user.firstname = firstname;
  updateuserdbinfo(id, birthdate, email, phone, address);
  let results = await user.save();
  if (results) {
    console.log("Update SuperAdmin Successfully");
  }
};

module.exports = {
  updateusertbl: updateusertbl,
};
