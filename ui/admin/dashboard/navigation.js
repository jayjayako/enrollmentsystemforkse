async function loadalldata() {
  await includeHTML();
  setTimeout(dashboardfunct, 200, "checkuser");
}
loadalldata();

function gotoaddnewstaff() {
  if (addnewstaffglobalvar != "invalid") {
    location.replace("../addnewstaff");
  }
}
function gotomanagestaff() {
  if (managestaffglobalvar != "invalid") {
    location.replace("../managestaff");
  }
}
function gotomanagestudent() {
  if (managestudentglobalvar != "invalid") {
    location.replace("../managestudent");
  }
}
function gotoaudittrail() {
  if (audittrailglobalvar != "invalid") {
    location.replace("../audittrail");
  }
}
function gotoviewreport() {
  if (viewreportglobalvar != "invalid") {
    location.replace("../viewreport");
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
