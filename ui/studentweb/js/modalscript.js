// const mdlload = document.querySelector('#modalload');
// window.onload = function mdlload(){

// }
// Get the modal

var modal_nstud = document.getElementById("new-stud-mdl"); //ENROLL NOW
var modal_ostud = document.getElementById("old-stud-mdl");
var modal_tstud = document.getElementById("trans-stud-mdl");
var modal_fstud = document.getElementById("for-stud-mdl");

var modal_submit = document.getElementById("submit-mdl");

// Get the button that opens the modal
var btn_inq = document.getElementById("inquire-mdl-open");
var btn_enr = document.getElementById("enr-mdl-open");
var btn_msg = document.getElementById("msg-mdl-open");
var btn_upd = document.getElementById("upd-mdl-open");
var btn_acc = document.getElementById("acc-mdl-open");

var btn_nstud = document.getElementById("newstud"); //ENROLL NOW
var btn_ostud = document.getElementById("oldstud");
var btn_tstud = document.getElementById("trastud");
var btn_fstud = document.getElementById("forstud");

var btn_new_submit = document.getElementById("new-submit-open"); //SUBMIT
var btn_old_submit = document.getElementById("old-submit-open"); //SUBMIT
var btn_tra_submit = document.getElementById("tra-submit-open"); //SUBMIT
var btn_for_submit = document.getElementById("for-submit-open"); //SUBMIT

// Get the <span> element that closes the modal
var span_inq = document.getElementById("inq-close-mdl");
var span_enr = document.getElementById("enr-close-mdl");
var span_msg = document.getElementById("msg-close-mdl");
var span_upd = document.getElementById("upd-close-mdl");
var span_acc = document.getElementById("acc-close-mdl");

var span_nstud = document.getElementById("newstud-close-mdl");
var span_ostud = document.getElementById("oldstud-close-mdl");
var span_tstud = document.getElementById("trastud-close-mdl");
var span_fstud = document.getElementById("forstud-close-mdl");

var span_submit = document.getElementById("submit-done"); //SUBMIT

// When the user clicks the button, open the modal
// btn_inq.onclick = function() {
//   modal_inq.style.display = "block";
// }

//// I N Q U I R E M O D A L ////

// OPEN BUTTON FOR INQUIRE MODAL
function btninquire() {
  var modal_inq = document.getElementById("inq-mdl");
  modal_inq.style.display = "block";
}
// CLOSE BUTTON FOR INQUIRE MODAL
function closeinq() {
  var modal_inq = document.getElementById("inq-mdl");
  modal_inq.style.display = "none";
}

//// E N R O L L M O D A L ////

// OPEN BUTTON FOR ENROLL MODAL
function btnenroll() {
  async function checkenrollment() {
    let response = await fetch(
      "/api/studentwebbackend/dashboard/enrollmentsched",
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].enrollstat == "invalid") {
      alert("Invalid");
    } else {
      var modal_enr = document.getElementById("enr-mdl");
      modal_enr.style.display = "block";
    }
  }
  checkenrollment();
}

// CLOSE BUTTON FOR ENROLL MODAL
function closeenroll() {
  var modal_enr = document.getElementById("enr-mdl");
  modal_enr.style.display = "none";
}

//// M E S S A G E & N O T I F I C A T I O N S ////

// OPEN BUTTON FOR MSG AND NOTIF
function btnmsg() {
  var modal_msg = document.getElementById("msg-mdl");
  modal_msg.style.display = "block";
  getmessagenotif("getalldata");
}

// CLOSE BUTTON FOR MSG AND NOTIF
function closemsg() {
  var modal_msg = document.getElementById("msg-mdl");
  modal_msg.style.display = "none";
}

//// U P D A T E R E Q U I R E M E N T S ////

// OPEN BUTTON FOR UPDATE REQUIREMENTS
function btnupd() {
  var modal_upd = document.getElementById("upd-mdl");
  modal_upd.style.display = "block";
}

// CLOSE BUTTON FOR UPDATE REQUIREMENTS
function closeupd() {
  var modal_upd = document.getElementById("upd-mdl");
  modal_upd.style.display = "none";
}

//// A C C O U N T B A L A N C E ////

// OPEN BUTTON FOR ACCOUNT BALANCE MODAL
function btnacc() {
  var modal_acc = document.getElementById("acc-mdl");
  modal_acc.style.display = "block";
  accountbalancefunction("displayalldata");
}

// CLOSE BUTTON FOR ACCOUNT BALANCE MODAL
function closeacc() {
  var modal_acc = document.getElementById("acc-mdl");
  modal_acc.style.display = "none";
}

////

// btn_nstud.onclick = function() {
//   modal_nstud.style.display = "block";
//   modal_enr.style.display = "none";
// }
// btn_ostud.onclick = function() {
//   modal_ostud.style.display = "block";
//   modal_enr.style.display = "none";
// }
// btn_tstud.onclick = function() {
//   modal_tstud.style.display = "block";
//   modal_enr.style.display = "none";
// }
// btn_fstud.onclick = function() {
//   modal_fstud.style.display = "block";
//   modal_enr.style.display = "none";
// }

