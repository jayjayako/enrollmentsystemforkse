const express = require("express");
/////////////////////////////////////////////////
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////
const multer = require("multer");
const upload = multer();

var db = require("../../modulelibrary/databaseconn");
//////////////////// activity log ///////////////////
const { activitylog } = require("../../modulelibrary/activitylog");
/////////////////////////////////////////////////////
//////////////////// notifications //////////////////
const { notification } = require("../../modulelibrary/msgnotifications");
/////////////////////////////////////////////////////

////////////////////////////////// new student functions //////////////////////////////
function displaynewstudent(req, res, next) {
  let sql =
    "SELECT student_personal_info.id, student_tbl.lastname, student_tbl.firstname " +
    "FROM (((student_personal_info INNER JOIN student_tbl ON student_personal_info.id=student_tbl.id) " +
    "INNER JOIN student_info ON student_personal_info.id = student_info.id) " +
    "INNER JOIN reserved_tbl ON student_personal_info.id = reserved_tbl.id) " +
    "WHERE student_info.status='newstudent' AND student_personal_info.approval='notapproved' " +
    "ORDER BY FIELD(reserved_tbl.approval, 'approved') DESC ";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}

function displayspecificnewstudent(req, res, next) {
  var studentid = req.query.studentid;
  let sql =
    "SELECT student_tbl.firstname, student_tbl.lastname, student_info.picture, student_personal_info.birthdate, " +
    "student_personal_info.gender, student_personal_info.address, student_personal_info.contact_no, " +
    "student_personal_info.mothers_name, student_personal_info.mothers_occupation, student_personal_info.mothers_contact_no, " +
    "student_personal_info.fathers_name, student_personal_info.fathers_occupation, student_personal_info.fathers_contact_no, " +
    "student_personal_info.guardians_name, student_personal_info.relationship_to_guardian, student_personal_info.guardians_contact_no, " +
    "student_personal_info.guardians_address " +
    "FROM ((student_personal_info INNER JOIN student_tbl ON student_personal_info.id=student_tbl.id) " +
    "INNER JOIN student_info ON student_personal_info.id = student_info.id) " +
    'WHERE student_tbl.id=? AND student_info.status="newstudent" AND student_personal_info.approval="notapproved"';
  db.query(sql, [studentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}

function displayspecificnewstudentfiles(req, res, next) {
  var studentid = req.query.studentid;
  let sql =
    "SELECT student_files.filetype, student_files.filename " +
    "FROM ((student_files INNER JOIN student_personal_info ON student_files.id = student_personal_info.id) " +
    "INNER JOIN student_info ON student_files.id = student_info.id) " +
    'WHERE student_files.id=? AND student_info.status="newstudent" AND student_personal_info.approval="notapproved"';
  db.query(sql, [studentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}
//////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// this is for new student admission /////////////////////////
/////////////////////////// display all new student admission /////////////////////////
router.get("/displaynewstudent", displaynewstudent, (req, res) => {
  console.log("displaying new student");
  if (res.locals.statuscode == "invalid") {
    res.send(JSON.stringify([{ id: "invalid" }]));
  }
  res.end();
});
//////////////////////////////////////////////////////////////////////

/////////////////////////// display specific new student /////////////////////////////
router.get(
  "/displayspecificnewstudent",
  displayspecificnewstudent,
  (req, res) => {
    console.log("displaying specific new student");
    if (res.locals.statuscode == "invalid") {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
    res.end();
  }
);
//////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// display new student files /////////////////////////////////////
router.get(
  "/displaynewstudentfiles",
  displayspecificnewstudentfiles,
  (req, res) => {
    console.log("displaying new student files");
    if (res.locals.statuscode == "invalid") {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
    res.end();
  }
);
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// transferee student functions ////////////////////////////////
function displaytransfereestudent(req, res, next) {
  let sql =
    "SELECT student_personal_info.id, student_tbl.lastname, student_tbl.firstname " +
    "FROM (((student_personal_info INNER JOIN student_tbl ON student_personal_info.id=student_tbl.id) " +
    "INNER JOIN student_info ON student_personal_info.id = student_info.id) " +
    "INNER JOIN reserved_tbl ON student_personal_info.id = reserved_tbl.id) " +
    "WHERE student_info.status='transferee' AND student_personal_info.approval='notapproved' " +
    "ORDER BY FIELD(reserved_tbl.approval, 'approved') DESC ";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}

function displayspecifictransfereestudent(req, res, next) {
  var studentid = req.query.studentid;
  let sql =
    "SELECT student_tbl.firstname, student_tbl.lastname, student_info.picture, student_personal_info.birthdate, " +
    "student_personal_info.gender, student_personal_info.address, student_personal_info.contact_no, " +
    "student_personal_info.mothers_name, student_personal_info.mothers_occupation, student_personal_info.mothers_contact_no, " +
    "student_personal_info.fathers_name, student_personal_info.fathers_occupation, student_personal_info.fathers_contact_no, " +
    "student_personal_info.guardians_name, student_personal_info.relationship_to_guardian, student_personal_info.guardians_contact_no, " +
    "student_personal_info.guardians_address " +
    "FROM ((student_personal_info INNER JOIN student_tbl ON student_personal_info.id=student_tbl.id) " +
    "INNER JOIN student_info ON student_personal_info.id = student_info.id) " +
    'WHERE student_tbl.id=? AND student_info.status="transferee" AND student_personal_info.approval="notapproved"';
  db.query(sql, [studentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}

function displayspecifictransfereestudentfiles(req, res, next) {
  var studentid = req.query.studentid;
  let sql =
    "SELECT student_files.filetype, student_files.filename " +
    "FROM ((student_files INNER JOIN student_personal_info ON student_files.id = student_personal_info.id) " +
    "INNER JOIN student_info ON student_files.id = student_info.id) " +
    'WHERE student_files.id=? AND student_info.status="transferee" AND student_personal_info.approval="notapproved"';
  db.query(sql, [studentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////// this is for transferee student admission ////////////////////////

///////////////////////// display all transferee student admission ////////////////////////
router.get(
  "/displaytransfereestudent",
  displaytransfereestudent,
  (req, res) => {
    console.log("displaying transferee student");
    if (res.locals.statuscode == "invalid") {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
    res.end();
  }
);
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////// display specific transferee student //////////////////////////////
router.get(
  "/displayspecifictransfereestudent",
  displayspecifictransfereestudent,
  (req, res) => {
    console.log("displaying specific transferee student");
    if (res.locals.statuscode == "invalid") {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
    res.end();
  }
);
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////// display transferee student files ///////////////////////////////
router.get(
  "/displaytransfereestudentfiles",
  displayspecifictransfereestudentfiles,
  (req, res) => {
    console.log("displaying transferee student files");
    if (res.locals.statuscode == "invalid") {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
    res.end();
  }
);
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////// foreign student functions ///////////////////////////////////
function displayforeignstudent(req, res, next) {
  let sql =
    "SELECT student_personal_info.id, student_tbl.lastname, student_tbl.firstname " +
    "FROM (((student_personal_info INNER JOIN student_tbl ON student_personal_info.id=student_tbl.id) " +
    "INNER JOIN student_info ON student_personal_info.id = student_info.id) " +
    "INNER JOIN reserved_tbl ON student_personal_info.id = reserved_tbl.id) " +
    "WHERE student_info.status='foreign' AND student_personal_info.approval='notapproved' " +
    "ORDER BY FIELD(reserved_tbl.approval, 'approved') DESC ";
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}

function displayspecificforeignstudent(req, res, next) {
  var studentid = req.query.studentid;
  let sql =
    "SELECT student_tbl.firstname, student_tbl.lastname, student_info.picture, student_personal_info.birthdate, " +
    "student_personal_info.gender, student_personal_info.address, student_personal_info.contact_no, " +
    "student_personal_info.mothers_name, student_personal_info.mothers_occupation, student_personal_info.mothers_contact_no, " +
    "student_personal_info.fathers_name, student_personal_info.fathers_occupation, student_personal_info.fathers_contact_no, " +
    "student_personal_info.guardians_name, student_personal_info.relationship_to_guardian, student_personal_info.guardians_contact_no, " +
    "student_personal_info.guardians_address " +
    "FROM ((student_personal_info INNER JOIN student_tbl ON student_personal_info.id=student_tbl.id) " +
    "INNER JOIN student_info ON student_personal_info.id = student_info.id) " +
    'WHERE student_tbl.id=? AND student_info.status="foreign" AND student_personal_info.approval="notapproved"';
  db.query(sql, [studentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}

function displayspecificforeignstudentfiles(req, res, next) {
  var studentid = req.query.studentid;
  let sql =
    "SELECT student_files.filetype, student_files.filename " +
    "FROM ((student_files INNER JOIN student_personal_info ON student_files.id = student_personal_info.id) " +
    "INNER JOIN student_info ON student_files.id = student_info.id) " +
    'WHERE student_files.id=? AND student_info.status="foreign" AND student_personal_info.approval="notapproved"';
  db.query(sql, [studentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////// this is for foreign student admission /////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
router.get("/displayforeignerstudent", displayforeignstudent, (req, res) => {
  console.log("displaying foreign student");
  if (res.locals.statuscode == "invalid") {
    res.send(JSON.stringify([{ id: "invalid" }]));
  }
  res.end();
});
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
router.get(
  "/displayspecificforeignerstudent",
  displayspecificforeignstudent,
  (req, res) => {
    console.log("displaying specific foreign student");
    if (res.locals.statuscode == "invalid") {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
    res.end();
  }
);
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
router.get(
  "/displayforeignerstudentfiles",
  displayspecificforeignstudentfiles,
  (req, res) => {
    console.log("displaying foreign student files");
    if (res.locals.statuscode == "invalid") {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
    res.end();
  }
);
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////// old student functions ///////////////////////////////////
function displayoldstudent(req, res, next) {
  let sql =
    "SELECT student_personal_info.id, student_tbl.lastname " +
    "FROM ((student_personal_info INNER JOIN student_tbl ON student_personal_info.id=student_tbl.id) " +
    "INNER JOIN student_info ON student_personal_info.id = student_info.id) " +
    'WHERE student_info.status="old" AND student_personal_info.approval="notapproved"';
  db.query(sql, (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}

function displayspecificoldstudent(req, res, next) {
  var studentid = req.query.studentid;
  let sql =
    "SELECT student_tbl.firstname, student_tbl.lastname, student_info.picture, student_personal_info.birthdate, " +
    "student_personal_info.gender, student_personal_info.address, student_personal_info.contact_no, " +
    "student_personal_info.mothers_name, student_personal_info.mothers_occupation, student_personal_info.mothers_contact_no, " +
    "student_personal_info.fathers_name, student_personal_info.fathers_occupation, student_personal_info.fathers_contact_no, " +
    "student_personal_info.guardians_name, student_personal_info.relationship_to_guardian, student_personal_info.guardians_contact_no, " +
    "student_personal_info.guardians_address " +
    "FROM ((student_personal_info INNER JOIN student_tbl ON student_personal_info.id=student_tbl.id) " +
    "INNER JOIN student_info ON student_personal_info.id = student_info.id) " +
    'WHERE student_tbl.id=? AND student_info.status="old" AND student_personal_info.approval="notapproved"';
  db.query(sql, [studentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}

function displayspecificoldstudentfiles(req, res, next) {
  var studentid = req.query.studentid;
  let sql =
    "SELECT old_student_files.filetype, old_student_files.filename " +
    "FROM ((old_student_files INNER JOIN student_personal_info ON old_student_files.id = student_personal_info.id) " +
    "INNER JOIN student_info ON old_student_files.id = student_info.id) " +
    'WHERE old_student_files.id=? AND student_info.status="old" AND old_student_files.approval="notapproved"';
  db.query(sql, [studentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// this is for old student admission ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
router.get("/displayoldstudent", displayoldstudent, (req, res) => {
  console.log("displaying old student");
  if (res.locals.statuscode == "invalid") {
    res.send(JSON.stringify([{ id: "invalid" }]));
  }
  res.end();
});
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
router.get(
  "/displayspecificoldstudent",
  displayspecificoldstudent,
  (req, res) => {
    console.log("displaying specific old student");
    if (res.locals.statuscode == "invalid") {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
    res.end();
  }
);
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
router.get(
  "/displayoldstudentfiles",
  displayspecificoldstudentfiles,
  (req, res) => {
    console.log("displaying old student files");
    if (res.locals.statuscode == "invalid") {
      res.send(JSON.stringify([{ id: "invalid" }]));
    }
    res.end();
  }
);
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// approve old student admission function ///////////////////////
function approveoldstudent(req, res, next) {
  var studentid = req.query.studentid;
  let post = { approval: "approved" };
  let sql = "UPDATE old_student_files SET ? WHERE id = ?";
  db.query(sql, [post, studentid], (err, results, fields) => {
    if (results.length > 0) {
      res.locals.statuscode = "success";
      res.send(JSON.stringify(results));
      console.log(results);
    } else {
      res.locals.statuscode = "invalid";
    }
    next();
  });
}
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// delete reserve table /////////////////////////////
function deleteresevetable(studentid) {
  let sql = "DELETE FROM reserved_tbl WHERE id = ?";
  db.query(sql, [studentid], (err, results, fields) => {
    if (err) throw err;
    else console.log("deleted records:" + results.affectedRows);
  });
}
///////////////////////////////////////////////////////////////////////////////

//////////////////////////// approve student admission function ///////////////////////////
function approvestudent(req, res, next) {
  var studentid = req.query.studentid;
  let post = { approval: "approved" };
  let sql = "UPDATE student_personal_info SET ? WHERE id = ?";
  db.query(sql, [post, studentid], (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      console.log(results);
      res.locals.statuscode = "success";
      deleteresevetable(studentid);
      next();
    }
  });
}
//////////////////////////////////////////////////////////////////////////////

//////////////////////////// check student ///////////////////////////////////
function checkstudent(req, res, next) {
  var studentid = req.query.studentid;
  let sql = "SELECT id " + "FROM student_personal_info " + "WHERE id=?";
  db.query(sql, [studentid], (err, results, fields) => {
    if (results.length > 0) {
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}
//////////////////////////////////////////////////////////////////////////////

//////////////////////////// check old student //////////////////////////////
function checkoldstudent(req, res, next) {
  var studentid = req.query.studentid;
  let sql = "SELECT id " + "FROM old_student_files " + "WHERE id=?";
  db.query(sql, [studentid], (err, results, fields) => {
    if (results.length > 0) {
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}
/////////////////////////////////////////////////////////////////////////////

/////////////////////////// check if empty ///////////////////////
function checkifempty(req, res, next) {
  try {
    if (
      req.query.studentid != "" &&
      req.query.studentid != "undefined" &&
      req.query.studentid
    ) {
      next();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  } catch (error) {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
//////////////////////////////////////////////////////////////////

//////////////////////////////////// approve new student //////////////////////////////////
router.get(
  "/approvenewstudent",
  checkifempty,
  checkstudent,
  approvestudent,
  (req, res) => {
    console.log("approved new student");
    activitylog(res.locals.currentid, "approved new student");
    var studentid = req.query.studentid;
    let finamessage =
      "[Notification]\n" +
      "Registrar has approved your admission.You can now " +
      "fill the assesment forms and payment to complete the process." +
      "\n" +
      formatAMPM(new Date());
    notification(studentid, "Assesment", "approved", finamessage);
    console.log(res.locals.statuscode);
    if (res.locals.statuscode == "success") {
      res.send(JSON.stringify([{ id: "success" }]));
      res.end();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  }
);
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////// approve transferee ///////////////////////////////////
router.get(
  "/approvetransfereestudent",
  checkifempty,
  checkstudent,
  approvestudent,
  (req, res) => {
    console.log("approved transferee student");
    activitylog(res.locals.currentid, "approved transferee student");
    var studentid = req.query.studentid;
    let finamessage =
      "[Notification]\n" +
      "Registrar has approved your admission.You can now " +
      "fill the assesment forms and payment to complete the process." +
      "\n" +
      formatAMPM(new Date());
    notification(studentid, "Assesment", "approved", finamessage);
    console.log(res.locals.statuscode);
    if (res.locals.statuscode == "success") {
      res.send(JSON.stringify([{ id: "success" }]));
      res.end();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  }
);
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////// approve transferee ///////////////////////////////////
router.get(
  "/approveforeignerstudent",
  checkifempty,
  checkstudent,
  approvestudent,
  (req, res) => {
    console.log("approved foreign student");
    activitylog(res.locals.currentid, "approved foreign student");
    var studentid = req.query.studentid;
    let finamessage =
      "[Notification]\n" +
      "Registrar has approved your admission.You can now " +
      "fill the assesment forms and payment to complete the process." +
      "\n" +
      formatAMPM(new Date());
    notification(studentid, "Assesment", "approved", finamessage);
    console.log(res.locals.statuscode);
    if (res.locals.statuscode == "success") {
      res.send(JSON.stringify([{ id: "success" }]));
      res.end();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  }
);
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////// approve old student //////////////////////////////////
router.get(
  "/approveoldstudent",
  checkifempty,
  checkoldstudent,
  approveoldstudent,
  (req, res) => {
    console.log("approved old student");
    activitylog(res.locals.currentid, "approved old student");
    var studentid = req.query.studentid;
    let finamessage =
      "[Notification]\n" +
      "Registrar has approved your admission.You can now " +
      "fill the assesment forms and payment to complete the process." +
      "\n" +
      formatAMPM(new Date());
    notification(studentid, "Assesment", "approved", finamessage);
    console.log(res.locals.statuscode);
    if (res.locals.statuscode == "success") {
      res.send(JSON.stringify([{ id: "success" }]));
      res.end();
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  }
);
///////////////////////////////////////////////////////////////////////////////////////////

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

module.exports = router;
