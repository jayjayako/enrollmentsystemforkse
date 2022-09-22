const express = require("express");
const fs = require("fs");
// initialize router
const router = express.Router();
//////////////////////////////////////////////////////////////

const multer = require("multer");

var db = require("../modulelibrary/databaseconn");
const { generateid } = require("../modulelibrary/idgenerator");
const {
  enrollmentsched,
  checkstudentifbalance,
  checkifexist,
} = require("../modulelibrary/enrollmentauth");

// store files to folder
////////////////// this is for uploading picture of staff /////////
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, generateid() + "--" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false); // else fails
  }
}

const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter });
//////////////////////////////////////////////////////////////////

function deletefilesfunct(file) {
  fs.unlink("./uploads/" + file, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("deleted file");
  });
}
//////////////////////// get file names on database /////////////////////
function getadmitfilenames(idnum) {
  let sql =
    "SELECT filename " +
    "FROM student_files " +
    'WHERE id = ? AND filetype ="image/png"';
  db.query(sql, [idnum], (err, results, fields) => {
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        deletefilesfunct(results[i].filename);
      }
    }
  });
}
/////////////////////////////////////////////////////////////////////////

///////////////////////// deletes admission files //////////////////////
function deleteadmissionfiles(idnum) {
  let sql = "DELETE FROM student_files WHERE id=?";
  db.query(sql, idnum, (err, results) => {
    if (err) throw err;
    console.log("Number of records Deleted: " + results.affectedRows);
  });
}
////////////////////////////////////////////////////////////////////////

