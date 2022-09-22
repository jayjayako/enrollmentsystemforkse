async function loadalldata() {
  await includeHTML();
  setTimeout(viewreportfunct, 200, "checkuser");
  setTimeout(preload, 300);
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
    viewreportfunct("viewstaffposition");
  }
  if (tabname == "tab2") {
    viewreportfunct("getschoollevel");
  }
  if (tabname == "tab3") {
    viewreportfunct("viewstudentpayments");
  }
  if (tabname == "tab4") {
    viewreportfunct("getactivitylogstaffposition");
  }
  if (tabname == "tab5") {
    viewreportfunct("getloghistorystaffposition");
  }
}
/////////////////////////////////////
function preload() {
  document.getElementById("firstclick").click();
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
