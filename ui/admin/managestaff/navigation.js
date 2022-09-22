async function loadalldata() {
  await includeHTML();
  setTimeout(managestafffunct, 200, "checkuser");
}
loadalldata();

function gotohome() {
  location.replace("../dashboard");
}
function gotoaddnewstaff() {
  if (addnewstaffglobalvar != "invalid") {
    location.replace("../addnewstaff");
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

function openmodaleditaccess() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("editstaffaccess").style.display = "block";
  document.getElementById("notificationsid").style.display = "none";
}

function openmodalnotifications() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("notificationsid").style.display = "block";
  document.getElementById("editstaffaccess").style.display = "none";
}

// When the user clicks on <span> (x), close the modal
function closefirstmodal() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "none";
}