//////////////////////// check if complete files ///////////////////////
function checkfiles(req, res, next) {
  var idnum = res.locals.currentid;
  let sql =
    "SELECT filename " +
    "FROM student_files " +
    'WHERE id = ? AND filename ="../../img/defaultimg.png"';
  db.query(sql, [idnum], (err, results, fields) => {
    if (results.length > 0) {
      getadmitfilenames(res.locals.currentid);
      deleteadmissionfiles(res.locals.currentid);
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    } else {
      next();
    }
  });
}
/////////////////////////////////////////////////////////////////////////
/////////////////// check old student files if complete /////////////////
function checkoldstudentfiles() {
  var idnum = res.locals.currentid;
  let sql =
    "SELECT filename " +
    "FROM old_student_files " +
    'WHERE id = ? AND filename ="../../img/defaultimg.png"';
  db.query(sql, [idnum], (err, results, fields) => {
    if (results.length > 0) {
      getadmitfilenames(res.locals.currentid);
      deleteadmissionfiles(res.locals.currentid);
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    } else {
      next();
    }
  });
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////// newstudent files ////////////////////////////
function newstudentadmissionfiles(req, res, next) {
  res.locals.studentstatus = "newstudent";
  var idnum = res.locals.currentid;
  var pic1,
    pic2,
    pic3,
    pic4,
    pic5,
    filetype1,
    filetype2,
    filetype3,
    filetype4,
    filetype5;
  console.log(req.files);
  try {
    pic1 = req.files["form137"][0].filename;
    filetype1 = req.files["form137"][0].mimetype;
  } catch (error) {
    pic1 = "../../img/defaultimg.png";
    filetype1 = "";
  }

  try {
    pic2 = req.files["birthcertificate"][0].filename;
    filetype2 = req.files["birthcertificate"][0].mimetype;
  } catch (error) {
    pic2 = "../../img/defaultimg.png";
    filetype2 = "";
  }

  try {
    pic3 = req.files["goodmoral"][0].filename;
    filetype3 = req.files["goodmoral"][0].mimetype;
  } catch (error) {
    pic3 = "../../img/defaultimg.png";
    filetype3 = "";
  }

  try {
    pic4 = req.files["recommendationform"][0].filename;
    filetype4 = req.files["recommendationform"][0].mimetype;
  } catch (error) {
    pic4 = "../../img/defaultimg.png";
    filetype4 = "";
  }

  try {
    pic5 = req.files["letterofguarantee"][0].filename;
    filetype5 = req.files["letterofguarantee"][0].mimetype;
  } catch (error) {
    pic5 = "../../img/defaultimg.png";
    filetype5 = "";
  }
  var values = [
    [generateid(), idnum, filetype1, pic1],
    [generateid(), idnum, filetype2, pic2],
    [generateid(), idnum, filetype3, pic3],
    [generateid(), idnum, filetype4, pic4],
    [generateid(), idnum, filetype5, pic5],
  ];
  let sql = "INSERT INTO student_files (superid,id,filetype,filename) VALUES ?";
  db.query(sql, [values], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    next();
  });
}
///////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////// transferee student files ///////////////////////////
function transfereeadmissionfiles(req, res, next) {
  res.locals.studentstatus = "transferee";
  var idnum = res.locals.currentid;
  var pic1,
    pic2,
    pic3,
    pic4,
    pic5,
    filetype1,
    filetype2,
    filetype3,
    filetype4,
    filetype5;
  console.log(req.files);
  try {
    pic1 = req.files["form137"][0].filename;
    filetype1 = req.files["form137"][0].mimetype;
  } catch (error) {
    pic1 = "../../img/defaultimg.png";
    filetype1 = "";
  }

  try {
    pic2 = req.files["transcriptofrecords"][0].filename;
    filetype2 = req.files["transcriptofrecords"][0].mimetype;
  } catch (error) {
    pic2 = "../../img/defaultimg.png";
    filetype2 = "";
  }

  try {
    pic3 = req.files["transfercredentials"][0].filename;
    filetype3 = req.files["transfercredentials"][0].mimetype;
  } catch (error) {
    pic3 = "../../img/defaultimg.png";
    filetype3 = "";
  }

  try {
    pic4 = req.files["honorabledismissal"][0].filename;
    filetype4 = req.files["honorabledismissal"][0].mimetype;
  } catch (error) {
    pic4 = "../../img/defaultimg.png";
    filetype4 = "";
  }

  try {
    pic5 = req.files["goodmoral"][0].filename;
    filetype5 = req.files["goodmoral"][0].mimetype;
  } catch (error) {
    pic5 = "../../img/defaultimg.png";
    filetype5 = "";
  }
  var values = [
    [generateid(), idnum, filetype1, pic1],
    [generateid(), idnum, filetype2, pic2],
    [generateid(), idnum, filetype3, pic3],
    [generateid(), idnum, filetype4, pic4],
    [generateid(), idnum, filetype5, pic5],
  ];
  let sql = "INSERT INTO student_files (superid,id,filetype,filename) VALUES ?";
  db.query(sql, [values], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    next();
  });
}
///////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////// foreign student files //////////////////////////////
function foreignadmissionfiles(req, res, next) {
  res.locals.studentstatus = "foreign";
  var idnum = res.locals.currentid;
  var pic1,
    pic2,
    pic3,
    pic4,
    pic5,
    filetype1,
    filetype2,
    filetype3,
    filetype4,
    filetype5;
  console.log(req.files);
  try {
    pic1 = req.files["atr"][0].filename;
    filetype1 = req.files["atr"][0].mimetype;
  } catch (error) {
    pic1 = "../../img/defaultimg.png";
    filetype1 = "";
  }

  try {
    pic2 = req.files["acr"][0].filename;
    filetype2 = req.files["acr"][0].mimetype;
  } catch (error) {
    pic2 = "../../img/defaultimg.png";
    filetype2 = "";
  }

  try {
    pic3 = req.files["crts"][0].filename;
    filetype3 = req.files["crts"][0].mimetype;
  } catch (error) {
    pic3 = "../../img/defaultimg.png";
    filetype3 = "";
  }

  try {
    pic4 = req.files["studentsvisa"][0].filename;
    filetype4 = req.files["studentsvisa"][0].mimetype;
  } catch (error) {
    pic4 = "../../img/defaultimg.png";
    filetype4 = "";
  }

  try {
    pic5 = req.files["idpictures"][0].filename;
    filetype5 = req.files["idpictures"][0].mimetype;
  } catch (error) {
    pic5 = "../../img/defaultimg.png";
    filetype5 = "";
  }
  var values = [
    [generateid(), idnum, filetype1, pic1],
    [generateid(), idnum, filetype2, pic2],
    [generateid(), idnum, filetype3, pic3],
    [generateid(), idnum, filetype4, pic4],
    [generateid(), idnum, filetype5, pic5],
  ];
  let sql = "INSERT INTO student_files (superid,id,filetype,filename) VALUES ?";
  db.query(sql, [values], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    next();
  });
}
///////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////// old student files //////////////////////////////////
function oldstudentadmissionfiles(req, res, next) {
  res.locals.studentstatus = "old";
  var idnum = res.locals.currentid;
  var pic1, filetype1;
  console.log(req.files);
  try {
    pic1 = req.files["gradeslip"][0].filename;
    filetype1 = req.files["atr"][0].mimetype;
  } catch (error) {
    pic1 = "../../img/defaultimg.png";
    filetype1 = "";
  }

  var values = [[generateid(), idnum, filetype1, pic1]];
  let sql =
    "INSERT INTO old_student_files (superid,id,filetype,filename) VALUES ?";
  db.query(sql, [values], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
    next();
  });
}
///////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////// update student status //////////////////////////////
function updatestudentstatus(idnum, studentstat) {
  let post = { status: studentstat };
  let sql = "UPDATE student_info SET ? WHERE id=?";
  db.query(sql, [post, idnum], (err, results) => {
    if (err) throw err;
    console.log("Number of records updated: " + results.affectedRows);
  });
}
////////////////////////////////////////////////////////////////////////

