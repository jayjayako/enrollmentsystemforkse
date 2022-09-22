async function loadalldata() {
  await includeHTML();
  setTimeout(addstafffunc, 200, "checkuser");
}
loadalldata();

function gotohome() {
  location.replace("../dashboard");
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
