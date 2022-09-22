var errortimeout = 0;
async function displayspecificloghistory(id) {
  try {
    let response = await fetch(
      "/api/superadmin/audittrail/displayspecificloghistory?id=" + id,
      {
        method: "GET",
      }
    );
    let myobj = await response.json();
    if (myobj[0].id != "invalid") {
      /////////////////////////// log history /////////////////////////////
      document.getElementById("userinfologhistoryid").value = myobj[0].id;
      document.getElementById("userinfologhistoryusertype").value =
        myobj[0].usertype;
      document.getElementById("userinfologhistoryfirstname").value =
        myobj[0].firstname;
      document.getElementById("userinfologhistorylastname").value =
        myobj[0].lastname;
      ////////////////////////////////////////////////////////////////////
      ///////////////////////// activity log /////////////////////////////
      document.getElementById("userinfoactivitylogid").value = myobj[0].id;
      document.getElementById("userinfoactivitylogusertype").value =
        myobj[0].usertype;
      document.getElementById("userinfoactivitylogfirstname").value =
        myobj[0].firstname;
      document.getElementById("userinfoactivityloglastname").value =
        myobj[0].lastname;
      ////////////////////////////////////////////////////////////////////
      function loadaudittrailfiles() {
        document.getElementById("loghistoryprofilepicid").src =
          "/api/superadmin/audittrailfiles?myid=" +
          myobj[0].id +
          "&filename=" +
          myobj[0].picture;
        document.getElementById("activitylogprofilepicid").src =
          "/api/superadmin/audittrailfiles?myid=" +
          myobj[0].id +
          "&filename=" +
          myobj[0].picture;
      }
      setTimeout(loadaudittrailfiles, 100);
    }
  } catch (error) {
    alert("Opps Network Error!");
  }
}

