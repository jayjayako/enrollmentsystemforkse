async function loadalldata() {
  await includeHTML();
}
loadalldata();

var erroralertmsg =
  "<div class='status'><span class='closebtn' onclick='removeerrormsg()'>&times;</span> <strong>Invalid!</strong> Pls try Again.</div>";
function check_youremail(options) {
  async function sendotpcode() {
    var myCookies = getCookies();
    var myemail = myCookies.email;
    var otpcode = document.getElementById("otpcode").value;
    let formData = new FormData();
    formData.append("otpcode", otpcode);
    let response = await fetch(
      "/api/resetpassword/checksentcode?email=" + myemail,
      {
        method: "POST",
        body: formData,
      }
    );

    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id == "invalid") {
      document.getElementById("alertmsg").innerHTML = erroralertmsg;
    } else {
      document.getElementById("alertmsg").innerHTML = "";
      location.replace("../change_passwordpage");
    }
  }

  async function resendemail() {
    var myCookies = getCookies();
    var myemail = myCookies.email;

    let formData = new FormData();
    formData.append("email", myemail);

    let response = await fetch("/api/resetpassword/resetaccount", {
      method: "POST",
      body: formData,
    });
    let myresult = await response.json();
    if (myresult[0].id == "invalid") {
      document.getElementById("alertmsg").innerHTML = erroralertmsg;
    } else {
      document.getElementById("alertmsg").innerHTML = "";
      document.cookie =
        "email=" + myemail + "; SameSite=lax; secure=true; path=/";
      location.replace("../check_youremail");
    }
  }
  if (options == "sendotpcode") {
    sendotpcode();
  }
  if (options == "resendemail") {
    resendemail();
  }
}

function removeerrormsg() {
  document.getElementById("alertmsg").innerHTML = "";
}
function clearfield() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function back() {
  location.replace("../forgot_passwordpage");
}

setTimeout(function () {
  var timeleft = 10;
  var downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
    }
    document.getElementById("counter").innerHTML = "RESEND(" + timeleft + ")";
    timeleft -= 1;
  }, 1000);
}, 10000);
