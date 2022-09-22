async function loadalldata() {
  await includeHTML();
  setTimeout(audittrailfunc, 200, "checkuser");
  setTimeout(preload, 300);
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

//////////// tab navigation /////////
function tabfunction(evt, tabname) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabname).style.display = "block";
  evt.currentTarget.className += " active";
  if (tabname == "tab1") {
    audittrailfunc("displaysuperadminactivitylog");
  }
  if (tabname == "tab2") {
    audittrailfunc("displaysuperadminloghistory");
  }
}
/////////////////////////////////////
function preload() {
  document.getElementById("firstclick").click();
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
