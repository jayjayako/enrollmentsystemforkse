var errcount = 0;
function viewreportfunc(options) {
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

  async function viewadminreport() {
    try {
      var text =
        "<tr><th><div>Lastname</div></th><th><div>Firstname</div></th><th><div>Email</div></th></tr>";
      //document.getElementById("adminviewreporttableid").innerHTML = text;
      let response = await fetch(
        "/api/superadmin/viewreport/displayadmintable",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult[0].id != "invalid") {
        for (var x in myresult) {
          text +=
            '<tr onclick="' +
            "displayclickabletableadminreport('" +
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
        document.getElementById("adminviewreporttableid").innerHTML = text;
      } else {
        document.getElementById("adminviewreporttableid").innerHTML = text;
      }
    } catch (error) {
      errcount += 1;
      if (errcount <= 5) {
        setTimeout(preload, 1000);
      } else {
        alert("Network error");
      }
    }
  }

  async function viewstaffposition() {
    //////// get staff position /////
    let response1 = await fetch("/api/superadmin/viewreport/displayposition", {
      method: "GET",
    });
    let myresult1 = await response1.json();
    if (myresult1) {
      var text = "";
      for (var x in myresult1) {
        text += "<option>" + myresult1[x].value + "</option>";
      }
      document.getElementById("viewreportstaffdropdown").innerHTML = text;
      viewstaffreport();
    }
    /////////////////////////////
  }

  async function viewstaffreport() {
    var text =
      "<tr><th><div>Lastname</div></th><th><div>Firstname</div></th><th><div>Email</div></th></tr>";
    document.getElementById("staffviewreporttableid").innerHTML = "";
    var position = document.getElementById("viewreportstaffdropdown").value;
    let response = await fetch(
      "/api/superadmin/viewreport/displaystafftable?position=" + position,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      for (var x in myresult) {
        text +=
          '<tr onclick="' +
          "displayclickabletablestaffreport('" +
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
      document.getElementById("staffviewreporttableid").innerHTML = text;
    } else {
      document.getElementById("staffviewreporttableid").innerHTML = text;
    }
  }

  async function getschoollevel() {
    //////// get school level data /////
    let response1 = await fetch(
      "/api/superadmin/viewreport/displayschoollevel",
      {
        method: "GET",
      }
    );
    let myresult1 = await response1.json();
    if (myresult1) {
      var text = "";
      for (var x in myresult1) {
        text += "<option>" + myresult1[x].schoollevelcol + "</option>";
      }
      document.getElementById("viewstudentreportschoollevelid").innerHTML =
        text;
      await viewreportfunc("getyearlevel");
    }
    /////////////////////////////
  }

  async function getyearlevel() {
    var schoollevel = document.getElementById(
      "viewstudentreportschoollevelid"
    ).value;

    //////// get year level data /////
    let response1 = await fetch(
      "/api/superadmin/viewreport/displayyearlevel?schoollevel=" + schoollevel,
      {
        method: "GET",
      }
    );
    let myresult1 = await response1.json();
    if (myresult1) {
      var text = "";
      for (var x in myresult1) {
        text += "<option>" + myresult1[x].yearlevelcol + "</option>";
      }
      document.getElementById("viewstudentreportyearlevelid").innerHTML = text;
      await viewreportfunc("getsection");
    }
    /////////////////////////////
  }

  async function getsection() {
    var schoollevel = document.getElementById(
      "viewstudentreportschoollevelid"
    ).value;
    var yearlevel = document.getElementById(
      "viewstudentreportyearlevelid"
    ).value;

    //////// get section data /////
    let response1 = await fetch(
      "/api/superadmin/viewreport/displaysection?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel,
      {
        method: "GET",
      }
    );
    let myresult1 = await response1.json();
    if (myresult1) {
      var text = "";
      for (var x in myresult1) {
        text += "<option>" + myresult1[x].sectioncol + "</option>";
      }
      document.getElementById("viewstudentreportsectionid").innerHTML = text;
      viewreportfunc("viewenrolledstudents");
    }
    /////////////////////////////
  }

  async function viewenrolledstudents() {
    try {
      var text =
        "<tr><th><div>Lastname</div></th><th><div>Firstname</div></th><th><div>Email</div></th></tr>";
      document.getElementById("viewenrolledstudentreporttableid").innerHTML =
        "";
      var schoollevel = document.getElementById(
        "viewstudentreportschoollevelid"
      ).value;
      var yearlevel = document.getElementById(
        "viewstudentreportyearlevelid"
      ).value;
      var section = document.getElementById("viewstudentreportsectionid").value;
      let response = await fetch(
        "/api/superadmin/viewreport/displayenrolledstudenttable?schoollevel=" +
          schoollevel +
          "&yearlevel=" +
          yearlevel +
          "&section=" +
          section,
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult[0].id != "invalid") {
        for (var x in myresult) {
          text +=
            "<tr><td>" +
            myresult[x].lastname +
            "</td><td>" +
            myresult[x].firstname +
            "</td><td>" +
            myresult[x].email +
            "</td></tr>";
        }
        document.getElementById("viewenrolledstudentreporttableid").innerHTML =
          text;
      } else {
        document.getElementById("viewenrolledstudentreporttableid").innerHTML =
          text;
      }
    } catch (error) {
      alert(error);
    }
  }

  async function viewstudentpayments() {
    try {
      var text =
        "<tr><th><div>Lastname</div></th><th><div>Firstname</div></th><th><div>Email</div></th><th><div>School Level</div></th><th><div>Year Level</div></th><th><div>Payment Type</div></th><th><div>Payment Method</div></th><th><div>Amount</div></th></tr>";
      document.getElementById("viewstudentpaymentstableid").innerHTML = "";
      let response = await fetch(
        "/api/superadmin/viewreport/displaystudentpayments",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult[0].id != "invalid") {
        for (var x in myresult) {
          text +=
            "<tr><td>" +
            myresult[x].lastname +
            "</td><td>" +
            myresult[x].firstname +
            "</td><td>" +
            myresult[x].email +
            "</td><td>" +
            myresult[x].schoollevelcol +
            "</td><td>" +
            myresult[x].yearlevelcol +
            "</td><td>" +
            myresult[x].paymenttypecol +
            "</td><td>" +
            myresult[x].paymentmethodcol +
            "</td><td>" +
            myresult[x].amount +
            "</td></tr>";
        }
        document.getElementById("viewstudentpaymentstableid").innerHTML = text;
      } else {
        document.getElementById("viewstudentpaymentstableid").innerHTML = text;
      }
    } catch (error) {
      alert(error);
    }
  }

  async function getactivitylogusertype() {
    try {
      let response = await fetch("/api/superadmin/viewreport/displayusertype", {
        method: "GET",
      });
      let myobj = await response.json();
      if (myobj) {
        var text = "";
        for (var x in myobj) {
          text += "<option>" + myobj[x].usertype + "</option>";
        }
        document.getElementById("activitylogusertypeid").innerHTML = text;
        getactivitylogstaffposition();
      }
    } catch (error) {
      alert(error);
    }
  }

  async function getloghistoryusertype() {
    try {
      let response = await fetch("/api/superadmin/viewreport/displayusertype", {
        method: "GET",
      });
      let myobj = await response.json();
      if (myobj) {
        var text = "";
        for (var x in myobj) {
          text += "<option>" + myobj[x].usertype + "</option>";
        }
        document.getElementById("loghistoryusertypeid").innerHTML = text;
        getloghistorystaffposition();
      }
    } catch (error) {
      alert(error);
    }
  }

  async function getactivitylogstaffposition() {
    try {
      var usertype = document.getElementById("activitylogusertypeid").value;
      let response = await fetch(
        "/api/superadmin/viewreport/displaystaffposition?usertype=" + usertype,
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
        document.getElementById("activitylogstaffpositionid").innerHTML = text;
        displayactivitylogstafftable();
      } else {
        document.getElementById("activitylogstaffpositionid").innerHTML = "";
        displayactivitylogadmintable();
      }
    } catch (error) {
      alert(error);
    }
  }

  async function getloghistorystaffposition() {
    try {
      var usertype = document.getElementById("loghistoryusertypeid").value;
      let response = await fetch(
        "/api/superadmin/viewreport/displaystaffposition?usertype=" + usertype,
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
        document.getElementById("loghistorystaffpositionid").innerHTML = text;
        displayloghistorystafftable();
      } else {
        document.getElementById("loghistorystaffpositionid").innerHTML = "";
        displayloghistoryadmintable();
      }
    } catch (error) {
      alert(error);
    }
  }

  async function displayactivitylogadmintable() {
    try {
      let response = await fetch(
        "/api/superadmin/viewreport/displayadminactivitylog",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      var myresult = myobj;
      var text =
        "<tr>" +
        "<th><div>Time</div></th>" +
        "<th><div>Activities</div></th>" +
        "<th><div>User Type</div></th>" +
        "<th><div>Year</div></th>" +
        "</tr>";
      if (myresult[0].id != "invalid") {
        for (var x in myresult) {
          text +=
            "<tr><td><div>" +
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
        document.getElementById("activitylog").innerHTML = text;
      }
    } catch (error) {
      alert("error");
    }
  }

  async function displayactivitylogstafftable() {
    try {
      var position = document.getElementById(
        "activitylogstaffpositionid"
      ).value;
      let response = await fetch(
        "/api/superadmin/viewreport/displaystaffactivitylog?position=" +
          position,
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      var myresult = myobj;
      var text =
        "<tr>" +
        "<th><div>Time</div></th>" +
        "<th><div>Activities</div></th>" +
        "<th><div>Position</div></th>" +
        "<th><div>Year</div></th>" +
        "</tr>";
      if (myresult[0].id != "invalid") {
        for (var x in myresult) {
          text +=
            "<tr><td><div>" +
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
        document.getElementById("activitylog").innerHTML = text;
      }
    } catch (error) {
      alert("error");
    }
  }

  async function displayloghistoryadmintable() {
    try {
      let response = await fetch(
        "/api/superadmin/viewreport/displayadminloghistory",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      var myresult = myobj;
      var text =
        "<tr>" +
        "<th><div>Time</div></th>" +
        "<th><div>Login Logout</div></th>" +
        "<th><div>User Type</div></th>" +
        "<th><div>IP Address</div></th>" +
        "<th><div>Year</div></th>" +
        "</tr>";
      if (myresult[0].id != "invalid") {
        for (var x in myresult) {
          text +=
            "<tr><td><div>" +
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
        document.getElementById("loghistory").innerHTML = text;
      }
    } catch (error) {
      alert("error");
    }
  }

  async function displayloghistorystafftable() {
    try {
      var position = document.getElementById("loghistorystaffpositionid").value;
      let response = await fetch(
        "/api/superadmin/viewreport/displaystaffloghistory?position=" +
          position,
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      var myresult = myobj;
      var text =
        "<tr>" +
        "<th><div>Time</div></th>" +
        "<th><div>Login Logout</div></th>" +
        "<th><div>Position</div></th>" +
        "<th><div>IP Address</div></th>" +
        "<th><div>Year</div></th>" +
        "</tr>";
      if (myresult[0].id != "invalid") {
        for (var x in myresult) {
          text +=
            "<tr><td><div>" +
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
        document.getElementById("loghistory").innerHTML = text;
      }
    } catch (error) {
      alert("error");
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
  if (options == "viewadminreport") {
    viewadminreport();
  }
  if (options == "viewstaffposition") {
    viewstaffposition();
  }
  if (options == "viewstaffreport") {
    viewstaffreport();
  }
  if (options == "getschoollevel") {
    getschoollevel();
  }
  if (options == "getyearlevel") {
    getyearlevel();
  }
  if (options == "getsection") {
    getsection();
  }
  if (options == "viewenrolledstudents") {
    viewenrolledstudents();
  }
  if (options == "viewstudentpayments") {
    viewstudentpayments();
  }
  if (options == "getactivitylogusertype") {
    getactivitylogusertype();
  }
  if (options == "getloghistoryusertype") {
    getloghistoryusertype();
  }
  if (options == "getactivitylogstaffposition") {
    getactivitylogstaffposition();
  }
  if (options == "getloghistorystaffposition") {
    getloghistorystaffposition();
  }
  if (options == "displayactivitylogstafftable") {
    displayactivitylogstafftable();
  }
  if (options == "displayloghistorystafftable") {
    displayloghistorystafftable();
  }
}
