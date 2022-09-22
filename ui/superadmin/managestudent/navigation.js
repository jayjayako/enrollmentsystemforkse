async function loadalldata() {
  await includeHTML();
  setTimeout(managestudentfunc, 200, "checkuser");
}
loadalldata();

function gotohome() {
  location.replace("../dashboard");
}
function gotoaddadmin() {
  location.replace("../add_admin");
}
function gotoaddstaff() {
  location.replace("../add_staff");
}
function gotoaudittrail() {
  location.replace("../audittrail");
}
function gotomanageuseraccess() {
  location.replace("../manageuseraccess");
}
function gotoregistrar() {
  location.replace("../registrar");
}
function gotoaccounting() {
  location.replace("../accounting");
}
function gotocashier() {
  location.replace("../cashier");
}
function gotoadmindept() {
  location.replace("../admin_department");
}
function gotoreports() {
  location.replace("../viewreport");
}

function gotoprofile() {
  location.replace("../account_profile");
}

function openmodalstudentpersonalinfo() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("stdntpersonalinfo").style.display = "block";
  document.getElementById("restorenowid").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
}

function openmodalrestorenowid() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("restorenowid").style.display = "block";
  document.getElementById("stdntpersonalinfo").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  managestudentfunc("displaydeactivatedstudent");
}

function openmodalnotifications() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("notificationsid").style.display = "block";
  document.getElementById("stdntpersonalinfo").style.display = "none";
  document.getElementById("restorenowid").style.display = "none";
}

function closefirstmodal() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "none";
}
