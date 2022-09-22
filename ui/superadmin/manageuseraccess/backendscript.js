var usertypeglobalvar, useridglobalvar;
/////////////////////// displaying admin modules ////////////////////
function displayadminmodule() {
  var text = "";
  text +=
    "<tr><td>" +
    "<input type='checkbox' id='adminmodule1text'/><label><br />Add New Staff</label>" +
    "</td><td>" +
    "<input type='checkbox' id='adminmodule2text'/><label><br />Manage Staff</label>" +
    "</td><td>" +
    "<input type='checkbox' id='adminmodule3text'/><label><br />Manage Student</label>" +
    "</td><td>" +
    "<input type='checkbox' id='adminmodule4text'/><label><br />Audit Trail</label>" +
    "</td><td>" +
    "<input type='checkbox' id='adminmodule5text'/><label><br />View Report</label>" +
    "</td></tr>";

  document.getElementById("manageuseraccesseditaccesstblid").innerHTML = text;
}
/////////////////////////////////////////////////////////////////////
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

  document.getElementById("manageuseraccesseditaccesstblid").innerHTML = text;
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

  document.getElementById("manageuseraccesseditaccesstblid").innerHTML = text;
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

  document.getElementById("manageuseraccesseditaccesstblid").innerHTML = text;
}
function displayadmindeptmodule() {
  var text = "";
  document.getElementById("manageuseraccesseditaccesstblid").innerHTML = text;
}

