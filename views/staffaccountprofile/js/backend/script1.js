let staffaccprofilevar, position_globalvar;
const socket = io();

socket.on("connect", () => {
  staffaccprofilevar = Staffaccprofilefunc();
  staffaccprofilevar.displayall();
  staffaccprofilevar.displayactivities();
  staffaccprofilevar.checkuser();
});

function Staffaccprofilefunc() {
  let errortimeout1 = 0,
    errortimeout2 = 0,
    errortimeout3 = 0,
    errortimeout4 = 0,
    errortimeout5 = 0;
  async function displayall() {
    try {
      let response = await fetch("/api/users/superadmin/myaccount", {
        method: "GET",
      });
      let myresult = await response.json();
      if (myresult.picture == "default") {
      } else {
        document.getElementById("profilepicid").src =
          "/api/users/superadmin/myaccount/profilepic";
      }
      if (myresult.status == "success") {
        let lastname = myresult.lastname;
        let firstname = myresult.firstname;
        let username = myresult.username;
        let password = myresult.password;

        let birthdate = myresult.birthdate;
        let phone = myresult.phone;
        let email = myresult.email;
        let address = myresult.address;
        let newstring = "";
        for (let i in password) {
          newstring += "*";
        }
        password = newstring;
        let content = document.getElementById("content2").innerHTML;
        let output = eval("`" + content.toString() + "`");
        document.getElementById("content2").innerHTML = output;
      }
    } catch (error) {
      errortimeout1 += 1;
      if (errortimeout1 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout1 = 0;
        setTimeout(displayall, 1000);
      }
    }
  }

  async function displayactivities() {
    try {
      let response = await fetch("/api/users/superadmin/myaccount/activities", {
        method: "GET",
      });
      let myresult = await response.json();
      if (myresult.status == "success") {
        let output = "";
        let results = myresult.allresults;
        var value = document.getElementById(
          "content3table1_template"
        ).innerHTML;
        for (let i in results) {
          output += eval("`" + value.toString() + "`");
        }
        document.getElementById("content3table1_cont").innerHTML += output;
      }
    } catch (error) {
      errortimeout4 += 1;
      if (errortimeout4 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout4 = 0;
        setTimeout(displayactivities, 1000);
      }
    }
  }

  async function displayeditprofile() {
    try {
      let response = await fetch("/api/users/superadmin/myaccount", {
        method: "GET",
      });
      let myresult = await response.json();
      if (myresult.status == "success") {
        let lastname = myresult.lastname;
        let firstname = myresult.firstname;
        let username = myresult.username;
        let password = myresult.password;

        let birthdate = myresult.birthdate;
        let phone = myresult.phone;
        let email = myresult.email;
        let address = myresult.address;
        // //////////// for edit profile /////////////////
        content = document.getElementById("editprofile").innerHTML;
        output = eval("`" + content.toString() + "`");
        document.getElementById("editprofile").innerHTML = output;
        //////////////////////////////////////////////////
      }
    } catch (error) {
      errortimeout3 += 1;
      if (errortimeout3 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout3 = 0;
        setTimeout(displayall, 1000);
      }
    }
  }

  async function checkuser() {
    try {
      let response = await fetch("/api/auth/checkuser", {
        method: "GET",
      });
      let myresult = await response.json();
      if (myresult.status == "loggedin") {
        position_globalvar = myresult.position;
        let position;
        if (position_globalvar == "superadmin") {
          position = "Super Admin";
        }
        if (position_globalvar == "admin") {
          position = "Admin";
        }
        if (position_globalvar == "staff") {
          position = "Staff";
        }
        let content = document.getElementById("content1").innerHTML;
        let output = eval("`" + content.toString() + "`");
        document.getElementById("content1").innerHTML = output;
      } else {
        location.replace("../loginpage");
      }
      errortimeout2 = 0;
    } catch (error) {
      errortimeout2 += 1;
      if (errortimeout2 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout2 = 0;
        setTimeout(checkuser, 1000);
      }
    }
  }

  async function updatesuperadmin() {
    let profileimg = document.getElementById("picture");
    let username = document.getElementById("usernameidvar").value;
    let password = document.getElementById("passwordidvar").value;
    let lastname = document.getElementById("lastnameidvar").value;
    let firstname = document.getElementById("firstnameidvar").value;
    let birthdate = document.getElementById("birthdateidvar").value;
    let phone = document.getElementById("phoneidvar").value;
    let email = document.getElementById("emailidvar").value;
    let address = document.getElementById("addressidvar").value;
    try {
      let formData = new FormData();
      formData.append("profilepic", profileimg.files[0]);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("lastname", lastname);
      formData.append("firstname", firstname);
      formData.append("birthdate", birthdate);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("address", address);
      const response = await axios.post(
        "/api/users/superadmin/myaccount/editaccount/updateprofile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status == "success") {
        alert("Profile Update Success");
      } else if (response.data.passwordauth) {
        alert(response.data.passwordauth);
      } else if (response.data.status == "ïnvalid") {
        alert("Invalids");
      }
    } catch (error) {
      alert(error);
      alert("Error Occured");
    }
  }

  async function updateuser() {
    if (position_globalvar == "superadmin") {
      updatesuperadmin();
    }
    if (position_globalvar == "admin") {
    }
    if (position_globalvar == "staff") {
    }
  }

  return {
    displayall,
    displayactivities,
    displayeditprofile,
    updateuser,
    checkuser,
  };
}

function goback() {
  if (position_globalvar == "superadmin") {
    location.replace("../superadminpage");
  }
  if (position_globalvar == "admin") {
    location.replace("../adminpage");
  }
  if (position_globalvar == "staff") {
    location.replace("../staffpage");
  }
}

///////////// for getting profile pic ///////////
var loadFile = function (event) {
  var output = document.getElementById("myprofileimage");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
};

function uploadprofilepic() {
  document.getElementById("picture").click();
}
/////////////////////////////////////////////////
