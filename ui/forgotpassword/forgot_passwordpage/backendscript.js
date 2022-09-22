async function loadalldata() {
  await includeHTML();
}
loadalldata();

var erroralertmsg =
  "<div class='status'><span class='closebtn' onclick='removeerrormsg()'>&times;</span> <strong>Invalid!</strong> Pls try Again.</div>";
function forgot_passwordpage(options) {
  async function sendemail() {
    var email = document.getElementById("emailtext").value;
    let formData = new FormData();
    formData.append("email", email);
    let response = await fetch("/api/resetpassword/resetaccount", {
      method: "POST",
      body: formData,
    });

    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id == "invalid") {
      document.getElementById("alertmsg").innerHTML = erroralertmsg;
    } else {
      var myemail = document.getElementById("emailtext").value;
      document.getElementById("alertmsg").innerHTML = "";
      document.cookie =
        "email=" + myemail + "; SameSite=lax; secure=true; path=/";
      location.replace("../check_youremail");
    }
  }
  if (options == "sendemail") {
    sendemail();
  }
}

function removeerrormsg() {
  document.getElementById("alertmsg").innerHTML = "";
}
function clearfield() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}
function gotopage() {
  location.replace("../../staff/loginpage");
}

function back() {
  location.replace("../../loginpage");
}
