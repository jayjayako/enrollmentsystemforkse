var globalvarposition;
function accountingfunct(options) {
  var myresult;
  var myprofilepic;

  async function checkaccountingmodule(position) {
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
      let response = await fetch("/api/staff/accounting/checkmodule", {
        method: "GET",
      });
      let myobj = await response.json();
      if (myobj[0].other_fees == "invalid") {
        document.getElementById("otherfeescard").style.display = "none";
      }
      if (myobj[0].payment_plan == "invalid") {
        document.getElementById("paymentplancard").style.display = "none";
      }
      if (myobj[0].payment_plan_amnt == "invalid") {
        document.getElementById("paymentplanamountcard").style.display = "none";
      }
    } catch (error) {
      console.log("loading modules....");
      setTimeout(checkaccountingmodule, 1000, position);
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
        //var name = myobj[0].name;
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
        setTimeout(checkaccountingmodule, 500, myobj[0].position);
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