/////////////////////////// check reservation ///////////////////////////
function checkreservation(idnum) {
  let sql = "SELECT id " + "FROM reserved_tbl " + "WHERE id = ?";
  db.query(sql, [idnum], (err, results, fields) => {
    if (results.length > 0) {
      console.log("already reserved");
    } else {
      insertreservation(idnum);
    }
  });
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////// insert reservation ///////////////////////////
function insertreservation(idnum) {
  let post = {
    superid: generateid(),
    id: idnum,
    approval: "notapproved",
  };
  let sql = "INSERT INTO reserved_tbl SET ?";
  db.query(sql, [post], (err, results) => {
    if (err) throw err;
    console.log("Number of records inserted: " + results.affectedRows);
  });
}
//////////////////////////////////////////////////////////////////////////

/////////////////////// student info insert //////////////////////////////
function studentadmissioninfo(req, res, next) {
  if (
    req.body.birthdate &&
    req.body.gender &&
    req.body.address &&
    req.body.contactno &&
    req.body.mothersname &&
    req.body.mothersoccupation &&
    req.body.motherscontactno &&
    req.body.fathersname &&
    req.body.fathersoccupation &&
    req.body.fatherscontactno &&
    req.body.guardiansname &&
    req.body.guardiansrelationship &&
    req.body.guardianscontactno &&
    req.body.guardiansaddress
  ) {
    var idnum = res.locals.currentid;
    var birthdate = req.body.birthdate;
    var gender = req.body.gender;
    var address = req.body.address;
    var contactno = req.body.contactno;
    var mothersname = req.body.mothersname;
    var mothersoccupation = req.body.mothersoccupation;
    var motherscontactno = req.body.motherscontactno;
    var fathersname = req.body.fathersname;
    var fathersoccupation = req.body.fathersoccupation;
    var fatherscontactno = req.body.fatherscontactno;
    var guardiansname = req.body.guardiansname;
    var guardiansrelationship = req.body.guardiansrelationship;
    var guardianscontactno = req.body.guardianscontactno;
    var guardiansaddress = req.body.guardiansaddress;
    var status = "notapproved";

    var values = [
      [
        idnum,
        birthdate,
        gender,
        address,
        contactno,
        mothersname,
        mothersoccupation,
        motherscontactno,
        fathersname,
        fathersoccupation,
        fatherscontactno,
        guardiansname,
        guardiansrelationship,
        guardianscontactno,
        guardiansaddress,
        status,
      ],
    ];
    let sql =
      "REPLACE INTO student_personal_info (id,birthdate,gender,address," +
      "contact_no,mothers_name,mothers_occupation,mothers_contact_no,fathers_name," +
      "fathers_occupation,fathers_contact_no,guardians_name,relationship_to_guardian," +
      "guardians_contact_no,guardians_address,approval) VALUES ?";
    db.query(sql, [values], (err, results) => {
      if (err) throw err;
      console.log("Number of records inserted: " + results.affectedRows);
      next();
    });
    updatestudentstatus(res.locals.currentid, res.locals.studentstatus);
    checkreservation(res.locals.currentid);
  } else {
    getadmitfilenames(res.locals.currentid);
    deleteadmissionfiles(res.locals.currentid);
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
////////////////////////////////////////////////////////////////////////

//////////////////////////// for freshman only /////////////////////////
function freshmanvalidation(req, res, next) {
  if (res.locals.enrollmentsched == "opened") {
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
}
////////////////////////////////////////////////////////////////////////

//////////////////////////////////// newstudent admission files ////////////////////////////
router.post(
  "/uploadnewstudentadmissionfiles",
  enrollmentsched,
  freshmanvalidation,
  checkifexist,
  upload.fields([
    { name: "form137" },
    { name: "birthcertificate" },
    { name: "goodmoral" },
    { name: "recommendationform" },
    { name: "letterofguarantee" },
  ]),
  newstudentadmissionfiles,
  checkfiles,
  studentadmissioninfo,
  (req, res) => {
    console.log("Inserted new files");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// transfereestudent admission files /////////////////////////
router.post(
  "/uploadtransfereestudentadmissionfiles",
  enrollmentsched,
  freshmanvalidation,
  checkifexist,
  upload.fields([
    { name: "form137" },
    { name: "transcriptofrecords" },
    { name: "transfercredentials" },
    { name: "honorabledismissal" },
    { name: "goodmoral" },
  ]),
  transfereeadmissionfiles,
  checkfiles,
  studentadmissioninfo,
  (req, res) => {
    console.log("Inserted new files");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// foreign student info ///////////////////////////////////
router.post(
  "/uploadforeignstudentadmissionfiles",
  enrollmentsched,
  freshmanvalidation,
  checkifexist,
  upload.fields([
    { name: "form137" },
    { name: "transcriptofrecords" },
    { name: "transfercredentials" },
    { name: "honorabledismissal" },
    { name: "goodmoral" },
  ]),
  foreignadmissionfiles,
  checkfiles,
  studentadmissioninfo,
  (req, res) => {
    console.log("Inserted new files");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// checkmasterlist ////////////////////////////////////////
function checkmasterlist(req, res, next) {
  let d = new Date();
  let year = d.getFullYear();

  var studentid = res.locals.currentid;
  let sql =
    "SELECT id " +
    "FROM masterlist_tbl INNERJOIN student_info ON masterlist_tbl.id = student_info.id" +
    "WHERE masterlist_tbl.id = ? AND masterlist_tbl.approval='approved' AND masterlist_tbl.schoolyear !=? AND student_info.status='enrolled'";
  db.query(sql, [studentid, year], (err, results, fields) => {
    if (results.length > 0) {
      if (
        res.locals.enrollmentsched == "opened" &&
        res.locals.enrollbalance == "valid"
      ) {
        next();
      } else {
        res.send(JSON.stringify([{ id: "invalid" }]));
        res.end();
      }
    } else {
      res.send(JSON.stringify([{ id: "invalid" }]));
      res.end();
    }
  });
}
////////////////////////////////////////////////////////////////////////////////////////////

var oldstudentvalidation = [
  enrollmentsched,
  checkstudentifbalance,
  checkmasterlist,
];

/////////////////////////////////// old student info ///////////////////////////////////////
router.post(
  "/uploadoldstudentadmissionfiles",
  oldstudentvalidation,
  upload.fields([{ name: "gradeslip" }]),
  oldstudentadmissionfiles,
  checkoldstudentfiles,
  (req, res) => {
    updatestudentstatus(res.locals.currentid, res.locals.studentstatus);
    console.log("Inserted new files");
    res.send(JSON.stringify([{ id: "success" }]));
    res.end();
  }
);
////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