function audittrailfunc(options) {
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

  async function defaultloghistory() {
    var text =
      "<tr>" +
      "<th><div>Time</div></th>" +
      "<th><div>Login Logout</div></th>" +
      "<th><div>User Type</div></th>" +
      "<th><div>IP Address</div></th>" +
      "<th><div>Year</div></th>" +
      "</tr>";
    document.getElementById("loghistory").innerHTML = text;
  }
  async function defaultactivitylog() {
    var text =
      "<tr>" +
      "<th><div>Time</div></th>" +
      "<th><div>Activities</div></th>" +
      "<th><div>User Type</div></th>" +
      "<th><div>Year</div></th>" +
      "</tr>";
    document.getElementById("activitylog").innerHTML = text;
  }
  ///////////////////// log history /////////////////////////
  async function displaysuperadminloghistory() {
    try {
      let response = await fetch(
        "/api/superadmin/audittrail/displaysuperadminloghistory",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      var myresult = myobj;
      if (myresult[0].id != "invalid") {
        var text =
          "<tr>" +
          "<th><div>Time</div></th>" +
          "<th><div>Login Logout</div></th>" +
          "<th><div>User Type</div></th>" +
          "<th><div>IP Address</div></th>" +
          "<th><div>Year</div></th>" +
          "</tr>";
        for (var x in myresult) {
          text +=
            "<tr " +
            'onclick="displayspecificloghistory(' +
            "'" +
            myresult[x].id +
            "'" +
            ')"' +
            "><td><div>" +
            myresult[x].time +
            "</div></td><td><div>" +
            myresult[x].loginout +
            "</div></td><td><div>" +
            myresult[x].usertype +
            "</div></td><td><div>" +
            myresult[x].ip_address +
            "</div></td><td><div>" +
            myresult[x].year +
            "</div></td></tr>";
        }
        document.getElementById("loghistory").innerHTML = text;
      } else {
        defaultloghistory();
      }
    } catch (error) {
      alert("error");
    }
  }

  async function displayadminloghistory() {
    try {
      let response = await fetch(
        "/api/superadmin/audittrail/displayadminloghistory",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      var myresult = myobj;
      if (myresult[0].id != "invalid") {
        var text =
          "<tr>" +
          "<th><div>Time</div></th>" +
          "<th><div>Login Logout</div></th>" +
          "<th><div>User Type</div></th>" +
          "<th><div>IP Address</div></th>" +
          "<th><div>Year</div></th>" +
          "</tr>";
        for (var x in myresult) {
          text +=
            "<tr " +
            'onclick="displayspecificloghistory(' +
            "'" +
            myresult[x].id +
            "'" +
            ')"' +
            "><td><div>" +
            myresult[x].time +
            "</div></td><td><div>" +
            myresult[x].loginout +
            "</div></td><td><div>" +
            myresult[x].usertype +
            "</div></td><td><div>" +
            myresult[x].ip_address +
            "</div></td><td><div>" +
            myresult[x].year +
            "</div></td></tr>";
        }
        document.getElementById("loghistory").innerHTML = text;
      } else {
        defaultloghistory();
      }
    } catch (error) {
      alert("error");
    }
  }

  async function displaystaffloghistory() {
    try {
      let response = await fetch(
        "/api/superadmin/audittrail/displaystaffloghistory",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      var myresult = myobj;
      if (myresult[0].id != "invalid") {
        var text =
          "<tr>" +
          "<th><div>Time</div></th>" +
          "<th><div>Login Logout</div></th>" +
          "<th><div>Position</div></th>" +
          "<th><div>IP Address</div></th>" +
          "<th><div>Year</div></th>" +
          "</tr>";
        for (var x in myresult) {
          text +=
            "<tr " +
            'onclick="displayspecificloghistory(' +
            "'" +
            myresult[x].id +
            "'" +
            ')"' +
            "><td><div>" +
            myresult[x].time +
            "</div></td><td><div>" +
            myresult[x].loginout +
            "</div></td><td><div>" +
            myresult[x].position +
            "</div></td><td><div>" +
            myresult[x].ip_address +
            "</div></td><td><div>" +
            myresult[x].year +
            "</div></td></tr>";
        }
        document.getElementById("loghistory").innerHTML = text;
      } else {
        defaultloghistory();
      }
    } catch (error) {
      alert("error");
    }
  }
  ///////////////////////////////////////////////////////////////
  ////////////////////////// activity log ///////////////////////
  async function displaysuperadminactivitylog() {
    try {
      let response = await fetch(
        "/api/superadmin/audittrail/displaysuperadminactivitylog",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      var myresult = myobj;
      if (myresult[0].id != "invalid") {
        var text =
          "<tr>" +
          "<th><div>Time</div></th>" +
          "<th><div>Activities</div></th>" +
          "<th><div>User Type</div></th>" +
          "<th><div>Year</div></th>" +
          "</tr>";
        for (var x in myresult) {
          text +=
            "<tr " +
            'onclick="displayspecificloghistory(' +
            "'" +
            myresult[x].id +
            "'" +
            ')"' +
            "><td><div>" +
            myresult[x].time +
            "</div></td><td><div>" +
            myresult[x].activities +
            "</div></td><td><div>" +
            myresult[x].usertype +
            "</div></td><td><div>" +
            myresult[x].year +
            "</div></td></tr>";
        }
        document.getElementById("activitylog").innerHTML = text;
      } else {
        defaultactivitylog();
      }
      errortimeout = 0;
    } catch (error) {
      errortimeout += 1;
      if (errortimeout >= 5) {
        alert("error");
      } else {
        setTimeout(displaysuperadminactivitylog, 1000);
      }
    }
  }

  async function displayadminactivitylog() {
    try {
      let response = await fetch(
        "/api/superadmin/audittrail/displayadminactivitylog",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      var myresult = myobj;
      if (myresult[0].id != "invalid") {
        var text =
          "<tr>" +
          "<th><div>Time</div></th>" +
          "<th><div>Activities</div></th>" +
          "<th><div>User Type</div></th>" +
          "<th><div>Year</div></th>" +
          "</tr>";
        for (var x in myresult) {
          text +=
            "<tr " +
            'onclick="displayspecificloghistory(' +
            "'" +
            myresult[x].id +
            "'" +
            ')"' +
            "><td><div>" +
            myresult[x].time +
            "</div></td><td><div>" +
            myresult[x].activities +
            "</div></td><td><div>" +
            myresult[x].usertype +
            "</div></td><td><div>" +
            myresult[x].year +
            "</div></td></tr>";
        }
        document.getElementById("activitylog").innerHTML = text;
      } else {
        defaultactivitylog();
      }
    } catch (error) {
      alert("error");
    }
  }

  async function displaystaffactivitylog() {
    try {
      let response = await fetch(
        "/api/superadmin/audittrail/displaystaffactivitylog",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      var myresult = myobj;
      if (myresult[0].id != "invalid") {
        var text =
          "<tr>" +
          "<th><div>Time</div></th>" +
          "<th><div>Activities</div></th>" +
          "<th><div>Position</div></th>" +
          "<th><div>Year</div></th>" +
          "</tr>";
        for (var x in myresult) {
          text +=
            "<tr " +
            'onclick="displayspecificloghistory(' +
            "'" +
            myresult[x].id +
            "'" +
            ')"' +
            "><td><div>" +
            myresult[x].time +
            "</div></td><td><div>" +
            myresult[x].activities +
            "</div></td><td><div>" +
            myresult[x].position +
            "</div></td><td><div>" +
            myresult[x].year +
            "</div></td></tr>";
        }
        document.getElementById("activitylog").innerHTML = text;
      } else {
        defaultactivitylog();
      }
    } catch (error) {
      alert("error");
    }
  }
  ///////////////////////////////////////////////////////////////

  if (options == "checkuser") {
    checkuser();
  }
  if (options == "gotoprofile") {
    gotoprofile();
  }
  if (options == "logout") {
    logout();
  }
  if (options == "displaysuperadminloghistory") {
    displaysuperadminloghistory();
  }
  if (options == "displayadminloghistory") {
    displayadminloghistory();
  }
  if (options == "displaystaffloghistory") {
    displaystaffloghistory();
  }
  if (options == "defaultloghistory") {
    defaultloghistory();
  }

  if (options == "displaysuperadminactivitylog") {
    displaysuperadminactivitylog();
  }
  if (options == "displayadminactivitylog") {
    displayadminactivitylog();
  }
  if (options == "displaystaffactivitylog") {
    displaystaffactivitylog();
  }
  if (options == "defaultactivitylog") {
    defaultactivitylog();
  }
}
