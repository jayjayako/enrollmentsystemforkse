async function loadalldata() {
  await includeHTML();
}
loadalldata();

var erroralertmsg =
  "<div class='status'><span class='closebtn' onclick='removeerrormsg()'>&times;</span> <strong>Access Denied!</strong> Pls try Again.</div>";
function change_passwordpage(options) {
  async function updatepassword() {
    let response = await fetch("/api/resetpassword/updatepassword", {
      method: "POST",
      body: new FormData(loginform),
    });

    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id == "invalid") {
      document.getElementById("alertmsg").innerHTML = erroralertmsg;
      alert(myresult[0].error);
    } else {
      document.getElementById("alertmsg").innerHTML = "";
      location.replace("../success_passwordchangepage");
    }
  }
  if (options == "updatepassword") {
    updatepassword();
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
  location.replace("../check_youremail");
}
