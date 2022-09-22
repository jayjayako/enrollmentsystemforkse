function enrollmentfunction(options) {
  /////////////////////////////// INQUIRE NOW //////////////////////////////
  async function inquirenow() {
    try {
      ////////////////////// sends inquiry message //////////////////////
      var inquirenowinput = document.getElementById(
        "inquirenowinputtext"
      ).value;
      let formData = new FormData();
      formData.append("message", inquirenowinput);
      let response = await fetch("/api/studentwebbackend/inquiry/sendinquiry", {
        method: "POST",
        body: formData,
      });
      let myresult = await response.json();
      // you can if condition if success or not to ouput something
      if (myresult[0].id == "invalid") {
        alert("Invalid");
      } else {
        alert("Succesfully sent");
        //sendrealtimemessage("reloadenrollmentreservation");
      }
    } catch (error) {
      alert("Network error pls try again");
    }
  }
  //////////////////////////////////////////////////////////////////////////
  var birthdate = document.getElementById("admissionbirthdate").value;
  var gender = document.getElementById("admissiongender").value;
  var address = document.getElementById("admissionaddress").value;
  var contactnumber = document.getElementById("admissioncontactnumber").value;
  var mothname = document.getElementById("admissionmothersname").value;
  var fathname = document.getElementById("admissionfathersname").value;
  var mothocc = document.getElementById("admissionmothoccupation").value;
  var fathocc = document.getElementById("admissionfathoccupation").value;
  var mothnum = document.getElementById("admissionmothnumber").value;
  var fathnum = document.getElementById("admissionfathnumber").value;
  var guardname = document.getElementById("admissionguardiansname").value;
  var relguard = document.getElementById("admissionrelguardian").value;
  var guardnum = document.getElementById("admissionguardnumber").value;
  var guardadd = document.getElementById("admissionguardsaddress").value;
  //////////////////////////// new student enrollment ///////////////////////
  async function submitnewstudent() {
    try {
      ////////////////////////////////////////////////////////////////////
      /////////////////////////// student info ///////////////////////////
      let formData = new FormData();
      formData.append("birthdate", birthdate);
      formData.append("gender", gender);
      formData.append("address", address);
      formData.append("contactno", contactnumber);
      /////////////// parents /////////////////
      formData.append("mothersname", mothname);
      formData.append("fathersname", fathname);
      formData.append("mothersoccupation", mothocc);
      formData.append("fathersoccupation", fathocc);
      formData.append("motherscontactno", mothnum);
      formData.append("fatherscontactno", fathnum);
      /////////////////////////////////////////
      /////////////// guardian ////////////////
      formData.append("guardiansname", guardname);
      formData.append("guardiansrelationship", relguard);
      formData.append("guardianscontactno", guardnum);
      formData.append("guardiansaddress", guardadd);
      ////////////////////////////////////////////////////////////////////
      formData.append("form137", fileform137.files[0]);
      formData.append("birthcertificate", filebirthcertificate.files[0]);
      formData.append("goodmoral", filegoodmoral.files[0]);
      formData.append("recommendationform", filerecommendadtionform.files[0]);
      formData.append("letterofguarantee", fileletterofguarantee.files[0]);
      let response = await fetch(
        "/api/studentwebbackend/admission/uploadnewstudentadmissionfiles",
        {
          method: "POST",
          body: formData,
        }
      );
      let myresult = await response.json();
      // you can if condition if success or not to ouput something
      if (myresult[0].id == "invalid") {
        alert("Invalid");
      } else {
        alert("Succesfully sent");
        //sendrealtimemessage("reloadadmission");
      }
    } catch (error) {
      alert(error);
    }
  }
  ///////////////////////////////////////////////////////////////////////////

  ////////////////////////// old student enrollment /////////////////////////
  async function submitoldstudent() {
    try {
      ///////////////////////////////////////////////////////////////
      let formData = new FormData();
      formData.append("gradeslip", filegradeslip.files[0]);
      let response = await fetch(
        "/api/studentwebbackend/admission/uploadoldstudentadmissionfiles",
        {
          method: "POST",
          body: formData,
        }
      );
      let myresult = await response.json();
      // you can if condition if success or not to ouput something
      if (myresult[0].id == "invalid") {
        alert("Invalid");
      } else {
        alert("Succesfully sent");
        //sendrealtimemessage("reloadadmission");
      }
    } catch (error) {
      alert("Network error pls try again");
    }
  }
  ///////////////////////////////////////////////////////////////////////////

  ////////////////////////// transferee enrollment /////////////////////////
  async function submittransfereeenrollment() {
    try {
      //////////////////////////////////////////////////////////////
      /////////////////////////// student info ///////////////////////////
      let formData = new FormData();
      formData.append("birthdate", birthdate);
      formData.append("gender", gender);
      formData.append("address", address);
      formData.append("contactno", contactnumber);
      /////////////// parents /////////////////
      formData.append("mothersname", mothname);
      formData.append("fathersname", fathname);
      formData.append("mothersoccupation", mothocc);
      formData.append("fathersoccupation", fathocc);
      formData.append("motherscontactno", mothnum);
      formData.append("fatherscontactno", fathnum);
      /////////////////////////////////////////
      /////////////// guardian ////////////////
      formData.append("guardiansname", guardname);
      formData.append("guardiansrelationship", relguard);
      formData.append("guardianscontactno", guardnum);
      formData.append("guardiansaddress", guardadd);
      ////////////////////////////////////////////////////////////////////
      formData.append("form137", filetransform137.files[0]);
      formData.append("transcriptofrecords", filetor.files[0]);
      formData.append("transfercredentials", filetransfercred.files[0]);
      formData.append("honorabledismissal", filehondiss.files[0]);
      formData.append("goodmoral", filetransgoodmoral.files[0]);
      let response = await fetch(
        "/api/studentwebbackend/admission/uploadtransfereestudentadmissionfiles",
        {
          method: "POST",
          body: formData,
        }
      );
      let myresult = await response.json();
      // you can if condition if success or not to ouput something
      if (myresult[0].id == "invalid") {
        alert("Invalid");
      } else {
        alert("Succesfully sent");
        //sendrealtimemessage("reloadadmission");
      }
    } catch (error) {
      alert("Network error pls try again");
    }
  }
  ///////////////////////////////////////////////////////////////////////////

  ////////////////////////// foreigner enrollment /////////////////////////
  async function submitforeignerenrollment() {
    try {
      //////////////////////////////////////////////////////////
      /////////////////////////// student info ///////////////////////////
      formData.append("birthdate", birthdate);
      formData.append("gender", gender);
      formData.append("address", address);
      formData.append("contactno", contactnumber);
      /////////////// parents /////////////////
      formData.append("mothersname", mothname);
      formData.append("fathersname", fathname);
      formData.append("mothersoccupation", mothocc);
      formData.append("fathersoccupation", fathocc);
      formData.append("motherscontactno", mothnum);
      formData.append("fatherscontactno", fathnum);
      /////////////////////////////////////////
      /////////////// guardian ////////////////
      formData.append("guardiansname", guardname);
      formData.append("guardiansrelationship", relguard);
      formData.append("guardianscontactno", guardnum);
      formData.append("guardiansaddress", guardadd);
      ////////////////////////////////////////////////////////////////////
      let formData = new FormData();
      formData.append("authtr", fileauthtr.files[0]);
      formData.append("acr", fileacr.files[0]);
      formData.append("crts", filecrts.files[0]);
      formData.append("studentvisa", filestudentvisa.files[0]);
      formData.append("idpictures", fileidpictures.files[0]);
      let response = await fetch(
        "/api/studentwebbackend/admission/uploadforeignstudentadmissionfiles",
        {
          method: "POST",
          body: formData,
        }
      );
      let myresult = await response.json();
      // you can if condition if success or not to ouput something
      if (myresult[0].id == "invalid") {
        alert("Invalid");
      } else {
        alert("Succesfully sent");
        //sendrealtimemessage("reloadeditstudentrecordsforeigner");
      }
    } catch (error) {
      alert("Network error pls try again");
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  if (options == "inquirenow") {
    inquirenow();
  }
  if (options == "submitnewstudent") {
    submitnewstudent();
  }
  if (options == "submitoldstudent") {
    submitoldstudent();
  }
  if (options == "submittransfereeenrollment") {
    submittransfereeenrollment();
  }
  if (options == "submitforeignerenrollment") {
    submitforeignerenrollment();
  }
}

//////////////////// new student //////////////////////
function getform137() {
  document.getElementById("fileform137").click();
}

function getbirthcertificate() {
  document.getElementById("filebirthcertificate").click();
}

function getgoodmoral() {
  document.getElementById("filegoodmoral").click();
}

function getrecommendationform() {
  document.getElementById("filerecommendadtionform").click();
}

function getletterofguarantee() {
  document.getElementById("fileletterofguarantee").click();
}
///////////////////////////////////////////////////////

/////////////////////// old student ///////////////////
function getgradeslip() {
  document.getElementById("filegradeslip").click();
}
///////////////////////////////////////////////////////

/////////////////////// transferee ////////////////////
function gettransform137() {
  document.getElementById("filetransform137").click();
}

function gettor() {
  document.getElementById("filetor").click();
}

function gettransfercred() {
  document.getElementById("filetransfercred").click();
}

function gethondiss() {
  document.getElementById("filehondiss").click();
}

function gettransgoodmoral() {
  document.getElementById("filetransgoodmoral").click();
}
///////////////////////////////////////////////////////

/////////////////////// foreigner ////////////////////
function getatr() {
  document.getElementById("fileatr").click();
}

function getacr() {
  document.getElementById("fileacr").click();
}

function getcrts() {
  document.getElementById("filecrts").click();
}

function getstudentvisa() {
  document.getElementById("filestudentvisa").click();
}

function getidpictures() {
  document.getElementById("fileidpictures").click();
}
///////////////////////////////////////////////////////
