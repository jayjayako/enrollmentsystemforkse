var studentsuperidglobalvar;
//// when table is clicked the information is also displayed on the student info modal /////
async function displayenrollmentreserveclickabletable(superid) {
  let response = await fetch(
    "/api/superadmin/registrar/enrollmentreservation/displayspecificinfo?superid=" +
      superid,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  if (myresult) {
    studentsuperidglobalvar = superid;
    editenrolleerecordsglobalstudentid = myresult[0].id;
    ////////////////// for displaying student picture /////////////
    if (myresult[0].picture == "../../img/defaultimg.png") {
      document.getElementById("enrollmentreservationpictureid").src =
        "../../img/defaultimg.png";
    } else {
      document.getElementById("enrollmentreservationpictureid").src =
        "/api/superadmin/accessfiles?studid=" +
        myresult[0].id +
        "&filemethod=view&filename=" +
        myresult[0].picture;
    }
    ///////////////////////////////////////////////////////////////
    ///////// for personal info ////////
    document.getElementById("enrollmentreservationnameid").value =
      myresult[0].lastname + " " + myresult[0].firstname;
    // document.getElementById("enrollmentreservationidid").innerHTML =
    //   myresult[0].id;
    document.getElementById("viewcontentid").innerHTML = myresult[0].message;
    ////////////////////////////////////
  }
}
/////////////////////////////////////////////////////////////////////////
function enrollmentreservationfunction(options) {
  async function loadtable() {
    document.getElementById("enrollmentreservationtableid").innerHTML = "";
    let response = await fetch(
      "/api/superadmin/registrar/enrollmentreservation/displaytable",
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    var text =
      "<tr><th><div>Last Name</div></th><th><div>First Name</div></th></tr>";
    if (myresult[0].id != "invalid") {
      for (var x in myresult) {
        text +=
          "<tr " +
          "onclick='" +
          'displayenrollmentreserveclickabletable("' +
          myresult[x].superid +
          '")' +
          "'" +
          "><td>" +
          myresult[x].lastname +
          "</td><td>" +
          myresult[x].firstname +
          "</td></tr>";
      }

      document.getElementById("enrollmentreservationtableid").innerHTML = text;
    } else {
      document.getElementById("enrollmentreservationtableid").innerHTML = text;
    }
  }

  ///////////////////////////// approve reserve ///////////////////////////
  async function approvereserve() {
    let response = await fetch(
      "/api/superadmin/registrar/enrollmentreservation/approve?superid=" +
        studentsuperidglobalvar,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id == "success") {
      alert("approve successfuly");
      enrollmentreservationfunction("loadtable");
      //sendrealtimemessage("reloadactivitylog");
      //sendrealtimemessage("reloadmobilenotifications");
    } else {
      alert("Invalid");
    }
  }
  /////////////////////////////////////////////////////////////////////////

  ///////////////////////////// delete reserve ////////////////////////////
  async function deletereserve() {
    let response = await fetch(
      "/api/superadmin/registrar/enrollmentreservation/deletereserve?superid=" +
        studentsuperidglobalvar,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id == "success") {
      alert("deleted successfuly");
      enrollmentreservationfunction("loadtable");
      //sendrealtimemessage("reloadactivitylog");
      //sendrealtimemessage("reloadmobilenotifications");
    } else {
      alert("Invalid");
    }
  }
  /////////////////////////////////////////////////////////////////////////
  if (options == "deletereserve") {
    deletereserve();
  }
  if (options == "loadtable") {
    loadtable();
  }
  if (options == "approvereserve") {
    approvereserve();
  }
}
