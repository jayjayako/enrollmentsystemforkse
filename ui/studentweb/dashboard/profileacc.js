function displayprofileaccount(options) {
  async function displayallaccount() {
    try {
      ///////////// display dashboard data from server ///////////////////////////
      let response = await fetch(
        "/api/studentwebbackend/accountprofile/displayprofile",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      // you can if condition if success or not to ouput something
      if (myresult[0].id == "invalid") {
        location.replace("../loginpg");
      } else {
        var studentname = myresult[0].firstname + " " + myresult[0].lastname;
        document.getElementById("myprofileaccountwholename").innerHTML =
          studentname;
        document.getElementById("myprofileaccountlastname").innerHTML =
          myresult[0].lastname;
        document.getElementById("myprofileaccountfirstname").innerHTML =
          myresult[0].firstname;
        document.getElementById("myprofileaccountemail").innerHTML =
          myresult[0].email;
        document.getElementById("myprofileaccountpicture").src =
          "/api/studentwebbackend/myfiles/" + myresult[0].picture;
        /////////////////// for edit account ///////////////////
        document.getElementById("lastnametextinput").value =
          myresult[0].lastname;
        document.getElementById("firstnametextinput").value =
          myresult[0].firstname;
        document.getElementById("emailtextinput").value = myresult[0].email;
        document.getElementById("usernametextinput").value =
          myresult[0].username;
        document.getElementById("passwordtextinput").value =
          myresult[0].password;
        ////////////////////////////////////////////////////////
      }
    } catch (error) {
      alert("network error");
    }
  }

  async function updateprofileaccount() {
    try {
      ////////////////////// sends inquiry message //////////////////////
      var lastname = document.getElementById("lastnametextinput").value;
      var firstname = document.getElementById("firstnametextinput").value;
      var email = document.getElementById("emailtextinput").value;
      var username = document.getElementById("usernametextinput").value;
      var password = document.getElementById("passwordtextinput").value;
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("lastname", lastname);
      formData.append("firstname", firstname);
      formData.append("email", email);
      formData.append("profilepic", picture.files[0]);
      let response = await fetch(
        "/api/studentwebbackend/accountprofile/editmyprofile",
        {
          method: "POST",
          body: formData,
        }
      );
      let myresult = await response.json();
      // you can if condition if success or not to ouput something
      if (myresult[0].id == "invalid") {
        alert("Invalid");
      } else {
        alert("Succesfully sent");
        dashboardfunc("displaydetails");
        // sendrealtimemessage("reloadenrollmentreservation");
      }
    } catch (error) {
      alert("Network error pls try again");
    }
  }

  if (options == "displayall") {
    displayallaccount();
  }
  if (options == "updateaccount") {
    updateprofileaccount();
  }
}

var loadFile = function (event) {
  var output = document.getElementById("myimage");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
};

function uploadprofilepicture() {
  document.getElementById("picture").click();
}
