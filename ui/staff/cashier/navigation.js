////////////////////// for payment only ///////////////////
var allpaymentglobalvar;
function checkpayment(param) {
  if (param == "verifypayment") {
    verifypaymentfunc("approve");
  }
  if (param == "viewstudentbalance") {
    viewstudentbalancefunc("approve");
  }
}
///////////////////////////////////////////////////////////

/////////////////////////// modal 1 ///////////////////////
function verifypayment() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("verifypayment").style.display = "block";
  document.getElementById("editpaymentmethod").style.display = "none";
  document.getElementById("viewstudentbalance").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  setTimeout(verifypaymentfunc, 200, "displayschoollevel");
  allpaymentglobalvar = "verifypayment";
}

function editpaymentmethod() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("editpaymentmethod").style.display = "block";
  document.getElementById("verifypayment").style.display = "none";
  document.getElementById("viewstudentbalance").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  setTimeout(editpaymentmethodfunc, 200, "displaydropdown");
}

function viewstudentbalance() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("viewstudentbalance").style.display = "block";
  document.getElementById("verifypayment").style.display = "none";
  document.getElementById("editpaymentmethod").style.display = "none";
  document.getElementById("notificationsid").style.display = "none";
  setTimeout(viewstudentbalancefunc, 200, "displayschoollevel");
  allpaymentglobalvar = "viewstudentbalance";
}
function openmodalnotifications() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("notificationsid").style.display = "block";
  document.getElementById("verifypayment").style.display = "none";
  document.getElementById("editpaymentmethod").style.display = "none";
  document.getElementById("viewstudentbalance").style.display = "none";
}
/////////////////////////// modal 2 /////////////////////////
function openmodal2payment() {
  var modal = document.getElementById("myModal2");
  modal.style.display = "block";
  document.getElementById("studentpayinfo").style.display = "block";
  document.getElementById("sendmsg").style.display = "none";
}
function openmodal2sendmessage() {
  var modal = document.getElementById("myModal2");
  modal.style.display = "block";
  document.getElementById("sendmsg").style.display = "block";
  document.getElementById("studentpayinfo").style.display = "none";
}
/////////////////////////////////////////////////////////////

/////////////////////////// modal 3 /////////////////////////
function openmodal3paymentfile() {
  var modal = document.getElementById("myModal3");
  modal.style.display = "block";
  document.getElementById("viewpaymentfile").style.display = "block";
}
/////////////////////////////////////////////////////////////

// When the user clicks on <span> (x), close the modal
function closefirstmodal() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "none";
}

function closesecondmodal() {
  var modal = document.getElementById("myModal2");
  modal.style.display = "none";
}

function closethirdmodal() {
  var modal = document.getElementById("myModal3");
  modal.style.display = "none";
}
//////////////////////////////////////////////////////////

async function loadalldata() {
  await includeHTML();
  setTimeout(cashierfunct, 200, "checkuser");
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
function gotoadmindept() {
  if (globalvarposition == "Admin Department") {
    location.replace("../admin_department");
  }
}

function gotoprofile() {
  location.replace("../account_profile");
}
