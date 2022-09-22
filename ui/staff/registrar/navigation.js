/////////////////////// modal navigations //////////////////////
function openmodalenrollmentsched() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("enrollmentsched").style.display = "block";
  document.getElementById("editenrolleerecords").style.display = "none";
  document.getElementById("enrollmentreserve").style.display = "none";
  document.getElementById("schoollevel").style.display = "none";
  document.getElementById("yearlevel").style.display = "none";
  document.getElementById("section").style.display = "none";
  document.getElementById("schoolschedule").style.display = "none";
  document.getElementById("studentmaxnumber").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  setTimeout(loadalldropdown, 200);
}

function openmodaleditenrolleerecords() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("editenrolleerecords").style.display = "block";
  document.getElementById("enrollmentsched").style.display = "none";
  document.getElementById("enrollmentreserve").style.display = "none";
  document.getElementById("schoollevel").style.display = "none";
  document.getElementById("yearlevel").style.display = "none";
  document.getElementById("section").style.display = "none";
  document.getElementById("schoolschedule").style.display = "none";
  document.getElementById("studentmaxnumber").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  document.getElementById("firstclick").click();
}

function openmodalenrollreserve() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("enrollmentreserve").style.display = "block";
  document.getElementById("enrollmentsched").style.display = "none";
  document.getElementById("editenrolleerecords").style.display = "none";
  document.getElementById("schoollevel").style.display = "none";
  document.getElementById("yearlevel").style.display = "none";
  document.getElementById("section").style.display = "none";
  document.getElementById("schoolschedule").style.display = "none";
  document.getElementById("studentmaxnumber").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  setTimeout(enrollmentreservationfunction, 200, "loadtable");
}

function openmodalschoollevel() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("schoollevel").style.display = "block";
  document.getElementById("enrollmentsched").style.display = "none";
  document.getElementById("editenrolleerecords").style.display = "none";
  document.getElementById("enrollmentreserve").style.display = "none";
  document.getElementById("yearlevel").style.display = "none";
  document.getElementById("section").style.display = "none";
  document.getElementById("schoolschedule").style.display = "none";
  document.getElementById("studentmaxnumber").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  setTimeout(loadalldropdownschoollevel, 200);
}

function openmodalyearlevel() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("yearlevel").style.display = "block";
  document.getElementById("enrollmentsched").style.display = "none";
  document.getElementById("editenrolleerecords").style.display = "none";
  document.getElementById("enrollmentreserve").style.display = "none";
  document.getElementById("schoollevel").style.display = "none";
  document.getElementById("section").style.display = "none";
  document.getElementById("schoolschedule").style.display = "none";
  document.getElementById("studentmaxnumber").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  setTimeout(loadalldropdownyearlevel, 200);
}

function openmodalsection() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("section").style.display = "block";
  document.getElementById("enrollmentsched").style.display = "none";
  document.getElementById("editenrolleerecords").style.display = "none";
  document.getElementById("enrollmentreserve").style.display = "none";
  document.getElementById("schoollevel").style.display = "none";
  document.getElementById("yearlevel").style.display = "none";
  document.getElementById("schoolschedule").style.display = "none";
  document.getElementById("studentmaxnumber").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  setTimeout(loadalldropdownsection, 200);
}

function openmodalschoolschedule() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("schoolschedule").style.display = "block";
  document.getElementById("enrollmentsched").style.display = "none";
  document.getElementById("editenrolleerecords").style.display = "none";
  document.getElementById("enrollmentreserve").style.display = "none";
  document.getElementById("schoollevel").style.display = "none";
  document.getElementById("yearlevel").style.display = "none";
  document.getElementById("section").style.display = "none";
  document.getElementById("studentmaxnumber").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
}
function openmodalstudentmaxnumber() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("studentmaxnumber").style.display = "block";
  document.getElementById("enrollmentsched").style.display = "none";
  document.getElementById("editenrolleerecords").style.display = "none";
  document.getElementById("enrollmentreserve").style.display = "none";
  document.getElementById("schoollevel").style.display = "none";
  document.getElementById("yearlevel").style.display = "none";
  document.getElementById("section").style.display = "none";
  document.getElementById("schoolschedule").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  setTimeout(displaystudentmaxnum, 200);
}
function openmodalnotifications() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("notificationsid").style.display = "block";
  document.getElementById("enrollmentsched").style.display = "none";
  document.getElementById("editenrolleerecords").style.display = "none";
  document.getElementById("enrollmentreserve").style.display = "none";
  document.getElementById("schoollevel").style.display = "none";
  document.getElementById("yearlevel").style.display = "none";
  document.getElementById("section").style.display = "none";
  document.getElementById("schoolschedule").style.display = "none";
  document.getElementById("studentmaxnumber").style.display = "none";
}
//////////////////////////// modal 2 ///////////////////////////
function openmodal2studentpersonalinfo() {
  var modal = document.getElementById("myModal2");
  modal.style.display = "block";
  document.getElementById("stdntpersonalinfo").style.display = "block";
  document.getElementById("viewmsg").style.display = "none";
  document.getElementById("sendmsg").style.display = "none";
  document.getElementById("viewadmitfile").style.display = "none";
}
function openmodal2viewmessage() {
  var modal = document.getElementById("myModal2");
  modal.style.display = "block";
  document.getElementById("viewmsg").style.display = "block";
  document.getElementById("stdntpersonalinfo").style.display = "none";
  document.getElementById("sendmsg").style.display = "none";
  document.getElementById("viewadmitfile").style.display = "none";
}
function openmodal2sendmessage() {
  var modal = document.getElementById("myModal2");
  modal.style.display = "block";
  document.getElementById("sendmsg").style.display = "block";
  document.getElementById("stdntpersonalinfo").style.display = "none";
  document.getElementById("viewmsg").style.display = "none";
  document.getElementById("viewadmitfile").style.display = "none";
}
function openmodal2viewadmitfile() {
  var modal = document.getElementById("myModal2");
  modal.style.display = "block";
  document.getElementById("viewadmitfile").style.display = "block";
  document.getElementById("stdntpersonalinfo").style.display = "none";
  document.getElementById("viewmsg").style.display = "none";
  document.getElementById("sendmsg").style.display = "none";
  viewstudentadmissionfiles();
}
////////////////////////////////////////////////////////////////

// When the user clicks on <span> (x), close the modal
function closefirstmodal() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "none";
}
function closesecondmodal() {
  var modal = document.getElementById("myModal2");
  modal.style.display = "none";
}
////////////////////////////////////////////////////////////////

async function loadalldata() {
  await includeHTML();
  setTimeout(registrarfunc, 200, "checkuser");
}
loadalldata();

function gotohome() {
  location.replace("../dashboard");
}
function gotoaccounting() {
  if (globalvarposition == "Accounting") {
    location.replace("../accounting");
  }
}
function gotocashier() {
  if (globalvarposition == "Cashier") {
    location.replace("../cashier");
  }
}
function gotoadmindept() {
  if (globalvarposition == "Admin Department") {
    location.replace("../admin_department");
  }
}

function gotoprofile() {
  location.replace("../account_profile");
}
