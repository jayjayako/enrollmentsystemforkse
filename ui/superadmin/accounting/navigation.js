/////////////////////// accounting modals ////////////////////
function openmodalotherfees() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("otherfees").style.display = "block";
  document.getElementById("paymentplan").style.display = "none";
  document.getElementById("paymentplanamount").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  setTimeout(otherfeesfunc, 200, "loadalldropdownyearlevel");
}

function openmodalpaymentplans() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("paymentplan").style.display = "block";
  document.getElementById("paymentplanamount").style.display = "none";
  document.getElementById("otherfees").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  setTimeout(paymentplans, 200, "displayalldropdown");
}

function openmodalpaymentplanamount() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("paymentplanamount").style.display = "block";
  document.getElementById("otherfees").style.display = "none";
  document.getElementById("paymentplan").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  setTimeout(paymentplanamount, 200, "loadschoollevel");
}

function openmodalnotifications() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("notificationsid").style.display = "block";
  document.getElementById("otherfees").style.display = "none";
  document.getElementById("paymentplan").style.display = "none";
  document.getElementById("paymentplanamount").style.display = "none";
}

// When the user clicks on <span> (x), close the modal
function closefirstmodal() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "none";
}
///////////////////////////////////////////////////////////////
async function loadalldata() {
  await includeHTML();
  setTimeout(accountingfunc, 200, "checkuser");
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
function gotomanagestudent() {
  location.replace("../managestudent");
}
function gotomanageuseraccess() {
  location.replace("../manageuseraccess");
}
function gotoregistrar() {
  location.replace("../registrar");
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
