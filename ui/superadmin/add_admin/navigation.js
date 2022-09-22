// function openmodal() {
//   var modal = document.getElementById("myModal1");
//   modal.style.display = "block";
//   document.getElementById("modalnameid").style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// function closefirstmodal() {
//   var modal = document.getElementById("myModal1");
//   modal.style.display = "none";
// }

async function loadalldata() {
  await includeHTML();
  setTimeout(addadminfunc, 200, "checkuser");
}
loadalldata();

function gotohome() {
  location.replace("../dashboard");
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
