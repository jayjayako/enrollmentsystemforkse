/////////////////////// load all dropdown data ///////////////////////
async function loadalldropdownyearlevel() {
  //////// get school level data /////
  let response1 = await fetch(
    "/api/superadmin/registrar/schoollevel/displayschoollevel",
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
    document.getElementById("yearlevelschoollevelid").innerHTML = text;
  }
  /////////////////////////////

  var schoollevel = document.getElementById("yearlevelschoollevelid").value;
  //////// get year level data /////
  let response2 = await fetch(
    "/api/superadmin/registrar/yearlevel/displayyearlevel?schoollevel=" +
      schoollevel,
    {
      method: "GET",
    }
  );
  let myresult2 = await response2.json();
  if (myresult2) {
    var text = "";
    for (var x in myresult2) {
      text += "<option>" + myresult2[x].yearlevelcol + "</option>";
    }
    document.getElementById("yearlevelid").innerHTML = text;
  }
  //////////////////////////////////
}
//////////////////////////////////////////////////////////////////////

//////////////// function for loading yearlevel while changing school level /////////
async function loaddropdownyearlevel() {
  document.getElementById("yearlevelid").innerHTML = "";
  var schoollevel = document.getElementById("yearlevelschoollevelid").value;
  //////// get year level data /////
  let response2 = await fetch(
    "/api/superadmin/registrar/yearlevel/displayyearlevel?schoollevel=" +
      schoollevel,
    {
      method: "GET",
    }
  );
  let myresult2 = await response2.json();
  if (myresult2) {
    var text = "";
    for (var x in myresult2) {
      text += "<option>" + myresult2[x].yearlevelcol + "</option>";
    }
    document.getElementById("yearlevelid").innerHTML = text;
  }
  //////////////////////////////////
}
/////////////////////////////////////////////////////////////////////////////////////

/////////////////////// function for inserting year level //////////
async function saveyearlevel() {
  var schoollevel = document.getElementById("yearlevelschoollevelid").value;
  var yearlevel = document.getElementById("yearlevelidtext").value;

  let formData = new FormData();
  formData.append("schoollevel", schoollevel);
  formData.append("yearlevel", yearlevel);

  let response = await fetch(
    "/api/superadmin/registrar/yearlevel/insertyearlevel",
    {
      method: "POST",
      body: formData,
    }
  );
  let myresult = await response.json();
  if (myresult[0].id != "success") {
    alert("Error Pls try Again");
  } else {
    loadalert();
    //sendrealtimemessage("reloadactivitylog");
    loaddropdownyearlevel();
  }
}

///////////////////////////////////////////////////////////////

////////////////////////// function for deleting year level //////////////////////
async function deleteyearlevel() {
  var schoollevel = document.getElementById("yearlevelschoollevelid").value;
  var yearlevel = document.getElementById("yearlevelid").value;

  let formData = new FormData();
  formData.append("schoollevel", schoollevel);
  formData.append("yearlevel", yearlevel);

  let response = await fetch(
    "/api/superadmin/registrar/yearlevel/deleteyearlevel",
    {
      method: "POST",
      body: formData,
    }
  );
  let myresult = await response.json();
  if (myresult[0].id != "success") {
    alert("Error Pls try Again");
  } else {
    document.getElementById("schoollevelid").value = "";
    document.getElementById("yearlevelid").value = "";
    loadalert();
    loaddropdownyearlevel();
    //sendrealtimemessage("reloadactivitylog");
  }
}
////////////////////////////////////////////////////////////////////////////////////
