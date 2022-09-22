/////////////////// check position of staff ////////////////
function checkposition(req, res, next) {
  try {
    if (res.locals.myposition == "Admin Department") {
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalidposition" }]));
      res.end();
    }
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
/////////////////////////////////////////////////////////////////////////////

module.exports = {
  checkposition: checkposition,
};
