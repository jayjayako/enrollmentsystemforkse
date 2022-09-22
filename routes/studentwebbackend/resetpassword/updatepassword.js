var db = require("../modulelibrary/databaseconn");
var {
  checkforxss,
  checknumbers,
  checkuppercase,
  checklowercase,
  checkspecialchar,
} = require("../modulelibrary/checkstring");

///////////////////////// update password account ///////////////////
function verifyupdatestudent(req, res, next) {
  var newpass = req.body.newpassword;
  var confirmpass = req.body.confirmpassword;

  if (newpass == confirmpass) {
    if (checkforxss(newpass) == false) {
      // true
      if (
        newpass.length >= 8 &&
        checknumbers(newpass) == true &&
        checkuppercase(newpass) == true &&
        checklowercase(newpass) == true &&
        checkspecialchar(newpass) == true
      ) {
        let post = { password: newpass };
        let sql = "UPDATE student_tbl SET ? WHERE id=?";
        db.query(sql, [post, res.locals.idvar], (err, results) => {
          if (err) throw err;
          console.log("Number of records updated:" + results.affectedRows);
          next();
        });
      }
      // must more than 8 characters
      if (newpass.length < 8) {
        res.send(
          JSON.stringify([
            { id: "invalid", error: "must more than 8 characters" },
          ])
        );
        res.end();
      }
      // must have numbers
      if (checknumbers(newpass) == false) {
        res.send(
          JSON.stringify([{ id: "invalid", error: "must have numbers" }])
        );
        res.end();
      }
      // must have uppercase letters
      if (checkuppercase(newpass) == false) {
        res.send(
          JSON.stringify([
            { id: "invalid", error: "must have uppercase letters" },
          ])
        );
        res.end();
      }
      // must have lowercase letters
      if (checklowercase(newpass) == false) {
        res.send(
          JSON.stringify([
            { id: "invalid", error: "must have lowercase letters" },
          ])
        );
        res.end();
      }
      // must have special characters
      if (checkspecialchar(newpass) == false) {
        res.send(
          JSON.stringify([
            { id: "invalid", error: "must have special characters" },
          ])
        );
        res.end();
      }
    } else {
      res.send(JSON.stringify([{ id: "invalid", error: "it contains <>" }]));
      res.end();
    }
  } else {
    res.send(
      JSON.stringify([{ id: "invalid", error: "Password doesn't match" }])
    );
    res.end();
  }
}
/////////////////////////////////////////////////////////////////////////

module.exports = {
  verifyupdatestudent: verifyupdatestudent,
};
