var globalvarposition;
function registrarfunc(options) {
  var myresult;
  var myprofilepic;

  async function checkregistrarmodule(position) {
    try {
      document.getElementById("registrarsidenavid").style.display = "none";
      document.getElementById("accountingsidenavid").style.display = "none";
      document.getElementById("cashiersidenavid").style.display = "none";
      document.getElementById("admindepartmentsidenavid").style.display =
        "none";
      if (position == "Registrar") {
        document.getElementById("registrarsidenavid").style.display =
          "inline-block";
      }
      if (position == "Accounting") {
        document.getElementById("accountingsidenavid").style.display =
          "inline-block";
      }
      if (position == "Cashier") {
        document.getElementById("cashiersidenavid").style.display =
          "inline-block";
      }
      if (position == "Admin Department") {
        document.getElementById("admindepartmentsidenavid").style.display =
          "inline-block";
      }
      let response = await fetch("/api/staff/registrar/checkmodule", {
        method: "GET",
      });
      let myobj = await response.json();
      if (myobj[0].enrollment_sched == "invalid") {
        document.getElementById("enrollmentschedulecard").style.display =
          "none";
      }
      if (myobj[0].edit_enrollee_rec == "invalid") {
        document.getElementById("editenrolleerecordscard").style.display =
          "none";
      }
      if (myobj[0].enrollment_res == "invalid") {
        document.getElementById("enrollmentreservationcard").style.display =
          "none";
      }
      if (myobj[0].school_lvl == "invalid") {
        document.getElementById("schoollevelcard").style.display = "none";
      }
      if (myobj[0].year_lvl == "invalid") {
        document.getElementById("yearlevelcard").style.display = "none";
      }
      if (myobj[0].section == "invalid") {
        document.getElementById("sectioncard").style.display = "none";
      }
      if (myobj[0].school_sched_pic == "invalid") {
        document.getElementById("schoolschedulecard").style.display = "none";
      }
      if (myobj[0].student_max_num == "invalid") {
        document.getElementById("studentmaxnumbercard").style.display = "none";
      }
    } catch (error) {
      console.log("loading modules....");
      setTimeout(checkregistrarmodule, 1000, position);
    }
  }

  async function checkuser() {
    try {
      let response = await fetch("/api/staff/dashboard/getaccount", {
        method: "GET",
      });
      let myobj = await response.json();
      myresult = myobj[0].id;
      if (myresult != "invalid") {
        // var name = myobj[0].name;
        // document.getElementById("wholenameid").innerHTML =
        //   name[0].lastname + " " + name[0].firstname;
        if (myobj[0].picture) {
          document.getElementById("profilepicid").src =
            "/api/staff/myfiles/" + myobj[0].picture;
        } else {
          document.getElementById("profilepicid").src =
            "../../img/defaultimg.png";
        }
        globalvarposition = myobj[0].position;
        setTimeout(checkregistrarmodule, 200, myobj[0].position);
      } else {
        location.replace("../../loginpage");
      }
    } catch (error) {
      alert("Opps Network Error!");
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
