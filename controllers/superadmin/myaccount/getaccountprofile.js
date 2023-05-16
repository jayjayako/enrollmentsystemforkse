const superadmin_tbl = require("../../../models/superadmin_tbl");

const superadminacc = async (req, res, next) => {
  try {
    const usersdata = await superadmin_tbl
      .aggregate([
        {
          $lookup: {
            from: "superadmin_info",
            localField: "id",
            foreignField: "id",
            as: "superadmin_info",
          },
        },
        { $unwind: "$superadmin_info" },
        { $match: { id: "1" } },
        {
          $project: {
            "_id": 0,
            "id": 1,
            "lastname": 1,
            "firstname": 1,
            "username": 1,
            "password": 1,
            "superadmin_info.picture": 1,
            "superadmin_info.birthdate": 1,
            "superadmin_info.phone": 1,
            "superadmin_info.email": 1,
            "superadmin_info.address": 1,
          },
        },
      ])
      .exec();
    if (usersdata) {
      res.locals.results = usersdata;
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
  superadminacc: superadminacc,
};
