var addstaffglobalvarid;
////////////////////// get file function //////////////////
var loadFile = function (event) {
  var output = document.getElementById("myimage");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
};

function uploadprofilepic() {
  document.getElementById("picture").click();
}

async function displayclickabletableaddnewstaff(id) {
  addstaffglobalvarid = id;
  let response = await fetch(
    "/api/superadmin/addnewstaff/displayspecificuser?id=" + id,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  if (myresult[0].id != "invalid") {
    document.getElementById("lastnametext").value =
      myresult[0].stafftable[0].lastname;
    document.getElementById("firstnametext").value =
      myresult[0].stafftable[0].firstname;
    document.getElementById("usernametext").value =
      myresult[0].stafftable[0].username;
    document.getElementById("passwordtext").value =
      myresult[0].stafftable[0].password;
    //////////////// for modules ////////////////////
    displaystaffmodules();
    async function displaystaffmodules() {
      try {
        if (myresult[0].staffposition == "Registrar") {
          document.getElementById("staffpositiontext").value = "Registrar";
          await addstafffunc("displaystaffmodule");
          if (myresult[0].staffmodule[0].enrollment_sched != "invalid") {
            document.getElementById("staffmodule1text").checked = true;
          } else {
            document.getElementById("staffmodule1text").checked = false;
          }
          if (myresult[0].staffmodule[0].edit_enrollee_rec != "invalid") {
            document.getElementById("staffmodule2text").checked = true;
          } else {
            document.getElementById("staffmodule2text").checked = false;
          }
          if (myresult[0].staffmodule[0].enrollment_res != "invalid") {
            document.getElementById("staffmodule3text").checked = true;
          } else {
            document.getElementById("staffmodule3text").checked = false;
          }
          if (myresult[0].staffmodule[0].school_lvl != "invalid") {
            document.getElementById("staffmodule4text").checked = true;
          } else {
            document.getElementById("staffmodule4text").checked = false;
          }
          if (myresult[0].staffmodule[0].year_lvl != "invalid") {
            document.getElementById("staffmodule5text").checked = true;
          } else {
            document.getElementById("staffmodule5text").checked = false;
          }
          if (myresult[0].staffmodule[0].section != "invalid") {
            document.getElementById("staffmodule6text").checked = true;
          } else {
            document.getElementById("staffmodule6text").checked = false;
          }
          if (myresult[0].staffmodule[0].school_sched_pic != "invalid") {
            document.getElementById("staffmodule7text").checked = true;
          } else {
            document.getElementById("staffmodule7text").checked = false;
          }
          if (myresult[0].staffmodule[0].student_max_num != "invalid") {
            document.getElementById("staffmodule8text").checked = true;
          } else {
            document.getElementById("staffmodule8text").checked = false;
          }
        }

        if (myresult[0].staffposition == "Accounting") {
          document.getElementById("staffpositiontext").value = "Accounting";
          await addstafffunc("displaystaffmodule");
          if (myresult[0].staffmodule[0].other_fees != "invalid") {
            document.getElementById("staffmodule1text").checked = true;
          } else {
            document.getElementById("staffmodule1text").checked = false;
          }
          if (myresult[0].staffmodule[0].payment_plan != "invalid") {
            document.getElementById("staffmodule2text").checked = true;
          } else {
            document.getElementById("staffmodule2text").checked = false;
          }
          if (myresult[0].staffmodule[0].payment_plan_amnt != "invalid") {
            document.getElementById("staffmodule3text").checked = true;
          } else {
            document.getElementById("staffmodule3text").checked = false;
          }
        }

        if (myresult[0].staffposition == "Cashier") {
          document.getElementById("staffpositiontext").value = "Cashier";
          await addstafffunc("displaystaffmodule");
          if (myresult[0].staffmodule[0].verify_payment != "invalid") {
            document.getElementById("staffmodule1text").checked = true;
          } else {
            document.getElementById("staffmodule1text").checked = false;
          }
          if (myresult[0].staffmodule[0].edit_payment_method != "invalid") {
            document.getElementById("staffmodule2text").checked = true;
          } else {
            document.getElementById("staffmodule2text").checked = false;
          }
          if (myresult[0].staffmodule[0].view_stdnt_blnce != "invalid") {
            document.getElementById("staffmodule3text").checked = true;
          } else {
            document.getElementById("staffmodule3text").checked = false;
          }
        }

        if (myresult[0].staffposition == "Admin Department") {
          document.getElementById("staffpositiontext").value =
            "Admin Department";
          await addstafffunc("displaystaffmodule");
        }
      } catch (error) {
        setTimeout(displaystaffmodules, 1000);
      }
    }
    /////////////////////////////////////////////////
  } else {
    alert("Invalid");
  }
}
//////////////////////////////////////////////////////////
function addstafffunc(options) {
  var myresult;
  var myprofilepic;

  async function checkuser() {
    try {
      let response = await fetch("/api/superadmin/dashboard/getaccount", {
        method: "GET",
      });
      let myobj = await response.json();
      myresult = myobj[0].id;
      if (myresult != "invalid") {
        var name = myobj[0].name;
        if (myobj[0].picture) {
          document.getElementById("profilepicid").src =
            "/api/superadmin/myfiles/" + myobj[0].picture[0].picture;
        } else {
          document.getElementById("profilepicid").src =
            "../../img/defaultimg.png";
        }
        addstafffunc("displaystaffposition");
        addstafffunc("displaytable");
        getnewpassword();
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

  async function displaystaffposition() {
    try {
      let response = await fetch(
        "/api/superadmin/addnewstaff/displaystaffposition",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      if (myobj) {
        var text = "";
        for (var x in myobj) {
          text += "<option>" + myobj[x].value + "</option>";
        }
        document.getElementById("staffpositiontext").innerHTML = text;
        displaystaffmodule();
      }
    } catch (error) {
      alert("Invalid");
    }
  }
  /////////////////////// displaying staff modules ////////////////////
  function displayregistrarmodule() {
    var text = "";
    text +=
      "<tr><td>" +
      "<input type='checkbox' id='staffmodule1text'/><label><br />Enrollment Schedule</label>" +
      "</td><td>" +
      "<input type='checkbox' id='staffmodule2text'/><label><br />Edit Enrollee Records</label>" +
      "</td><td>" +
      "<input type='checkbox' id='staffmodule3text'/><label><br />Enrollment Reservation</label>" +
      "</td><td>" +
      "<input type='checkbox' id='staffmodule4text'/><label><br />School Level</label>" +
      "</td></tr>" +
      "<tr><td>" +
      "<input type='checkbox' id='staffmodule5text'/><label><br />Year Level</label>" +
      "</td><td>" +
      "<input type='checkbox' id='staffmodule6text'/><label><br />Section</label>" +
      "</td><td>" +
      "<input type='checkbox' id='staffmodule7text'/><label><br />School Schedule Picture</label>" +
      "</td><td>" +
      "<input type='checkbox' id='staffmodule8text'/><label><br />Student Max Number</label>" +
      "</td></tr>";

    document.getElementById("moduletblid").innerHTML = text;
  }

  function displayaccountingmodule() {
    var text = "";
    text +=
      "<tr><td>" +
      "<input type='checkbox' id='staffmodule1text'/><label><br />Other Fees</label>" +
      "</td><td>" +
      "<input type='checkbox' id='staffmodule2text'/><label><br />Payment Plan</label>" +
      "</td><td>" +
      "<input type='checkbox' id='staffmodule3text'/><label><br />Payment Plan Amount</label>" +
      "</td></tr>";

    document.getElementById("moduletblid").innerHTML = text;
  }

  function displaycashiermodule() {
    var text = "";
    text +=
      "<tr><td>" +
      "<input type='checkbox' id='staffmodule1text'/><label><br />Verify Payment</label>" +
      "</td><td>" +
      "<input type='checkbox' id='staffmodule2text'/><label><br />Edit Payment Method</label>" +
      "</td><td>" +
      "<input type='checkbox' id='staffmodule3text'/><label><br />View Student Balance</label>" +
      "</td></tr>";

    document.getElementById("moduletblid").innerHTML = text;
  }
  function displayadmindeptmodule() {
    var text = "";
    document.getElementById("moduletblid").innerHTML = text;
  }
  //////////////////////////////////////////////////////////////////////

  async function displaystaffmodule() {
    var registrar = document.getElementById("staffpositiontext").value;
    if (registrar == "Registrar") {
      displayregistrarmodule();
    }
    if (registrar == "Accounting") {
      displayaccountingmodule();
    }
    if (registrar == "Cashier") {
      displaycashiermodule();
    }
    if (registrar == "Admin Department") {
      displayadmindeptmodule();
    }
  }

  async function addstaffnow() {
    var lastnametext = document.getElementById("lastnametext").value;
    var firstnametext = document.getElementById("firstnametext").value;
    var usernametext = document.getElementById("usernametext").value;
    var passwordtext = document.getElementById("passwordtext").value;
    var staffposition = document.getElementById("staffpositiontext").value;
    var staffmodule1text = document.getElementById("staffmodule1text");
    var staffmodule2text = document.getElementById("staffmodule2text");
    var staffmodule3text = document.getElementById("staffmodule3text");
    var staffmodule4text = document.getElementById("staffmodule4text");
    var staffmodule5text = document.getElementById("staffmodule5text");
    var staffmodule6text = document.getElementById("staffmodule6text");
    var staffmodule7text = document.getElementById("staffmodule7text");
    var staffmodule8text = document.getElementById("staffmodule8text");
    var staffmodule1,
      staffmodule2,
      staffmodule3,
      staffmodule4,
      staffmodule5,
      staffmodule6,
      staffmodule7,
      staffmodule8;
    try {
      if (staffmodule1text.checked == true) {
        staffmodule1 = "staffmodule1";
      } else {
        staffmodule1 = "invalid";
      }
    } catch (error) {
      staffmodule1 = "invalid";
    }
    try {
      if (staffmodule2text.checked == true) {
        staffmodule2 = "staffmodule2";
      } else {
        staffmodule2 = "invalid";
      }
    } catch (error) {
      staffmodule2 = "invalid";
    }
    try {
      if (staffmodule3text.checked == true) {
        staffmodule3 = "staffmodule3";
      } else {
        staffmodule3 = "invalid";
      }
    } catch (error) {
      staffmodule3 = "invalid";
    }
    try {
      if (staffmodule4text.checked == true) {
        staffmodule4 = "staffmodule4";
      } else {
        staffmodule4 = "invalid";
      }
    } catch (error) {
      staffmodule4 = "invalid";
    }
    try {
      if (staffmodule5text.checked == true) {
        staffmodule5 = "staffmodule5";
      } else {
        staffmodule5 = "invalid";
      }
    } catch (error) {
      staffmodule5 = "invalid";
    }
    try {
      if (staffmodule6text.checked == true) {
        staffmodule6 = "staffmodule6";
      } else {
        staffmodule6 = "invalid";
      }
    } catch (error) {
      staffmodule6 = "invalid";
    }
    try {
      if (staffmodule7text.checked == true) {
        staffmodule7 = "staffmodule7";
      } else {
        staffmodule7 = "invalid";
      }
    } catch (error) {
      staffmodule7 = "invalid";
    }
    try {
      if (staffmodule8text.checked == true) {
        staffmodule8 = "staffmodule8";
      } else {
        staffmodule8 = "invalid";
      }
    } catch (error) {
      staffmodule8 = "invalid";
    }
    let formData = new FormData();
    formData.append("lastname", lastnametext);
    formData.append("firstname", firstnametext);
    formData.append("username", usernametext);
    formData.append("password", passwordtext);
    formData.append("staffposition", staffposition);
    formData.append("staffmodule1", staffmodule1);
    formData.append("staffmodule2", staffmodule2);
    formData.append("staffmodule3", staffmodule3);
    formData.append("staffmodule4", staffmodule4);
    formData.append("staffmodule5", staffmodule5);
    formData.append("staffmodule6", staffmodule6);
    formData.append("staffmodule7", staffmodule7);
    formData.append("staffmodule8", staffmodule8);
    formData.append("picture", picture.files[0]);
    let response = await fetch("/api/superadmin/addnewstaff/addnewstaff", {
      method: "POST",
      body: formData,
    });
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id != "invalid") {
      alert("Success");
      displaytable();
    } else {
      alert("Invalid Pls Try Again");
    }
  }

  ///////////////////////// display table /////////////////////
  async function displaytable() {
    var text =
      "<tr><th><div>Lastname</div></th><th><div>Firstname</div></th><th><div>Email</div></th></tr>";
    document.getElementById("addnewstafftblid").innerHTML = "";
    let response = await fetch("/api/superadmin/addnewstaff/displaytable", {
      method: "GET",
    });
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      for (var x in myresult) {
        text +=
          '<tr onclick="' +
          "displayclickabletableaddnewstaff('" +
          myresult[x].id +
          "')" +
          '">' +
          "<td>" +
          myresult[x].lastname +
          "</td><td>" +
          myresult[x].firstname +
          "</td><td>" +
          myresult[x].email +
          "</td></tr>";
      }
      document.getElementById("addnewstafftblid").innerHTML = text;
    } else {
      document.getElementById("addnewstafftblid").innerHTML = text;
    }
  }
  /////////////////////////////////////////////////////////////

  async function getnewpassword() {
    let response = await fetch("/api/superadmin/addnewadmin/getnewpassword", {
      method: "GET",
    });
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      document.getElementById("passwordtext").value = myresult[0].password;
    } else {
      alert("Password Error");
    }
  }

  async function updatestaff() {
    var lastnametext = document.getElementById("lastnametext").value;
    var firstnametext = document.getElementById("firstnametext").value;
    var usernametext = document.getElementById("usernametext").value;
    var passwordtext = document.getElementById("passwordtext").value;
    var staffposition = document.getElementById("staffpositiontext").value;
    var staffmodule1text = document.getElementById("staffmodule1text");
    var staffmodule2text = document.getElementById("staffmodule2text");
    var staffmodule3text = document.getElementById("staffmodule3text");
    var staffmodule4text = document.getElementById("staffmodule4text");
    var staffmodule5text = document.getElementById("staffmodule5text");
    var staffmodule6text = document.getElementById("staffmodule6text");
    var staffmodule7text = document.getElementById("staffmodule7text");
    var staffmodule8text = document.getElementById("staffmodule8text");
    var staffmodule1,
      staffmodule2,
      staffmodule3,
      staffmodule4,
      staffmodule5,
      staffmodule6,
      staffmodule7,
      staffmodule8;
    try {
      if (staffmodule1text.checked == true) {
        staffmodule1 = "staffmodule1";
      } else {
        staffmodule1 = "invalid";
      }
    } catch (error) {
      staffmodule1 = "invalid";
    }
    try {
      if (staffmodule2text.checked == true) {
        staffmodule2 = "staffmodule2";
      } else {
        staffmodule2 = "invalid";
      }
    } catch (error) {
      staffmodule2 = "invalid";
    }
    try {
      if (staffmodule3text.checked == true) {
        staffmodule3 = "staffmodule3";
      } else {
        staffmodule3 = "invalid";
      }
    } catch (error) {
      staffmodule3 = "invalid";
    }
    try {
      if (staffmodule4text.checked == true) {
        staffmodule4 = "staffmodule4";
      } else {
        staffmodule4 = "invalid";
      }
    } catch (error) {
      staffmodule4 = "invalid";
    }
    try {
      if (staffmodule5text.checked == true) {
        staffmodule5 = "staffmodule5";
      } else {
        staffmodule5 = "invalid";
      }
    } catch (error) {
      staffmodule5 = "invalid";
    }
    try {
      if (staffmodule6text.checked == true) {
        staffmodule6 = "staffmodule6";
      } else {
        staffmodule6 = "invalid";
      }
    } catch (error) {
      staffmodule6 = "invalid";
    }
    try {
      if (staffmodule7text.checked == true) {
        staffmodule7 = "staffmodule7";
      } else {
        staffmodule7 = "invalid";
      }
    } catch (error) {
      staffmodule7 = "invalid";
    }
    try {
      if (staffmodule8text.checked == true) {
        staffmodule8 = "staffmodule8";
      } else {
        staffmodule8 = "invalid";
      }
    } catch (error) {
      staffmodule8 = "invalid";
    }
    let formData = new FormData();
    formData.append("lastname", lastnametext);
    formData.append("firstname", firstnametext);
    formData.append("username", usernametext);
    formData.append("password", passwordtext);
    formData.append("staffposition", staffposition);
    formData.append("staffmodule1", staffmodule1);
    formData.append("staffmodule2", staffmodule2);
    formData.append("staffmodule3", staffmodule3);
    formData.append("staffmodule4", staffmodule4);
    formData.append("staffmodule5", staffmodule5);
    formData.append("staffmodule6", staffmodule6);
    formData.append("staffmodule7", staffmodule7);
    formData.append("staffmodule8", staffmodule8);
    let response = await fetch(
      "/api/superadmin/addnewstaff/updatestaff?id=" + addstaffglobalvarid,
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id != "invalid") {
      alert("Success");
      displaytable();
      displayclickabletableaddnewstaff(addstaffglobalvarid);
    } else {
      alert("Invalid Pls Try Again");
    }
  }

  async function deletestaff() {
    let response = await fetch(
      "/api/superadmin/addnewstaff/deletestaff?id=" + addstaffglobalvarid,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      alert("Success");
      displaytable();
    } else {
      alert("Invalid Pls Try Again");
    }
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
  if (options == "addstaffnow") {
    addstaffnow();
  }
  if (options == "displaystaffposition") {
    displaystaffposition();
  }
  if (options == "displaystaffmodule") {
    displaystaffmodule();
  }
  if (options == "displaytable") {
    displaytable();
  }
  if (options == "updatestaff") {
    updatestaff();
  }
  if (options == "deletestaff") {
    deletestaff();
  }
}
