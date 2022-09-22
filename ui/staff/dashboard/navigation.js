async function loadalldata() {
  await includeHTML();
  setTimeout(dashboardfunct, 200, "checkuser");
}
loadalldata();

function gotoregistrar() {
  if (globalvarposition == "Registrar") {
    location.replace("../registrar");
  }
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
