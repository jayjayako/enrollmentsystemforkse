//////////////////// THIS IS FOR FOREIGNER STUDENT BACKEND /////////////////
var foreignerstudentglobalvar; // this is a global variable

async function editenrolleerecordsforeignerstudentdisplaystudentinfo(
  studentid
) {
  let response = await fetch(
    "/api/superadmin/registrar/admission/displayforeignerstudentfiles?studentid=" +
      studentid,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  if (myresult[0].id != "invalid") {
    var text =
      "<tr><th><div>File Type</div></th><th><div>File Name</div></th></tr>";
    for (var x in myresult) {
      text +=
        "<tr " +
        'onclick="clickablestudentfilestable(' +
        "'" +
        myresult[x].filename +
        "'" +
        ')"' +
        "><td>" +
        myresult[x].filetype +
        "</td><td>" +
        myresult[x].filename +
        "</td></tr>";
    }
    document.getElementById("foreignerstudentresult2").innerHTML = text;
  }

  let response2 = await fetch(
    "/api/superadmin/registrar/admission/displayspecificforeignerstudent?studentid=" +
      studentid,
    {
      method: "GET",
    }
  );
  let myresult2 = await response2.json();
  if (myresult2[0].id != "invalid") {
    foreignerstudentglobalvar = studentid;
    editenrolleerecordsglobalstudentid = studentid;
    ////////////////// for displaying student picture /////////////
    if (myresult2[0].picture == "../../img/defaultimg.png") {
      document.getElementById("foreignerstudentpictureid").src =
        "../../img/defaultimg.png";
    } else {
      document.getElementById("foreignerstudentpictureid").src =
        "/api/superadmin/accessfiles?studid=" +
        studentid +
        "&filemethod=view&filename=" +
        myresult2[0].picture;
    }
    ///////////////////////////////////////////////////////////////
    document.getElementById("foreignerstudentwholename").value =
      myresult2[0].lastname + " " + myresult2[0].firstname;
    document.getElementById("modal-studentinfo-lastname").innerHTML =
      myresult2[0].lastname;
    document.getElementById("modal-studentinfo-firstname").innerHTML =
      myresult2[0].firstname;
    document.getElementById("modal-studentinfo-birthdate").innerHTML =
      myresult2[0].birthdate;
    document.getElementById("modal-studentinfo-gender").innerHTML =
      myresult2[0].gender;
    document.getElementById("modal-studentinfo-address").innerHTML =
      myresult2[0].address;
    document.getElementById("modal-studentinfo-contact").innerHTML =
      myresult2[0].contact_no;
    document.getElementById("modal-studentinfo-mothersname").innerHTML =
      myresult2[0].mothers_name;
    document.getElementById("modal-studentinfo-fathersname").innerHTML =
      myresult2[0].fathers_name;
    document.getElementById("modal-studentinfo-moccupation").innerHTML =
      myresult2[0].mothers_occupation;
    document.getElementById("modal-studentinfo-foccupation").innerHTML =
      myresult2[0].fathers_occupation;
    document.getElementById("modal-studentinfo-mcontact").innerHTML =
      myresult2[0].mothers_contact_no;
    document.getElementById("modal-studentinfo-fcontact").innerHTML =
      myresult2[0].fathers_contact_no;
    document.getElementById("modal-studentinfo-guardiansname").innerHTML =
      myresult2[0].guardians_name;
    document.getElementById("modal-studentinfo-relguardian").innerHTML =
      myresult2[0].relationship_to_guardian;
    document.getElementById("modal-studentinfo-guardiancontact").innerHTML =
      myresult2[0].guardians_contact_no;
    document.getElementById("modal-studentinfo-guardianaddress").innerHTML =
      myresult2[0].guardians_address;
  }
}
function editenrolleerecordsforeignerstudent(options) {
  /////////////////////// this is for displaying new student ////////////////////////
  async function displaystudenttable() {
    let response = await fetch(
      "/api/superadmin/registrar/admission/displayforeignerstudent",
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    var text =
      "<tr><th><div>Last Name</div></th><th><div>First Name</div></th></tr>";
    var text2 =
      "<tr><th><div>File Type</div></th><th><div>File Name</div></th></tr>";
    if (myresult[0].id != "invalid") {
      for (var x in myresult) {
        text +=
          "<tr onclick=" +
          '"' +
          "editenrolleerecordsforeignerstudentdisplaystudentinfo('" +
          myresult[x].id +
          "')" +
          '"' +
          "><td>" +
          myresult[x].lastname +
          "</td><td>" +
          myresult[x].firstname +
          "</td></tr>";
      }
      document.getElementById("foreignerstudentresult1").innerHTML = text;
      document.getElementById("foreignerstudentresult2").innerHTML = text2;
    } else {
      document.getElementById("foreignerstudentresult1").innerHTML = text;
      document.getElementById("foreignerstudentresult2").innerHTML = text2;
    }
  }
  //////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// approve new student /////////////////////////////////////
  async function approvestudent() {
    var studentid = newstudentglobalvar;

    let response = await fetch(
      "/api/superadmin/registrar/admission/approveforeignerstudent?studentid=" +
        studentid,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id == "success") {
      loadalert();
      document.getElementById("foreignerstudentresult1").innerHTML = "";
      document.getElementById("foreignerstudentresult2").innerHTML = "";
      editenrolleerecordsforeignerstudent("displaystudenttable");
      //sendrealtimemessage("reloadactivitylog");
      //sendrealtimemessage("reloadmobilenotifications");
    } else {
      alert("Invalid");
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////

  if (options == "displaystudenttable") {
    displaystudenttable();
  }

  if (options == "approvestudent") {
    approvestudent();
  }
}
/////////////////////////////////////////////////////////////////////////////////////////
