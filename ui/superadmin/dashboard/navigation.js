async function loadalldata() {
  await includeHTML();
  setTimeout(dashboardfunct, 200, "checkuser");
}
loadalldata();

function gotoaddadmin() {
  location.replace("../add_admin");
}
function gotoaddstaff() {
  location.replace("../add_staff");
}
function gotoaudittrail() {
  location.replace("../audittrail");
}
function gotomanagestudent() {
  location.replace("../managestudent");
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

function openmodalnotifications() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("notificationsid").style.display = "block";
}

function closefirstmodal() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
}
