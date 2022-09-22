async function loadalldata() {
  await includeHTML();
  setTimeout(managestudentfunct, 200, "checkuser");
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
function gotomanagestaff() {
  if (managestaffglobalvar != "invalid") {
    location.replace("../managestaff");
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
  managestudentfunct("displaydeactivatedstudent");
  document.getElementById("notificationsid").style.display = "none";
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
