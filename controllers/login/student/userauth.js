const superadmin_tbl = require("../../../models/superadmin_tbl");

const userauth = async (req, res, next) => {
  try {
    res.locals.results = "none";
    const { username } = req.body;
    const results = await superadmin_tbl.findOne({ username });
    if (results) {
      res.locals.results = results;
      next();
    } else {
      res.locals.results = "none";
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  userauth: userauth,
};
