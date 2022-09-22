/// NOTE PLS BE GENERIC ON ERRORS NOT invalid password etc..
function loginfunction(options) {
  async function loginnow() {
    //////// login function /////
    var username = document.getElementById("usernametext").value;
    var password = document.getElementById("passwordtext").value;
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    if (username == "" || password == "") {
      alert("Please input your Username and Password!");
      return false;
    } else {
      let response = await fetch(
        "/api/studentwebbackend/authentication/login",
        {
          method: "POST",
          body: formData,
        }
      );
      let myresult = await response.json();
      if (myresult[0].id == "success") {
        location.replace("../dashboard");
      } else {
        alert("Invalid");
      }
    }

    /////////////////////////////
  }

  async function checkifloggedin() {
    //////// check id loggin function /////
    let response = await fetch("/api/studentwebbackend/dashboard/dashboard", {
      method: "GET",
    });
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      location.replace("../dashboard");
    }
    /////////////////////////////
  }

  if (options == "loginnow") {
    loginnow();
  }

  if (options == "checkifloggedin") {
    checkifloggedin();
  }
}

async function loadalldata() {
  await includeHTML();
  await loginfunction("checkifloggedin");
}
loadalldata();
