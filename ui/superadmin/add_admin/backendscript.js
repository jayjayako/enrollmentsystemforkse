var addadminglobalvarid;
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
async function displayclickabletableaddnewadmin(id) {
  addadminglobalvarid = id;
  let response = await fetch(
    "/api/superadmin/addnewadmin/displayspecificuser?id=" + id,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  if (myresult[0].id != "invalid") {
    document.getElementById("lastnametext").value =
      myresult[0].admintable[0].lastname;
    document.getElementById("firstnametext").value =
      myresult[0].admintable[0].firstname;
    document.getElementById("usernametext").value =
      myresult[0].admintable[0].username;
    document.getElementById("passwordtext").value =
      myresult[0].admintable[0].password;
    //////////////// for modules ////////////////////
    if (myresult[0].adminmodule[0].add_new_staff != "invalid") {
      document.getElementById("addnewstafftext").checked = true;
    } else {
      document.getElementById("addnewstafftext").checked = false;
    }
    if (myresult[0].adminmodule[0].manage_staff != "invalid") {
      document.getElementById("managestafftext").checked = true;
    } else {
      document.getElementById("managestafftext").checked = false;
    }
    if (myresult[0].adminmodule[0].manage_student != "invalid") {
      document.getElementById("managestudenttext").checked = true;
    } else {
      document.getElementById("managestudenttext").checked = false;
    }
    if (myresult[0].adminmodule[0].audit_trail != "invalid") {
      document.getElementById("audittrailtext").checked = true;
    } else {
      document.getElementById("audittrailtext").checked = false;
    }
    if (myresult[0].adminmodule[0].view_report != "invalid") {
      document.getElementById("viewreporttext").checked = true;
    } else {
      document.getElementById("viewreporttext").checked = false;
    }
    /////////////////////////////////////////////////
  } else {
    alert("Invalid");
  }
}
//////////////////////////////////////////////////////////
function addadminfunc(options) {
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
        addadminfunc("displaytable");
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
  ///////////////////////// add new admin //////////////////////
  async function addadminnow() {
    var lastnametext = document.getElementById("lastnametext").value;
    var firstnametext = document.getElementById("firstnametext").value;
    var usernametext = document.getElementById("usernametext").value;
    var passwordtext = document.getElementById("passwordtext").value;

    var addnewstafftext = document.getElementById("addnewstafftext");
    var managestafftext = document.getElementById("managestafftext");
    var managestudenttext = document.getElementById("managestudenttext");
    var audittrailtext = document.getElementById("audittrailtext");
    var viewreporttext = document.getElementById("viewreporttext");
    var addnewstaff, managestaff, managestudent, audittrail, viewreport;
    if (addnewstafftext.checked == true) {
      addnewstaff = "addnewstaff";
    } else {
      addnewstaff = "invalid";
    }
    if (managestafftext.checked == true) {
      managestaff = "managestaff";
    } else {
      managestaff = "invalid";
    }
    if (managestudenttext.checked == true) {
      managestudent = "managestudent";
    } else {
      managestudent = "invalid";
    }
    if (audittrailtext.checked == true) {
      audittrail = "audittrail";
    } else {
      audittrail = "invalid";
    }
    if (viewreporttext.checked == true) {
      viewreport = "viewreport";
    } else {
      viewreport = "invalid";
    }
    let formData = new FormData();
    formData.append("lastname", lastnametext);
    formData.append("firstname", firstnametext);
    formData.append("username", usernametext);
    formData.append("password", passwordtext);
    formData.append("addnewstaff", addnewstaff);
    formData.append("managestaff", managestaff);
    formData.append("managestudent", managestudent);
    formData.append("audittrail", audittrail);
    formData.append("viewreport", viewreport);
    formData.append("picture", picture.files[0]);
    let response = await fetch("/api/superadmin/addnewadmin/addnewadmin", {
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
  /////////////////////////////////////////////////////////////

  ///////////////////////// display table /////////////////////
  async function displaytable() {
    var text =
      "<tr><th><div>Lastname</div></th><th><div>Firstname</div></th><th><div>Email</div></th></tr>";
    document.getElementById("addnewadmintblid").innerHTML = "";
    let response = await fetch("/api/superadmin/addnewadmin/displaytable", {
      method: "GET",
    });
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      for (var x in myresult) {
        text +=
          '<tr onclick="' +
          "displayclickabletableaddnewadmin('" +
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
      document.getElementById("addnewadmintblid").innerHTML = text;
    } else {
      document.getElementById("addnewadmintblid").innerHTML = text;
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

  async function updateadmin() {
    var lastnametext = document.getElementById("lastnametext").value;
    var firstnametext = document.getElementById("firstnametext").value;
    var usernametext = document.getElementById("usernametext").value;
    var passwordtext = document.getElementById("passwordtext").value;

    var addnewstafftext = document.getElementById("addnewstafftext");
    var managestafftext = document.getElementById("managestafftext");
    var managestudenttext = document.getElementById("managestudenttext");
    var audittrailtext = document.getElementById("audittrailtext");
    var viewreporttext = document.getElementById("viewreporttext");
    var addnewstaff, managestaff, managestudent, audittrail, viewreport;
    if (addnewstafftext.checked == true) {
      addnewstaff = "addnewstaff";
    } else {
      addnewstaff = "invalid";
    }
    if (managestafftext.checked == true) {
      managestaff = "managestaff";
    } else {
      managestaff = "invalid";
    }
    if (managestudenttext.checked == true) {
      managestudent = "managestudent";
    } else {
      managestudent = "invalid";
    }
    if (audittrailtext.checked == true) {
      audittrail = "audittrail";
    } else {
      audittrail = "invalid";
    }
    if (viewreporttext.checked == true) {
      viewreport = "viewreport";
    } else {
      viewreport = "invalid";
    }
    let formData = new FormData();
    formData.append("lastname", lastnametext);
    formData.append("firstname", firstnametext);
    formData.append("username", usernametext);
    formData.append("password", passwordtext);
    formData.append("addnewstaff", addnewstaff);
    formData.append("managestaff", managestaff);
    formData.append("managestudent", managestudent);
    formData.append("audittrail", audittrail);
    formData.append("viewreport", viewreport);
    let response = await fetch(
      "/api/superadmin/addnewadmin/updateadmin?id=" + addadminglobalvarid,
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
      displayclickabletableaddnewadmin(addadminglobalvarid);
    } else {
      alert("Invalid Pls Try Again");
    }
  }

  async function deleteadmin() {
    let response = await fetch(
      "/api/superadmin/addnewadmin/deleteadmin?id=" + addadminglobalvarid,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      alert("Success");
      displaytable();
    } else {
      alert("Error");
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
  if (options == "addadminnow") {
    addadminnow();
  }
  if (options == "displaytable") {
    displaytable();
  }
  if (options == "updateadmin") {
    updateadmin();
  }
  if (options == "deleteadmin") {
    deleteadmin();
  }
}
