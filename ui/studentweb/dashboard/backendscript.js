var studentname, setstudentname, enrollment, setenrollment, globaladminstaffid;

function dashboardfunc(options) {
  /////////////////////////// DASHBOARD FUNCTIONS //////////////////////////
  async function logout() {
    //////// logout function /////
    console.log("Logged out here");
    let response = await fetch("/api/studentwebbackend/authentication/logout", {
      method: "GET",
    });
    let myresult = await response.json();
    if (myresult[0].id == "success") {
      location.replace("../loginpg");
    }
    /////////////////////////////
  }

  async function displaydetails() {
    try {
      ///////////// display dashboard data from server ///////////////////////////
      let response = await fetch("/api/studentwebbackend/dashboard/dashboard", {
        method: "GET",
      });
      let myresult = await response.json();
      // you can if condition if success or not to ouput something
      if (myresult[0].id == "invalid") {
        location.replace("../loginpg");
      } else {
        studentname = myresult[0].firstname + " " + myresult[0].lastname;
        document.getElementById("studusername").innerHTML = studentname;
        document.getElementById("admissionlastname").value =
          myresult[0].lastname;
        document.getElementById("admissionfirstname").value =
          myresult[0].firstname;
      }
      displayprofileaccount("displayall");
    } catch (error) {
      dashboardfunc("displaydetails");
    }
  }
  //////////////////////////////////////////////////////////////////////////

  if (options == "logoutnow") {
    logout();
  }
  if (options == "displaydetails") {
    displaydetails();
  }
}

async function loadalldata() {
  await includeHTML();
  await dashboardfunc("displaydetails");
}
loadalldata();

// VARIABLES FOR SIDEBAR NAVIGATION
const home = document.querySelector(".homepage");
const myacc = document.querySelector(".myaccount");
const about = document.querySelector(".aboutus");
const cont = document.querySelector(".contactus");

myacc.style.display = "none";
about.style.display = "none";
cont.style.display = "none";

function homepage() {
  document.querySelector(".homepage").style.display = "block";
  document.querySelector(".myaccount").style.display = "none";
  document.querySelector(".aboutus").style.display = "none";
  document.querySelector(".contactus").style.display = "none";
}
function myaccount() {
  document.querySelector(".myaccount").style.display = "block";
  document.querySelector(".homepage").style.display = "none";
  document.querySelector(".aboutus").style.display = "none";
  document.querySelector(".contactus").style.display = "none";
}
function aboutpage() {
  document.querySelector(".aboutus").style.display = "block";
  document.querySelector(".myaccount").style.display = "none";
  document.querySelector(".homepage").style.display = "none";
  document.querySelector(".contactus").style.display = "none";
}
function contactpage() {
  document.querySelector(".contactus").style.display = "block";
  document.querySelector(".aboutus").style.display = "none";
  document.querySelector(".myaccount").style.display = "none";
  document.querySelector(".homepage").style.display = "none";
}

// DISPLAY DATE AND TIME //
setInterval(function () {
  var today = new Date();
  var month = today.getMonth() + 1;
  var day = today.getDate(); /*day yan hindi date*/
  var year = today.getFullYear();
  var hour = today.getHours();
  var hourtemp;
  if (hour > 12) {
    hourtemp = hour;
    hour = hour - 12;
  } else {
    hourtemp = hour;
  }
  var minute = today.getMinutes();
  var seconds = today.getSeconds();
  var milli = today.getMilliseconds();
  if (hourtemp >= 12) {
    seconds = seconds + " PM";
  } else {
    seconds = seconds + " AM";
  }
  var datetime =
    "DATE: " +
    month +
    "/" +
    day +
    "/" +
    year +
    " TIME: " +
    hour +
    ":" +
    minute +
    ":" +
    seconds;
  document.getElementById("time").innerHTML = datetime;
}, 1000);