// btn_new_submit.onclick = function() {
//   modal_submit.style.display = "block";
//   modal_nstud.style.display = "none";
// }
// btn_old_submit.onclick = function() {
//   modal_submit.style.display = "block";
//   modal_ostud.style.display = "none";
// }
// btn_tra_submit.onclick = function() {
//   modal_submit.style.display = "block";
//   modal_tstud.style.display = "none";
// }
// btn_for_submit.onclick = function() {
//   modal_submit.style.display = "block";
//   modal_fstud.style.display = "none";
// }

// // When the user clicks on <span> (x), close the modal
// span_inq.onclick = function() {
//   modal_inq.style.display = "none";
// }
// span_enr.onclick = function() {
//   modal_enr.style.display = "none";
// }
// span_msg.onclick = function() {
//   modal_msg.style.display = "none";
// }
// span_upd.onclick = function() {
//   modal_upd.style.display = "none";
// }
// span_acc.onclick = function() {
//   modal_acc.style.display = "none";
// }

// span_nstud.onclick = function() {
//   modal_nstud.style.display = "none";
// }
// span_ostud.onclick = function() {
//   modal_ostud.style.display = "none";
// }
// span_tstud.onclick = function() {
//   modal_tstud.style.display = "none";
// }
// span_fstud.onclick = function() {
//   modal_fstud.style.display = "none";
// }

// span_submit.onclick = function() {
//   modal_submit.style.display = "none";
// }

// window.onclick = function(event) {
//   // When the user clicks anywhere outside of the modal, close it
//   alert('HELLO WORLD');
//   if (event.target == modal_inq) {
//     modal_inq.style.display = "none";
//   }
//   if (event.target == modal_enr) {
//     modal_enr.style.display = "none";
//   }
//   if (event.target == modal_msg) {
//     modal_msg.style.display = "none";
//   }
//   if (event.target == modal_upd) {
//     modal_upd.style.display = "none";
//   }
//   if (event.target == modal_acc) {
//     modal_acc.style.display = "none";
//   }

//   // ENROLL NOW
//   if (event.target == modal_nstud) {
//     modal_nstud.style.display = "none";
//   }
//   if (event.target == modal_ostud) {
//     modal_ostud.style.display = "none";
//   }
//   if (event.target == modal_tstud) {
//     modal_tstud.style.display = "none";
//   }
//   if (event.target == modal_fstud) {
//     modal_fstud.style.display = "none";
//   }
// }

// E D I T P R O F I L E

// OPEN BUTTON FOR EDIT PROFILE MODAL
function editprof() {
  var edit = document.getElementById("editprof-mdl");
  edit.style.display = "block";
}

// CLOSE BUTTON FOR EDIT PROFILE MODAL
function closeedit() {
  var edit = document.getElementById("editprof-mdl");
  edit.style.display = "none";
}

// E N R O L L N O W -- M O D A L
const newstud = document.querySelector("#new-stud-mdl");
const oldstud = document.querySelector("#old-stud-mdl");
const transtud = document.querySelector("#trans-stud-mdl");
const forstud = document.querySelector("#for-stud-mdl");

// OPEN BUTTON FOR NEW STUDENT MODAL
function newstudmdl() {
  const newstud = document.querySelector("#new-stud-mdl");
  var modal_enr = document.getElementById("enr-mdl");

  newstud.style.display = "block";
  modal_enr.style.display = "none";
}
// CLOSE BUTTON FOR NEW STUDENT MODAL
function close_newstudmdl() {
  const newstud = document.querySelector("#new-stud-mdl");

  newstud.style.display = "none";
}

// OPEN BUTTON FOR OLD STUDENT MODAL
function oldstudmdl() {
  const oldstud = document.querySelector("#old-stud-mdl");
  var modal_enr = document.getElementById("enr-mdl");

  oldstud.style.display = "block";
  modal_enr.style.display = "none";
}
// CLOSE BUTTON FOR OLD STUDENT MODAL
function close_oldstudmdl() {
  const oldstud = document.querySelector("#old-stud-mdl");

  oldstud.style.display = "none";
}

// OPEN BUTTON FOR TRANSFEREE STUDENT MODAL
function transtudmdl() {
  const transtud = document.querySelector("#trans-stud-mdl");
  var modal_enr = document.getElementById("enr-mdl");

  transtud.style.display = "block";
  modal_enr.style.display = "none";
}
// CLOSE BUTTON FOR TRANSFEREE STUDENT MODAL
function close_transtudmdl() {
  const transtud = document.querySelector("#trans-stud-mdl");

  transtud.style.display = "none";
}

// OPEN BUTTON FOR FOREIGN STUDENT MODAL
function forstudmdl() {
  const forstud = document.querySelector("#for-stud-mdl");
  var modal_enr = document.getElementById("enr-mdl");

  forstud.style.display = "block";
  modal_enr.style.display = "none";
}
// CLOSE BUTTON FOR NEW STUDENT MODAL
function close_forstudmdl() {
  const forstud = document.querySelector("#for-stud-mdl");

  forstud.style.display = "none";
}

// F I L L U P R E Q U I R E M E N T S //
const fillupreq = document.querySelector("#fillreq");

// OPEN FILL UP FORM
function fillup() {
  const fillupreq = document.querySelector("#fillreq");
  fillupreq.style.display = "block";
}

//CLOSE FILL UP FORM
function close_fillup() {
  const fillupreq = document.querySelector("#fillreq");
  fillupreq.style.display = "none";
}
