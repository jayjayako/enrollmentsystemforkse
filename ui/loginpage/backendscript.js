var timeleft = 10;
function loginfunct(options) {
  async function checkuser() {
    try {
      let response = await fetch("/api/authentication/checkuser", {
        method: "GET",
      });
      let myobj = await response.json();
      myresult = myobj[0].id;
      if (myresult == "superadmin") {
        location.replace("../superadmin/dashboard");
      }
      if (myresult == "admin") {
        location.replace("../admin/dashboard");
      }
      if (myresult == "staff") {
        location.replace("../staff/dashboard");
      }
    } catch (error) {
      alert("Opps Network Error!");
    }
  }
  var erroralertmsg =
    "<div class='status'><span class='closebtn' onclick='removeerrormsg()'>&times;</span> <strong>Access Denied!</strong> Pls try Again.</div>";
  async function login() {
    try {
      var username = document.getElementById("usernametext").value;
      var password = document.getElementById("passwordtext").value;
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      let response = await fetch("/api/authentication/login", {
        method: "POST",
        body: formData,
      });

      let myresult = await response.json();
      // you can if condition if success or not to ouput something
      if (myresult[0].id == "invalid") {
        document.getElementById("alertmsg").innerHTML = erroralertmsg;
        // document.getElementById("loginattempts").innerHTML =
        //   "Number of login Attempts(" + myresult[0].loginattempt + ")";
      } else {
        document.getElementById("alertmsg").innerHTML = "";
        if (myresult[0].id == "superadminloginsuccess") {
          loadalert("superadmin");
        }
        if (myresult[0].id == "adminloginsuccess") {
          loadalert("admin");
        }
        if (myresult[0].id == "staffloginsuccess") {
          loadalert("staff");
        }
      }

      // if (myresult[0].loginattempt == 5) {
      //   var downloadTimer = setInterval(function () {
      //     document.getElementById("username").disabled = true;
      //     document.getElementById("password").disabled = true;
      //     document.getElementById("submitbtn").disabled = true;
      //     if (timeleft <= 0) {
      //       clearInterval(downloadTimer);
      //       setTimeout(function () {
      //         document.getElementById("username").disabled = false;
      //         document.getElementById("password").disabled = false;
      //         document.getElementById("submitbtn").disabled = false;
      //         document.getElementById("loginattempts").innerHTML = "";
      //       }, 1000);
      //     }
      //     document.getElementById("loginattempts").innerHTML =
      //       "Try Again..in(" + timeleft + ")left";
      //     timeleft -= 1;
      //   }, 1000);
      // }
    } catch (error) {
      alert("Opps Network Error!");
    }
  }
  if (options == "loginnow") {
    login();
  }
  if (options == "checkuser") {
    checkuser();
  }
}

function removeerrormsg() {
  document.getElementById("alertmsg").innerHTML = "";
}

function clearfield() {
  document.getElementById("usernametext").value = "";
  document.getElementById("passwordtext").value = "";
}
