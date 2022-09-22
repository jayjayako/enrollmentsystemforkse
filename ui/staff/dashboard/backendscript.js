var errortimeout = 0;
var globalvarposition;
function dashboardfunct(options) {
  var myresult;
  var myprofilepic;

  async function checkuser() {
    try {
      let response = await fetch("/api/staff/dashboard/getaccount", {
        method: "GET",
      });
      let myobj = await response.json();
      myresult = myobj[0].id;
      if (myresult != "invalid") {
        var name = myobj[0].name;
        document.getElementById("wholenameid").innerHTML =
          name[0].firstname + " " + name[0].lastname;
        document.getElementById("greetingid").innerHTML =
          "<b>Hello,&nbsp;&nbsp;</b>" +
          name[0].firstname +
          " " +
          name[0].lastname;
        document.getElementById("positionid").innerHTML = myobj[0].position;
        document.getElementById("emailid").innerHTML = myobj[0].email;
        if (myobj[0].picture) {
          document.getElementById("profilepicid").src =
            "/api/staff/myfiles/" + myobj[0].picture;
          document.getElementById("profilepicid2").src =
            "/api/staff/myfiles/" + myobj[0].picture;
        } else {
          document.getElementById("profilepicid").src =
            "../../img/defaultimg.png";
          document.getElementById("profilepicid2").src =
            "../../img/defaultimg.png";
        }
        globalvarposition = myobj[0].position;
        document.getElementById("registrarsidenavid").style.display = "none";
        document.getElementById("accountingsidenavid").style.display = "none";
        document.getElementById("cashiersidenavid").style.display = "none";
        document.getElementById("admindepartmentsidenavid").style.display =
          "none";
        if (globalvarposition == "Registrar") {
          document.getElementById("registrarsidenavid").style.display =
            "inline-block";
        }
        if (globalvarposition == "Accounting") {
          document.getElementById("accountingsidenavid").style.display =
            "inline-block";
        }
        if (globalvarposition == "Cashier") {
          document.getElementById("cashiersidenavid").style.display =
            "inline-block";
        }
        if (globalvarposition == "Admin Department") {
          document.getElementById("admindepartmentsidenavid").style.display =
            "inline-block";
        }
      } else {
        location.replace("../../loginpage");
      }
      //   myprofilepic = myobj[0].picture;
      //   // you can if condition if success or not to ouput something
      //   if (myresult == "invalid") {
      //     location.replace("../../staff/loginpage");
      //   } else {
      //     if (myprofilepic == "../../img/defaultimg.png") {
      //       document.getElementById("profilepic").src =
      //         "../../img/defaultimg.png";
      //     } else {
      //       document.getElementById("profilepic").src =
      //         "/api/admin/myfiles/" + myprofilepic;
      //     }
      //   }
      errortimeout = 0;
    } catch (error) {
      errortimeout += 1;
      if (errortimeout >= 5) {
        alert("Opps Network Error!");
      } else {
        setTimeout(checkuser, 1000);
      }
    }
  }

  function logout() {
    fetch("/api/authentication/logout", {
      method: "get",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    location.replace("../../loginpage");
  }
  if (options == "checkuser") {
    checkuser();
  }
  if (options == "gotoprofile") {
    gotoprofile();
  }
  if (options == "logout") {
    logout();
  }
}
