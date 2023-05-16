var express = require("express");
var router = express.Router();

const client = require("../../modulelibrary/importredisio");

router.use((req, res, next) => {
  setTimeout(async function () {
    const results = await client.hget(req.session.userid, "socketid");
    if (results) {
    } else {
      req.session.destroy();
    }
  }, 5000);
  next();
});

module.exports = router;
