var admindeptsuperidglobalvar;
async function displaystudentpersonalinfo() {
  let response = await fetch(
    "/api/superadmin/admindepartment/displaystudentpersonalinfo?superid=" +
      admindeptsuperidglobalvar,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  document.getElementById("modal-studentinfo-lastname").innerHTML =
    myresult[0].lastname;
  document.getElementById("modal-studentinfo-firstname").innerHTML =
    myresult[0].firstname;
  document.getElementById("modal-studentinfo-birthdate").innerHTML =
    myresult[0].birthdate;
  document.getElementById("modal-studentinfo-gender").innerHTML =
    myresult[0].gender;
  document.getElementById("modal-studentinfo-address").innerHTML =
    myresult[0].address;
  document.getElementById("modal-studentinfo-contact").innerHTML =
    myresult[0].contact_no;
  document.getElementById("modal-studentinfo-mothersname").innerHTML =
    myresult[0].mothers_name;
  document.getElementById("modal-studentinfo-fathersname").innerHTML =
    myresult[0].fathers_name;
  document.getElementById("modal-studentinfo-moccupation").innerHTML =
    myresult[0].mothers_occupation;
  document.getElementById("modal-studentinfo-foccupation").innerHTML =
    myresult[0].fathers_occupation;
  document.getElementById("modal-studentinfo-mcontact").innerHTML =
    myresult[0].mothers_contact_no;
  document.getElementById("modal-studentinfo-fcontact").innerHTML =
    myresult[0].fathers_contact_no;
  document.getElementById("modal-studentinfo-guardiansname").innerHTML =
    myresult[0].guardians_name;
  document.getElementById("modal-studentinfo-relguardian").innerHTML =
    myresult[0].relationship_to_guardian;
  document.getElementById("modal-studentinfo-guardiancontact").innerHTML =
    myresult[0].guardians_contact_no;
  document.getElementById("modal-studentinfo-guardianaddress").innerHTML =
    myresult[0].guardians_address;
}
async function displayclickabletableadmindepartment(superid) {
  admindeptsuperidglobalvar = superid;
  let response = await fetch(
    "/api/superadmin/admindepartment/displayspecificdata?superid=" + superid,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  /////////////////////// not enrolled ///////////////////////
  document.getElementById("specificidnum").value = myresult[0].id;
  document.getElementById("specificschoollevelid").value =
    myresult[0].schoollevelcol;
  document.getElementById("specificyearlevelid").value =
    myresult[0].yearlevelcol;
  document.getElementById("specificsectionid").value = myresult[0].sectioncol;
  document.getElementById("specificfirstnameid").value = myresult[0].firstname;
  document.getElementById("specificlastnameid").value = myresult[0].lastname;

  document.getElementById("admindepartmentnotenrolledpictureid").src =
    "/api/superadmin/accessfiles?studid=" +
    myresult[0].id +
    "&filemethod=view&filename=" +
    myresult[0].picture;
  ////////////////////////////////////////////////////////////
  ///////////////////////// enrolled /////////////////////////
  document.getElementById("specificidnumenrolled").value = myresult[0].id;
  document.getElementById("specificschoollevelidenrolled").value =
    myresult[0].schoollevelcol;
  document.getElementById("specificyearlevelidenrolled").value =
    myresult[0].yearlevelcol;
  document.getElementById("specificsectionidenrolled").value =
    myresult[0].sectioncol;
  document.getElementById("specificfirstnameidenrolled").value =
    myresult[0].firstname;
  document.getElementById("specificlastnameidenrolled").value =
    myresult[0].lastname;

  document.getElementById("admindepartmentenrolledpictureid").src =
    "/api/superadmin/accessfiles?studid=" +
    myresult[0].id +
    "&filemethod=view&filename=" +
    myresult[0].picture;
  ////////////////////////////////////////////////////////////
  displaystudentpersonalinfo();
}

function admindepartmentfunc(options) {
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
        admindepartmentfunc("displayschoollevel");
        admindepartmentfunc("displayschoollevelenrolled");
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

  async function displayschoollevel() {
    try {
      let response = await fetch(
        "/api/superadmin/admindepartment/displayschoollevel",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      if (myobj) {
        var text = "";
        for (var x in myobj) {
          text += "<option>" + myobj[x].schoollevelcol + "</option>";
        }
        document.getElementById("schoollevelid").innerHTML = text;
        displayyearlevel();
      }
    } catch (error) {}
  }

  async function displayyearlevel() {
    try {
      var schoollevel = document.getElementById("schoollevelid").value;
      let response = await fetch(
        "/api/superadmin/admindepartment/displayyearlevel?schoollevel=" +
          schoollevel,
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      if (myobj) {
        var text = "";
        for (var x in myobj) {
          text += "<option>" + myobj[x].yearlevelcol + "</option>";
        }
        document.getElementById("yearlevelid").innerHTML = text;
        displaysection();
      }
    } catch (error) {}
  }

  async function displaysection() {
    try {
      var schoollevel = document.getElementById("schoollevelid").value;
      var yearlevel = document.getElementById("yearlevelid").value;
      let response = await fetch(
        "/api/superadmin/admindepartment/displaysection?schoollevel=" +
          schoollevel +
          "&yearlevel=" +
          yearlevel,
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      if (myobj) {
        var text = "";
        for (var x in myobj) {
          text += "<option>" + myobj[x].sectioncol + "</option>";
        }
        document.getElementById("sectionid").innerHTML = text;
        displaytable();
      }
    } catch (error) {}
  }

  async function displaytable() {
    document.getElementById("admindeptnotenrolledtableid").innerHTML = "";
    var schoollevel = document.getElementById("schoollevelid").value;
    var yearlevel = document.getElementById("yearlevelid").value;
    var section = document.getElementById("sectionid").value;

    let response = await fetch(
      "/api/superadmin/admindepartment/displaytable?schoollevel=" +
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
    var text =
      "<tr><th>School Level</th><th>YearLevel</th><th>Section</th><th>Lastname</th><th>Firstname</th></tr>";
    if (myresult[0].id != "invalid") {
      for (var x in myresult) {
        text +=
          '<tr onclick="' +
          "displayclickabletableadmindepartment('" +
          myresult[x].superid +
          "')" +
          '">' +
          "<td>" +
          myresult[x].schoollevelcol +
          "</td><td>" +
          myresult[x].yearlevelcol +
          "</td><td>" +
          myresult[x].sectioncol +
          "</td><td>" +
          myresult[x].lastname +
          "</td><td>" +
          myresult[x].firstname +
          "</td></tr>";
      }
      document.getElementById("admindeptnotenrolledtableid").innerHTML = text;
    } else {
      document.getElementById("admindeptnotenrolledtableid").innerHTML = text;
    }
  }

  /////////////////// enlist now ////////////////////////
  async function enlist() {
    let response = await fetch(
      "/api/superadmin/admindepartment/enlist?superid=" +
        admindeptsuperidglobalvar,
      {
        method: "POST",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id == "success") {
      alert("successfully enlisted");
      document.getElementById("admindeptnotenrolledtableid").innerHTML = "";
      admindepartmentfunction("displayschoollevel");
      sendrealtimemessage("reloadmobilenotifications");
    }
  }

  async function displayschoollevelenrolled() {
    try {
      let response = await fetch(
        "/api/superadmin/admindepartment/displayschoollevel",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      if (myobj) {
        var text = "";
        for (var x in myobj) {
          text += "<option>" + myobj[x].schoollevelcol + "</option>";
        }
        document.getElementById("schoollevelidenrolled").innerHTML = text;
        displayyearlevelenrolled();
      }
    } catch (error) {}
  }

  async function displayyearlevelenrolled() {
    try {
      var schoollevel = document.getElementById("schoollevelidenrolled").value;
      let response = await fetch(
        "/api/superadmin/admindepartment/displayyearlevel?schoollevel=" +
          schoollevel,
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      if (myobj) {
        var text = "";
        for (var x in myobj) {
          text += "<option>" + myobj[x].yearlevelcol + "</option>";
        }
        document.getElementById("yearlevelidenrolled").innerHTML = text;
        displaysectionenrolled();
      }
    } catch (error) {}
  }

  async function displaysectionenrolled() {
    try {
      var schoollevel = document.getElementById("schoollevelidenrolled").value;
      var yearlevel = document.getElementById("yearlevelidenrolled").value;
      let response = await fetch(
        "/api/superadmin/admindepartment/displaysection?schoollevel=" +
          schoollevel +
          "&yearlevel=" +
          yearlevel,
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      if (myobj) {
        var text = "";
        for (var x in myobj) {
          text += "<option>" + myobj[x].sectioncol + "</option>";
        }
        document.getElementById("sectionidenrolled").innerHTML = text;
        displaytableenrolled();
      }
    } catch (error) {}
  }

  async function displaytableenrolled() {
    document.getElementById("admindeptenrolledtableid").innerHTML = "";
    var schoollevel = document.getElementById("schoollevelidenrolled").value;
    var yearlevel = document.getElementById("yearlevelidenrolled").value;
    var section = document.getElementById("sectionidenrolled").value;

    let response = await fetch(
      "/api/superadmin/admindepartment/displayenrolledtable?schoollevel=" +
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
    var text =
      "<tr><th>School Level</th><th>YearLevel</th><th>Section</th><th>Lastname</th><th>Firstname</th></tr>";
    if (myresult[0].id != "invalid") {
      for (var x in myresult) {
        text +=
          '<tr onclick="' +
          "displayclickabletableadmindepartment('" +
          myresult[x].superid +
          "')" +
          '">' +
          "<td>" +
          myresult[x].schoollevelcol +
          "</td><td>" +
          myresult[x].yearlevelcol +
          "</td><td>" +
          myresult[x].sectioncol +
          "</td><td>" +
          myresult[x].lastname +
          "</td><td>" +
          myresult[x].firstname +
          "</td></tr>";
      }
      document.getElementById("admindeptenrolledtableid").innerHTML = text;
    } else {
      document.getElementById("admindeptenrolledtableid").innerHTML = text;
    }
  }
  ///////////////////////////////////////////////////////

  if (options == "checkuser") {
    checkuser();
  }
  if (options == "gotoprofile") {
    gotoprofile();
  }
  if (options == "logout") {
    logout();
  }
  ///////////// not enrolled ////////////
  if (options == "displayschoollevel") {
    displayschoollevel();
  }
  if (options == "displayyearlevel") {
    displayyearlevel();
  }
  if (options == "displaysection") {
    displaysection();
  }
  ///////////// enrolled ///////////////
  if (options == "displayschoollevelenrolled") {
    displayschoollevelenrolled();
  }
  if (options == "displayyearlevelenrolled") {
    displayyearlevelenrolled();
  }
  if (options == "displaysectionenrolled") {
    displaysectionenrolled();
  }
  //////////////////////////////////////
  if (options == "enlist") {
    enlist();
  }
}
