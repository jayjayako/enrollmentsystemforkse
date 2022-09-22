var db = require("./databaseconn");
const { checkxssforaccount } = require("./checkxss");

module.exports = {
  checkxssforaccount: checkxssforaccount,
};
