function register(options) {
  async function registerfunct() {
    //////// register function /////
    console.log("Registered!");
    var lastname = document.getElementById("lname").value;
    var firstname = document.getElementById("fname").value;
    var username = document.getElementById("uname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pword").value;
    var conpassword = document.getElementById("conpword").value;

    let formData = new FormData();
    formData.append("lastname", lastname);
    formData.append("firstname", firstname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmpassword", conpassword);
    if (
      lastname == "" ||
      firstname == "" ||
      username == "" ||
      email == "" ||
      password == "" ||
      conpassword == ""
    ) {
      alert("Please complete all text fields!");
      return false;
    } else if (password != conpassword) {
      alert("Password did not match: Please try again");
      return false;
    } else {
      let response = await fetch("/api/studentwebbackend/signup/register", {
        method: "POST",
        body: formData,
      });
      let myresult = await response.json();
      if (myresult[0].id == "success") {
        location.replace("../loginpg");
      }
    }

    /////////////////////////////
  }

  if (options == "registernow") {
    registerfunct();
  }
}

async function loadalldata() {
  includeHTML();
}
loadalldata();
