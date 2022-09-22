async function loadalldata() {
  await includeHTML();
  setTimeout(preload, 300);
  setTimeout(admindepartmentfunc, 200, "checkuser");
}
loadalldata();

function gotohome() {
  location.replace("../dashboard");
}
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
    admindepartmentfunc("displayschoollevel");
  }
  if (tabname == "tab2") {
    admindepartmentfunc("displayschoollevelenrolled");
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
  document.getElementById("stdntpersonalinfo").style.display = "none";
}

function openmodalstudentpersonalinfo() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("stdntpersonalinfo").style.display = "block";
  document.getElementById("notificationsid").style.display = "none";
}

function closefirstmodal() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
}
