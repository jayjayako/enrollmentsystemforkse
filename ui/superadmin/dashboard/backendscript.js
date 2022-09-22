var errortimeout = 0;
function dashboardfunct(options) {
  var myresult;
  var myprofilepic;

  async function loadnotif() {
    document.getElementById("notifid").innerHTML = "1";
    //document.getElementById("notifid").style.display = "none";
  }

  async function checkuser() {
    try {
      let response = await fetch("/api/superadmin/dashboard/getaccount", {
        method: "GET",
      });
      let myobj = await response.json();
      myresult = myobj[0].id;
      if (myresult != "invalid") {
        var name = myobj[0].name;
        document.getElementById("wholenameid").innerHTML =
          name[0].lastname + " " + name[0].firstname;
        if (myobj[0].picture) {
          document.getElementById("profilepicid").src =
            "/api/superadmin/myfiles/" + myobj[0].picture[0].picture;
        } else {
          document.getElementById("profilepicid").src =
            "../../img/defaultimg.png";
        }
        dashboardfunct("loadactivitylog");
        dashboardfunct("loadschoolevel");
        loadnotif();
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

  async function loadactivitylog() {
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
      errortimeout = 0;
    } catch (error) {
      if (errortimeout >= 5) {
        alert("error");
      } else {
        setTimeout(loadactivitylog, 1000);
      }
    }
  }

  async function loadschoolevel() {
    try {
      //////// get school level data /////
      let response1 = await fetch("/api/superadmin/dashboard/getstats", {
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
      errortimeout = 0;
    } catch (error) {
      if (errortimeout >= 5) {
        alert("error");
      } else {
        setTimeout(loadschoolevel, 1000);
      }
    }
  }

  async function loadnumberofenrolledperschoolevel() {
    try {
      //////// get school level data /////
      var schoollevel = document.getElementById("schoollevelid").value;
      let response1 = await fetch(
        "/api/superadmin/dashboard/getstats?schoollevel=" + schoollevel,
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
      errortimeout = 0;
    } catch (error) {
      if (errortimeout >= 5) {
        alert("error loading...");
        alert(error);
      } else {
        setTimeout(loadnumberofenrolledperschoolevel, 1000);
      }
    }
  }

  async function loadyearlevel() {
    try {
      //////// get school level data /////
      var schoollevel = document.getElementById("schoollevelid").value;
      let response1 = await fetch(
        "/api/superadmin/dashboard/getstats?schoollevel=" + schoollevel,
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
      errortimeout = 0;
    } catch (error) {
      if (errortimeout >= 5) {
        alert("error loading...");
        alert(error);
      } else {
        setTimeout(loadyearlevel, 1000);
      }
    }
  }

  async function loadnumberofenrolledperyearlevel() {
    try {
      //////// get year level data /////
      var schoollevel = document.getElementById("schoollevelid").value;
      var yearlevel = document.getElementById("yearlevelid").value;
      let response1 = await fetch(
        "/api/superadmin/dashboard/getstats?schoollevel=" +
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
      errortimeout = 0;
    } catch (error) {
      if (errortimeout >= 5) {
        alert("error loading...");
        alert(error);
      } else {
        setTimeout(loadnumberofenrolledperyearlevel, 1000);
      }
    }
  }

  async function loadsection() {
    try {
      //////// get school level data /////
      var schoollevel = document.getElementById("schoollevelid").value;
      var yearlevel = document.getElementById("yearlevelid").value;
      let response1 = await fetch(
        "/api/superadmin/dashboard/getstats?schoollevel=" +
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
      errortimeout = 0;
    } catch (error) {
      if (errortimeout >= 5) {
        alert("error loading...");
        alert(error);
      } else {
        setTimeout(loadsection, 1000);
      }
    }
  }

  async function loadnumberofenrolledpersection() {
    try {
      //////// get section data /////
      var schoollevel = document.getElementById("schoollevelid").value;
      var yearlevel = document.getElementById("yearlevelid").value;
      var section = document.getElementById("sectionid").value;
      let response1 = await fetch(
        "/api/superadmin/dashboard/getstats?schoollevel=" +
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
      errortimeout = 0;
    } catch (error) {
      if (errortimeout >= 5) {
        alert("error loading...");
        alert(error);
      } else {
        setTimeout(loadnumberofenrolledpersection, 1000);
      }
    }
  }

  async function loadnumberofsection() {
    try {
      //////// get number of section data /////
      let response1 = await fetch("/api/superadmin/dashboard/getstats", {
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
      errortimeout = 0;
    } catch (error) {
      if (errortimeout >= 5) {
        alert("error loading...");
        alert(error);
      } else {
        setTimeout(loadnumberofsection, 1000);
      }
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
  if (options == "loadactivitylog") {
    loadactivitylog();
  }
  if (options == "defaultactivitylog") {
    defaultactivitylog();
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
}
