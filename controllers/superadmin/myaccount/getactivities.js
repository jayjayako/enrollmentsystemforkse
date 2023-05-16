const superadmin_tbl = require("../../../models/superadmin_tbl");

const superadminactivity = async (req, res, next) => {
  try {
    const usersdata = await superadmin_tbl
      .aggregate([
        {
          $lookup: {
            from: "activity_log",
            localField: "id",
            foreignField: "id",
            as: "activity_log",
          },
        },
        { $unwind: "$activity_log" },
        { $match: { id: "1" } },
        {
          $project: {
            "_id": 0,
            "id": 1,
            "lastname": 1,
            "activity_log.time": 1,
            "activity_log.activities": 1,
            "activity_log.usertype": 1,
            "activity_log.year": 1,
          },
        },
        { $sort: { "activity_log.time": -1 } },
        { $limit: 4 },
        
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
    superadminactivity: superadminactivity,
};
