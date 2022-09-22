var errortimeout = 0;
var adminidglobalvar;
var addnewstaffglobalvar,
  managestaffglobalvar,
  managestudentglobalvar,
  audittrailglobalvar,
  viewreportglobalvar;
function dashboardfunct(options) {
  var myresult;
  var myprofilepic;

  function admindashboardmodule() {
    try {
      if (addnewstaffglobalvar == "invalid") {
        document.getElementById("addnewstaffsidenavid").style.display = "none";
      }
      if (managestaffglobalvar == "invalid") {
        document.getElementById("managestaffsidenavid").style.display = "none";
      }
      if (managestudentglobalvar == "invalid") {
        document.getElementById("managestudentsidenavid").style.display =
          "none";
      }
      if (audittrailglobalvar == "invalid") {
        document.getElementById("audittrailsidenavid").style.display = "none";
      }
      if (viewreportglobalvar == "invalid") {
        document.getElementById("viewreportsidenavid").style.display = "none";
      }
    } catch (error) {
      console.log("loading modules....");
      setTimeout(admindashboardmodule, 1000);
    }
  }

  async function checkuser() {
    try {
      let response = await fetch("/api/admin/dashboard/getaccount", {
        method: "GET",
      });
      let myobj = await response.json();
      myresult = myobj[0].id;
      if (myresult != "invalid") {
        var name = myobj[0].name;
        // document.getElementById("wholenameid").innerHTML =
        //   name[0].lastname + " " + name[0].firstname;
        document.getElementById("greetingid").innerHTML =
          "<b>Hello,&nbsp;&nbsp;</b>" +
          name[0].firstname +
          " " +
          name[0].lastname;
        if (myobj[0].picture) {
          document.getElementById("profilepicid").src =
            "/api/admin/myfiles/" + myobj[0].picture[0].picture;
        } else {
          document.getElementById("profilepicid").src =
            "../../img/defaultimg.png";
        }
        adminidglobalvar = myobj[0].name[0].id;
        addnewstaffglobalvar = myobj[0].adminmodule[0].add_new_staff;
        managestaffglobalvar = myobj[0].adminmodule[0].manage_staff;
        managestudentglobalvar = myobj[0].adminmodule[0].manage_student;
        audittrailglobalvar = myobj[0].adminmodule[0].audit_trail;
        viewreportglobalvar = myobj[0].adminmodule[0].view_report;
        admindashboardmodule();
        dashboardfunct("activitylogadmin");
        document.getElementById("dashboarduserpositionid").value = "Staff";
        dashboardfunct("changeposition");
      } else {
        location.replace("../../loginpage");
      }
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

  async function activitylogadmin() {
    try {
      let response = await fetch(
        "/api/admin/dashboard/displayadminactivitylog?id=" + adminidglobalvar,
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
        defaultactivitylog();
      }
    } catch (error) {
      alert("error");
    }
  }

  async function changeposition() {
    var userposition = document.getElementById("dashboarduserpositionid").value;
    if (userposition == "Staff") {
      document.getElementById("userstatsid").innerHTML =
        '<div class="fullwidth flexbox userstats">' +
        '<div class="fullwidth flexcontent">' +
        '<div class="dashboardcircle flexbox" id="registrarid">0</div>' +
        '<div class="admindashboardposition">Registrar</div>' +
        "</div>" +
        "</div>" +
        '<div class="fullwidth flexbox userstats">' +
        '<div class="fullwidth flexcontent">' +
        '<div class="dashboardcircle flexbox" id="accountingid">0</div>' +
        '<div class="admindashboardposition">Accounting</div>' +
        "</div>" +
        "</div>" +
        '<div class="fullwidth flexbox userstats">' +
        '<div class="fullwidth flexcontent">' +
        '<div class="dashboardcircle flexbox" id="cashierid">0</div>' +
        '<div class="admindashboardposition">Cashier</div>' +
        "</div>" +
        "</div>" +
        '<div class="fullwidth flexbox userstats">' +
        '<div class="fullwidth flexcontent">' +
        '<div class="dashboardcircle flexbox" id="admindeptid">0</div>' +
        '<div class="admindashboardposition">Admin Department</div>' +
        "</div>" +
        "</div>";
      dashboardfunct("loadstaffstats");
    }
    if (userposition == "Student") {
      document.getElementById("userstatsid").innerHTML =
        '<div class="fullwidth flexbox userstats">' +
        '<div class="fullwidth flexcontent">' +
        "<select " +
        'class="dropdowndes2 admindashboarddropdown"' +
        'id="schoollevelid" ' +
        'onchange="dashboardfunct(' +
        "'" +
        "loadnumberofenrolledperschoolevel" +
        "'" +
        ')"' +
        ">" +
        "</select>" +
        '<div class="dashboardcircle flexbox" id="numberofenrolledperschoolevelid">0</div>' +
        '<div class="admindashboardposition"><br>Number of Enrolled<br> Students Per School<br> Level</div>' +
        "</div>" +
        "</div>" +
        '<div class="fullwidth flexbox userstats">' +
        '<div class="fullwidth flexcontent">' +
        "<select " +
        'class="dropdowndes2 admindashboarddropdown"' +
        'id="yearlevelid" ' +
        'onchange="dashboardfunct(' +
        "'" +
        "loadnumberofenrolledperyearlevel" +
        "'" +
        ')"' +
        ">" +
        "</select>" +
        '<div class="dashboardcircle flexbox" id="numberofenrolledperyearlevelid">0</div>' +
        '<div class="admindashboardposition"><br>Number of Enrolled<br> Students Per Year<br> Level</div>' +
        "</div>" +
        "</div>" +
        '<div class="fullwidth flexbox userstats">' +
        '<div class="fullwidth flexcontent">' +
        "<select " +
        'class="dropdowndes2 admindashboarddropdown"' +
        'id="sectionid" ' +
        'onchange="dashboardfunct(' +
        "'" +
        "loadnumberofenrolledpersection" +
        "'" +
        ')"' +
        ">" +
        "</select>" +
        '<div class="dashboardcircle flexbox" id="numberofenrolledpersectionid">0</div>' +
        '<div class="admindashboardposition">Number of Enrolled<br> Students Per Section</div>' +
        "</div>" +
        "</div>" +
        '<div class="fullwidth flexbox userstats">' +
        '<div class="fullwidth flexcontent">' +
        "<select " +
        'class="dropdowndes2 admindashboarddropdown"' +
        'id="sectionid2" ' +
        'onchange="dashboardfunct(' +
        "'" +
        "loadnumberofsection" +
        "'" +
        ')"' +
        ">" +
        "</select>" +
        '<div class="dashboardcircle flexbox" id="numberofsectionid">0</div>' +
        '<div class="admindashboardposition">Number of Section</div>' +
        "</div>" +
        "</div>";
      dashboardfunct("loadschoolevel");
    }
  }

  async function loadschoolevel() {
    try {
      //////// get school level data /////
      let response1 = await fetch("/api/admin/dashboard/getstats", {
        method: "GET",
      });
      let myresult1 = await response1.json();
      var text = "";
      if (
        myresult1[0].id == "valid" &&
        myresult1[0].schoollevelstats[0].schoollevel != "none"
      ) {
        for (var x in myresult1[0].schoollevelstats[0].schoollevel) {
          text +=
            "<option>" +
            myresult1[0].schoollevelstats[0].schoollevel[x].schoollevelcol +
            "</option>";
        }
        document.getElementById("schoollevelid").innerHTML = text;
        dashboardfunct("loadnumberofenrolledperschoolevel");
      } else {
        document.getElementById("schoollevelid").innerHTML =
          "<option>none</option>";
        dashboardfunct("loadyearlevel");
      }
      /////////////////////////////
    } catch (error) {
      alert("error loading...");
      alert(error);
    }
  }

  async function loadnumberofenrolledperschoolevel() {
    try {
      //////// get school level data /////
      var schoollevel = document.getElementById("schoollevelid").value;
      let response1 = await fetch(
        "/api/admin/dashboard/getstats?schoollevel=" + schoollevel,
        {
          method: "GET",
        }
      );
      let myresult1 = await response1.json();
      if (
        myresult1[0].id == "valid" &&
        myresult1[0].schoollevelstats[0].totalschoollevelenrolled
      ) {
        document.getElementById("numberofenrolledperschoolevelid").innerHTML =
          myresult1[0].schoollevelstats[0].totalschoollevelenrolled[0].totalschoollevelenrolled;
        dashboardfunct("loadyearlevel");
      } else {
        document.getElementById("numberofenrolledperschoolevelid").innerHTML =
          "0";
        dashboardfunct("loadyearlevel");
      }
      /////////////////////////////
    } catch (error) {
      alert("error loading...");
      alert(error);
    }
  }

  async function loadyearlevel() {
    try {
      //////// get school level data /////
      var schoollevel = document.getElementById("schoollevelid").value;
      let response1 = await fetch(
        "/api/admin/dashboard/getstats?schoollevel=" + schoollevel,
        {
          method: "GET",
        }
      );
      let myresult1 = await response1.json();
      if (
        myresult1[0].id == "valid" &&
        myresult1[0].yearlevelstats[0].yearlevel != "none"
      ) {
        var text = "";
        for (var x in myresult1[0].yearlevelstats[0].yearlevel) {
          text +=
            "<option>" +
            myresult1[0].yearlevelstats[0].yearlevel[x].yearlevelcol +
            "</option>";
        }
        document.getElementById("yearlevelid").innerHTML = text;
        dashboardfunct("loadnumberofenrolledperyearlevel");
      } else {
        document.getElementById("yearlevelid").innerHTML =
          "<option>none</option>";
        dashboardfunct("loadsection");
      }
      /////////////////////////////
    } catch (error) {
      alert("error loading...");
      alert(error);
    }
  }

  async function loadnumberofenrolledperyearlevel() {
    try {
      //////// get year level data /////
      var schoollevel = document.getElementById("schoollevelid").value;
      var yearlevel = document.getElementById("yearlevelid").value;
      let response1 = await fetch(
        "/api/admin/dashboard/getstats?schoollevel=" +
          schoollevel +
          "&yearlevel=" +
          yearlevel,
        {
          method: "GET",
        }
      );
      let myresult1 = await response1.json();
      if (
        myresult1[0].id == "valid" &&
        myresult1[0].yearlevelstats[0].totalyearlevelenrolled
      ) {
        document.getElementById("numberofenrolledperyearlevelid").innerHTML =
          myresult1[0].yearlevelstats[0].totalyearlevelenrolled[0].totalyearlevelenrolled;
        dashboardfunct("loadsection");
      } else {
        document.getElementById("numberofenrolledperyearlevelid").innerHTML =
          "0";
        dashboardfunct("loadsection");
      }
      /////////////////////////////
    } catch (error) {
      alert("error loading...");
      alert(error);
    }
  }

  async function loadsection() {
    try {
      //////// get school level data /////
      var schoollevel = document.getElementById("schoollevelid").value;
      var yearlevel = document.getElementById("yearlevelid").value;
      let response1 = await fetch(
        "/api/admin/dashboard/getstats?schoollevel=" +
          schoollevel +
          "&yearlevel=" +
          yearlevel,
        {
          method: "GET",
        }
      );
      let myresult1 = await response1.json();
      if (
        myresult1[0].id == "valid" &&
        myresult1[0].sectionstats[0].section != "none"
      ) {
        var text = "";
        for (var x in myresult1[0].sectionstats[0].section) {
          text +=
            "<option>" +
            myresult1[0].sectionstats[0].section[x].sectioncol +
            "</option>";
        }
        document.getElementById("sectionid").innerHTML = text;
        document.getElementById("sectionid2").innerHTML = text;
        dashboardfunct("loadnumberofenrolledpersection");
      } else {
        document.getElementById("sectionid").innerHTML =
          "<option>none</option>";
        document.getElementById("sectionid2").innerHTML =
          "<option>none</option>";
        dashboardfunct("loadnumberofenrolledpersection");
      }
      /////////////////////////////
    } catch (error) {
      alert("error loading...");
      alert(error);
    }
  }

  async function loadnumberofenrolledpersection() {
    try {
      //////// get section data /////
      var schoollevel = document.getElementById("schoollevelid").value;
      var yearlevel = document.getElementById("yearlevelid").value;
      var section = document.getElementById("sectionid").value;
      let response1 = await fetch(
        "/api/admin/dashboard/getstats?schoollevel=" +
          schoollevel +
          "&yearlevel=" +
          yearlevel +
          "&section=" +
          section,
        {
          method: "GET",
        }
      );
      let myresult1 = await response1.json();
      if (
        myresult1[0].id == "valid" &&
        myresult1[0].sectionstats[0].totalsectionenrolled
      ) {
        document.getElementById("numberofenrolledpersectionid").innerHTML =
          myresult1[0].sectionstats[0].totalsectionenrolled[0].totalsectionenrolled;
      } else {
        document.getElementById("numberofenrolledpersectionid").innerHTML = "0";
      }
      dashboardfunct("loadnumberofsection");
      /////////////////////////////
    } catch (error) {
      alert("error loading...");
      alert(error);
    }
  }

  async function loadnumberofsection() {
    try {
      //////// get number of section data /////
      let response1 = await fetch("/api/admin/dashboard/getstats", {
        method: "GET",
      });
      let myresult1 = await response1.json();
      if (
        myresult1[0].id == "valid" &&
        myresult1[0].numsection[0].totalsectionnum
      ) {
        document.getElementById("numberofsectionid").innerHTML =
          myresult1[0].numsection[0].totalsectionnum[0].totalsectionnum;
      } else {
        document.getElementById("numberofsectionid").innerHTML = "0";
      }
      /////////////////////////////
    } catch (error) {
      alert("error loading...");
      alert(error);
    }
  }

  async function loadstaffstats() {
    try {
      //////// get number of section data /////
      let response1 = await fetch("/api/admin/dashboard/getstaffstats", {
        method: "GET",
      });
      let myresult1 = await response1.json();
      if (myresult1[0].id == "valid") {
        document.getElementById("registrarid").innerHTML =
          myresult1[0].registrarstats;
        document.getElementById("accountingid").innerHTML =
          myresult1[0].accountingstats;
        document.getElementById("cashierid").innerHTML =
          myresult1[0].cashierstats;
        document.getElementById("admindeptid").innerHTML =
          myresult1[0].admindeptstats;
      }
      /////////////////////////////
    } catch (error) {
      alert("error loading...");
      alert(error);
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
  if (options == "activitylogadmin") {
    activitylogadmin();
  }
  if (options == "changeposition") {
    changeposition();
  }
  if (options == "loadschoolevel") {
    loadschoolevel();
  }
  if (options == "loadnumberofenrolledperschoolevel") {
    loadnumberofenrolledperschoolevel();
  }
  if (options == "loadyearlevel") {
    loadyearlevel();
  }
  if (options == "loadnumberofenrolledperyearlevel") {
    loadnumberofenrolledperyearlevel();
  }
  if (options == "loadsection") {
    loadsection();
  }
  if (options == "loadnumberofenrolledpersection") {
    loadnumberofenrolledpersection();
  }
  if (options == "loadnumberofsection") {
    loadnumberofsection();
  }
  if (options == "loadstaffstats") {
    loadstaffstats();
  }
}