async function displayclickabletablemanageuseraccess(id) {
  useridglobalvar = id;
  try {
    let response = await fetch(
      "/api/superadmin/manageuseraccess/displayspecificuser?usertype=" +
        usertypeglobalvar +
        "&id=" +
        id,
      {
        method: "GET",
      }
    );
    let myobj = await response.json();
    if (usertypeglobalvar == "admin") {
      document.getElementById("manageuseraccessidnum").value =
        myobj[0].specificadmin[0].id;
      document.getElementById("manageuseraccessstaffposition").value = "none";
      document.getElementById("manageuseraccessfirstname").value =
        myobj[0].specificadmin[0].firstname;
      document.getElementById("manageuseraccesslastname").value =
        myobj[0].specificadmin[0].lastname;
      document.getElementById("manageuseraccesspictureid").src =
        "/api/superadmin/audittrailfiles?myid=" +
        myobj[0].specificadmin[0].id +
        "&filename=" +
        myobj[0].specificadmin[0].picture;
      await displayadminmodule();
      if (myobj[0].specificadminmodule[0].add_new_staff != "invalid") {
        document.getElementById("adminmodule1text").checked = true;
      } else {
        document.getElementById("adminmodule1text").checked = false;
      }
      if (myobj[0].specificadminmodule[0].manage_staff != "invalid") {
        document.getElementById("adminmodule2text").checked = true;
      } else {
        document.getElementById("adminmodule2text").checked = false;
      }
      if (myobj[0].specificadminmodule[0].manage_student != "invalid") {
        document.getElementById("adminmodule3text").checked = true;
      } else {
        document.getElementById("adminmodule3text").checked = false;
      }
      if (myobj[0].specificadminmodule[0].audit_trail != "invalid") {
        document.getElementById("adminmodule4text").checked = true;
      } else {
        document.getElementById("adminmodule4text").checked = false;
      }
      if (myobj[0].specificadminmodule[0].view_report != "invalid") {
        document.getElementById("adminmodule5text").checked = true;
      } else {
        document.getElementById("adminmodule5text").checked = false;
      }
    }
    if (usertypeglobalvar == "staff") {
      document.getElementById("manageuseraccessidnum").value =
        myobj[0].specificstaff[0].id;
      document.getElementById("manageuseraccessstaffposition").value =
        myobj[0].specificstaff[0].position;
      document.getElementById("manageuseraccessfirstname").value =
        myobj[0].specificstaff[0].firstname;
      document.getElementById("manageuseraccesslastname").value =
        myobj[0].specificstaff[0].lastname;
      document.getElementById("manageuseraccesspictureid").src =
        "/api/superadmin/audittrailfiles?myid=" +
        myobj[0].specificstaff[0].id +
        "&filename=" +
        myobj[0].specificstaff[0].picture;
      ////////////////registrar module ////////////////
      if (myobj[0].specificstaffposition == "registrar") {
        await displayregistrarmodule();
        if (myobj[0].specificstaffmodule[0].enrollment_sched != "invalid") {
          document.getElementById("staffmodule1text").checked = true;
        } else {
          document.getElementById("staffmodule1text").checked = false;
        }
        if (myobj[0].specificstaffmodule[0].edit_enrollee_rec != "invalid") {
          document.getElementById("staffmodule2text").checked = true;
        } else {
          document.getElementById("staffmodule2text").checked = false;
        }
        if (myobj[0].specificstaffmodule[0].enrollment_res != "invalid") {
          document.getElementById("staffmodule3text").checked = true;
        } else {
          document.getElementById("staffmodule3text").checked = false;
        }
        if (myobj[0].specificstaffmodule[0].school_lvl != "invalid") {
          document.getElementById("staffmodule4text").checked = true;
        } else {
          document.getElementById("staffmodule4text").checked = false;
        }
        if (myobj[0].specificstaffmodule[0].year_lvl != "invalid") {
          document.getElementById("staffmodule5text").checked = true;
        } else {
          document.getElementById("staffmodule5text").checked = false;
        }
        if (myobj[0].specificstaffmodule[0].section != "invalid") {
          document.getElementById("staffmodule6text").checked = true;
        } else {
          document.getElementById("staffmodule6text").checked = false;
        }
        if (myobj[0].specificstaffmodule[0].school_sched_pic != "invalid") {
          document.getElementById("staffmodule7text").checked = true;
        } else {
          document.getElementById("staffmodule7text").checked = false;
        }
        if (myobj[0].specificstaffmodule[0].school_sched_pic != "invalid") {
          document.getElementById("staffmodule8text").checked = true;
        } else {
          document.getElementById("staffmodule8text").checked = false;
        }
      }
      /////////////////////////////////////////////////
      //////////////// accounting module //////////////
      if (myobj[0].specificstaffposition == "accounting") {
        await displayaccountingmodule();
        if (myobj[0].specificstaffmodule[0].other_fees != "invalid") {
          document.getElementById("staffmodule1text").checked = true;
        } else {
          document.getElementById("staffmodule1text").checked = false;
        }
        if (myobj[0].specificstaffmodule[0].payment_plan != "invalid") {
          document.getElementById("staffmodule2text").checked = true;
        } else {
          document.getElementById("staffmodule2text").checked = false;
        }
        if (myobj[0].specificstaffmodule[0].payment_plan_amnt != "invalid") {
          document.getElementById("staffmodule3text").checked = true;
        } else {
          document.getElementById("staffmodule3text").checked = false;
        }
      }
      /////////////////////////////////////////////////
      //////////////// cashier module //////////////
      if (myobj[0].specificstaffposition == "cashier") {
        await displaycashiermodule();
        if (myobj[0].specificstaffmodule[0].verify_payment != "invalid") {
          document.getElementById("staffmodule1text").checked = true;
        } else {
          document.getElementById("staffmodule1text").checked = false;
        }
        if (myobj[0].specificstaffmodule[0].edit_payment_method != "invalid") {
          document.getElementById("staffmodule2text").checked = true;
        } else {
          document.getElementById("staffmodule2text").checked = false;
        }
        if (myobj[0].specificstaffmodule[0].view_stdnt_blnce != "invalid") {
          document.getElementById("staffmodule3text").checked = true;
        } else {
          document.getElementById("staffmodule3text").checked = false;
        }
      }
      /////////////////////////////////////////////////
      //////////////// admin department module //////////////
      if (myobj[0].specificstaffposition == "admindept") {
        await displayadmindeptmodule();
      }
      /////////////////////////////////////////////////
    }
  } catch (error) {
    alert(error);
  }
}
function manageuseraccessfunc(options) {
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
        getusertype();
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

  async function getusertype() {
    try {
      let response = await fetch(
        "/api/superadmin/manageuseraccess/displayusertype",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      if (myobj) {
        var text = "";
        for (var x in myobj) {
          text += "<option>" + myobj[x].usertype + "</option>";
        }
        document.getElementById("usertypeid").innerHTML = text;
        getstaffposition();
      }
    } catch (error) {
      alert(error);
    }
  }

  async function getstaffposition() {
    try {
      var usertype = document.getElementById("usertypeid").value;
      let response = await fetch(
        "/api/superadmin/manageuseraccess/displaystaffposition?usertype=" +
          usertype,
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      if (myobj[0].id != "invalid") {
        var text = "";
        for (var x in myobj) {
          text += "<option>" + myobj[x].value + "</option>";
        }
        document.getElementById("staffpositionid").innerHTML = text;
        displaystafftable();
      } else {
        document.getElementById("staffpositionid").innerHTML = "";
        displayadmintable();
      }
    } catch (error) {
      alert(error);
    }
  }

  async function displayadmintable() {
    usertypeglobalvar = "admin";
    var text =
      "<tr><th><div>Lastname</div></th><th><div>Firstname</div></th><th><div>Email</div></th></tr>";
    document.getElementById("manageuseraccesstableid").innerHTML = "";
    var staffposition = document.getElementById("staffpositionid").value;
    let response = await fetch(
      "/api/superadmin/manageuseraccess/displaytable?position=" + staffposition,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].admintable[0].id != "invalid") {
      for (var x in myresult[0].admintable) {
        text +=
          '<tr onclick="' +
          "displayclickabletablemanageuseraccess('" +
          myresult[0].admintable[x].id +
          "')" +
          '">' +
          "<td>" +
          myresult[0].admintable[x].lastname +
          "</td><td>" +
          myresult[0].admintable[x].firstname +
          "</td><td>" +
          myresult[0].admintable[x].email +
          "</td></tr>";
      }
      document.getElementById("manageuseraccesstableid").innerHTML = text;
    } else {
      document.getElementById("manageuseraccesstableid").innerHTML = text;
    }
  }

  async function displaystafftable() {
    usertypeglobalvar = "staff";
    var text =
      "<tr><th><div>Lastname</div></th><th><div>Firstname</div></th><th><div>Email</div></th></tr>";
    document.getElementById("manageuseraccesstableid").innerHTML = "";
    var staffposition = document.getElementById("staffpositionid").value;
    let response = await fetch(
      "/api/superadmin/manageuseraccess/displaytable?position=" + staffposition,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].stafftable[0].id != "invalid") {
      for (var x in myresult[0].stafftable) {
        text +=
          '<tr onclick="' +
          "displayclickabletablemanageuseraccess('" +
          myresult[0].stafftable[x].id +
          "')" +
          '">' +
          "<td>" +
          myresult[0].stafftable[x].lastname +
          "</td><td>" +
          myresult[0].stafftable[x].firstname +
          "</td><td>" +
          myresult[0].stafftable[x].email +
          "</td></tr>";
      }
      document.getElementById("manageuseraccesstableid").innerHTML = text;
    } else {
      document.getElementById("manageuseraccesstableid").innerHTML = text;
    }
  }

  async function updatemodule() {
    var addnewstafftext = document.getElementById("adminmodule1text");
    var managestafftext = document.getElementById("adminmodule2text");
    var managestudenttext = document.getElementById("adminmodule3text");
    var audittrailtext = document.getElementById("adminmodule4text");
    var viewreporttext = document.getElementById("adminmodule5text");
    var staffmodule1text = document.getElementById("staffmodule1text");
    var staffmodule2text = document.getElementById("staffmodule2text");
    var staffmodule3text = document.getElementById("staffmodule3text");
    var staffmodule4text = document.getElementById("staffmodule4text");
    var staffmodule5text = document.getElementById("staffmodule5text");
    var staffmodule6text = document.getElementById("staffmodule6text");
    var staffmodule7text = document.getElementById("staffmodule7text");
    var staffmodule8text = document.getElementById("staffmodule8text");
    var addnewstaff,
      managestaff,
      managestudent,
      audittrail,
      viewreport,
      staffmodule1,
      staffmodule2,
      staffmodule3,
      staffmodule4,
      staffmodule5,
      staffmodule6,
      staffmodule7,
      staffmodule8;
    try {
      if (addnewstafftext.checked == true) {
        addnewstaff = "adminmodule1";
      } else {
        addnewstaff = "invalid";
      }
    } catch (error) {
      addnewstaff = "invalid";
    }
    try {
      if (managestafftext.checked == true) {
        managestaff = "adminmodule2";
      } else {
        managestaff = "invalid";
      }
    } catch (error) {
      managestaff = "invalid";
    }
    try {
      if (managestudenttext.checked == true) {
        managestudent = "adminmodule3";
      } else {
        managestudent = "invalid";
      }
    } catch (error) {
      managestudent = "invalid";
    }
    try {
      if (audittrailtext.checked == true) {
        audittrail = "adminmodule4";
      } else {
        audittrail = "invalid";
      }
    } catch (error) {
      audittrail = "invalid";
    }
    try {
      if (viewreporttext.checked == true) {
        viewreport = "adminmodule5";
      } else {
        viewreport = "invalid";
      }
    } catch (error) {
      viewreport = "invalid";
    }
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
    formData.append("addnewstaff", addnewstaff);
    formData.append("managestaff", managestaff);
    formData.append("managestudent", managestudent);
    formData.append("audittrail", audittrail);
    formData.append("viewreport", viewreport);
    formData.append("staffmodule1", staffmodule1);
    formData.append("staffmodule2", staffmodule2);
    formData.append("staffmodule3", staffmodule3);
    formData.append("staffmodule4", staffmodule4);
    formData.append("staffmodule5", staffmodule5);
    formData.append("staffmodule6", staffmodule6);
    formData.append("staffmodule7", staffmodule7);
    formData.append("staffmodule8", staffmodule8);
    let response = await fetch(
      "/api/superadmin/manageuseraccess/saveuseraccess?id=" + useridglobalvar,
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id != "invalid") {
      alert("Success");
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
  if (options == "getusertype") {
    getusertype();
  }
  if (options == "getstaffposition") {
    getstaffposition();
  }
  if (options == "displayadmintable") {
    displayadmintable();
  }
  if (options == "displaystafftable") {
    displaystafftable();
  }
  if (options == "updatemodule") {
    updatemodule();
  }
}
