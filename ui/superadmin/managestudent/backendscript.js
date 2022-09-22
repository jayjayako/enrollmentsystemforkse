var managestudentsuperid;
async function displayclickabletablerestorestudent(superid) {
  managestudentsuperid = superid;
  let response = await fetch(
    "/api/superadmin/managestudent/displayspecificdata?superid=" + superid,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  document.getElementById("managestudentidnumrestorenow").value =
    myresult[0].specificdata[0].id;
  document.getElementById("managestudentfirstnamerestorenow").value =
    myresult[0].specificdata[0].firstname;
  document.getElementById("managestudentlastanmerestorenow").value =
    myresult[0].specificdata[0].lastname;
  document.getElementById("managestudentschoollevelrestorenow").value =
    myresult[0].specificdata[0].schoollevelcol;
  document.getElementById("managestudentyearlevelrestorenow").value =
    myresult[0].specificdata[0].yearlevelcol;
  document.getElementById("managestudentsectionrestorenow").value =
    myresult[0].specificdata[0].sectioncol;

  document.getElementById("managestudentpictureidrestorenow").src =
    "/api/superadmin/accessfiles?studid=" +
    myresult[0].specificdata[0].id +
    "&filemethod=view&filename=" +
    myresult[0].specificdata[0].picture;
}
async function displayclickabletablemanagestudent(superid) {
  managestudentsuperid = superid;
  let response = await fetch(
    "/api/superadmin/managestudent/displayspecificdata?superid=" + superid,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  document.getElementById("managestudentidnum").value =
    myresult[0].specificdata[0].id;
  document.getElementById("managestudentfirstname").value =
    myresult[0].specificdata[0].firstname;
  document.getElementById("managestudentlastanme").value =
    myresult[0].specificdata[0].lastname;
  document.getElementById("managestudentschoollevel").value =
    myresult[0].specificdata[0].schoollevelcol;
  document.getElementById("managestudentyearlevel").value =
    myresult[0].specificdata[0].yearlevelcol;
  document.getElementById("managestudentsection").value =
    myresult[0].specificdata[0].sectioncol;
  ///////////////////// personal info //////////////////////
  document.getElementById("modal-studentinfo-lastname").innerHTML =
    myresult[0].specificdata[0].lastname;
  document.getElementById("modal-studentinfo-firstname").innerHTML =
    myresult[0].specificdata[0].firstname;
  document.getElementById("modal-studentinfo-birthdate").innerHTML =
    myresult[0].personalinfo[0].birthdate;
  document.getElementById("modal-studentinfo-gender").innerHTML =
    myresult[0].personalinfo[0].gender;
  document.getElementById("modal-studentinfo-address").innerHTML =
    myresult[0].personalinfo[0].address;
  document.getElementById("modal-studentinfo-contact").innerHTML =
    myresult[0].personalinfo[0].contact_no;
  document.getElementById("modal-studentinfo-mothersname").innerHTML =
    myresult[0].personalinfo[0].mothers_name;
  document.getElementById("modal-studentinfo-fathersname").innerHTML =
    myresult[0].personalinfo[0].fathers_name;
  document.getElementById("modal-studentinfo-moccupation").innerHTML =
    myresult[0].personalinfo[0].mothers_occupation;
  document.getElementById("modal-studentinfo-foccupation").innerHTML =
    myresult[0].personalinfo[0].fathers_occupation;
  document.getElementById("modal-studentinfo-mcontact").innerHTML =
    myresult[0].personalinfo[0].mothers_contact_no;
  document.getElementById("modal-studentinfo-fcontact").innerHTML =
    myresult[0].personalinfo[0].fathers_contact_no;
  document.getElementById("modal-studentinfo-guardiansname").innerHTML =
    myresult[0].personalinfo[0].guardians_name;
  document.getElementById("modal-studentinfo-relguardian").innerHTML =
    myresult[0].personalinfo[0].relationship_to_guardian;
  document.getElementById("modal-studentinfo-guardiancontact").innerHTML =
    myresult[0].personalinfo[0].guardians_contact_no;
  document.getElementById("modal-studentinfo-guardianaddress").innerHTML =
    myresult[0].personalinfo[0].guardians_address;
  //////////////////////////////////////////////////////////

  document.getElementById("managestudentpictureid").src =
    "/api/superadmin/accessfiles?studid=" +
    myresult[0].specificdata[0].id +
    "&filemethod=view&filename=" +
    myresult[0].specificdata[0].picture;
}

function managestudentfunc(options) {
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
        managestudentfunc("getschoollevel");
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

  async function getschoollevel() {
    try {
      let response = await fetch(
        "/api/superadmin/managestudent/displayschoollevel",
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
        displaytable();
      }
    } catch (error) {
      alert(error);
    }
  }

  async function displaytable() {
    var text =
      "<tr><th><div>School Level</div></th><th><div>Year Level</div></th><th><div>Section</div></th><th><div>Lastname</div></th><th><div>Firstname</div></th></tr>";
    document.getElementById("managestudenttableid").innerHTML = "";
    var schoollevel = document.getElementById("schoollevelid").value;
    let response = await fetch(
      "/api/superadmin/managestudent/displaytable?schoollevel=" + schoollevel,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      for (var x in myresult) {
        text +=
          '<tr onclick="' +
          "displayclickabletablemanagestudent('" +
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
      document.getElementById("managestudenttableid").innerHTML = text;
    } else {
      document.getElementById("managestudenttableid").innerHTML = text;
    }
  }

  async function deletestudent() {
    let response = await fetch(
      "/api/superadmin/managestudent/deletestudent?superid=" +
        managestudentsuperid,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      alert("student deleted succesfully");
      //displaydeactivatedstudent();
      displaytable();
    } else {
      alert("Invalid");
    }
  }

  async function displaydeactivatedstudent() {
    var text =
      "<tr><th><div>School Level</div></th><th><div>Year Level</div></th><th><div>Section</div></th><th><div>Lastname</div></th><th><div>Firstname</div></th></tr>";
    document.getElementById("managestudentrestoretableid").innerHTML = text;
    let response = await fetch(
      "/api/superadmin/managestudent/displaydeactstudent",
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      for (var x in myresult) {
        text +=
          '<tr onclick="' +
          "displayclickabletablerestorestudent('" +
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
      document.getElementById("managestudentrestoretableid").innerHTML = text;
    } else {
      document.getElementById("managestudentrestoretableid").innerHTML = text;
    }
  }

  async function restorenow() {
    let response = await fetch(
      "/api/superadmin/managestudent/restorestudent?superid=" +
        managestudentsuperid,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      alert("student restored succesfully");
      displaydeactivatedstudent();
      displaytable();
    } else {
      alert("Invalid");
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
  if (options == "getschoollevel") {
    getschoollevel();
  }
  if (options == "displaytable") {
    displaytable();
  }
  if (options == "displaydeactivatedstudent") {
    displaydeactivatedstudent();
  }
  if (options == "deletestudent") {
    deletestudent();
  }
  if (options == "restorenow") {
    restorenow();
  }
}
