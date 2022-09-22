/////////////////////// load all dropdown data ///////////////////////
async function loadalldropdownsection() {
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
    document.getElementById("sectionschoollevelid").innerHTML = text;
  }
  /////////////////////////////

  var schoollevel = document.getElementById("sectionschoollevelid").value;
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
    document.getElementById("sectionyearlevelid").innerHTML = text;
  }
  //////////////////////////////////

  var schoollevel = document.getElementById("sectionschoollevelid").value;
  var yearlevel = document.getElementById("sectionyearlevelid").value;
  //////// get section data /////
  let response3 = await fetch(
    "/api/superadmin/registrar/section/displaysection?schoollevel=" +
      schoollevel +
      "&yearlevel=" +
      yearlevel,
    {
      method: "GET",
    }
  );
  let myresult3 = await response3.json();
  if (myresult3) {
    var text = "";
    for (var x in myresult3) {
      text += "<option>" + myresult3[x].sectioncol + "</option>";
    }
    document.getElementById("sectionid").innerHTML = text;
  }
  //////////////////////////////////
}
//////////////////////////////////////////////////////////////////////

///////// function for loading section while changing school level and year level /////////
async function loaddropdownyrsection() {
  document.getElementById("sectionyearlevelid").innerHTML = "";
  var schoollevel = document.getElementById("sectionschoollevelid").value;
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
    document.getElementById("sectionyearlevelid").innerHTML = text;
  }
  //////////////////////////////////

  document.getElementById("sectionid").innerHTML = "";
  var yearlevel = document.getElementById("sectionyearlevelid").value;
  //////// get section data /////
  let response3 = await fetch(
    "/api/superadmin/registrar/section/displaysection?schoollevel=" +
      schoollevel +
      "&yearlevel=" +
      yearlevel,
    {
      method: "GET",
    }
  );
  let myresult3 = await response3.json();
  if (myresult3) {
    var text = "";
    for (var x in myresult3) {
      text += "<option>" + myresult3[x].sectioncol + "</option>";
    }
    document.getElementById("sectionid").innerHTML = text;
  }
  //////////////////////////////////
}
/////////////////////////////////////////////////////////////////////////////////////

async function loaddropdownsection() {
  document.getElementById("sectionid").innerHTML = "";
  var schoollevel = document.getElementById("sectionschoollevelid").value;
  var yearlevel = document.getElementById("sectionyearlevelid").value;
  //////// get section data /////
  let response3 = await fetch(
    "/api/superadmin/registrar/section/displaysection?schoollevel=" +
      schoollevel +
      "&yearlevel=" +
      yearlevel,
    {
      method: "GET",
    }
  );
  let myresult3 = await response3.json();
  if (myresult3) {
    var text = "";
    for (var x in myresult3) {
      text += "<option>" + myresult3[x].sectioncol + "</option>";
    }
    document.getElementById("sectionid").innerHTML = text;
  }
  //////////////////////////////////
}

/////////////////////// function for inserting section //////////
async function savesection() {
  var schoollevel = document.getElementById("sectionschoollevelid").value;
  var yearlevel = document.getElementById("sectionyearlevelid").value;
  var section = document.getElementById("sectionidtext").value;

  let formData = new FormData();
  formData.append("schoollevel", schoollevel);
  formData.append("yearlevel", yearlevel);
  formData.append("section", section);

  let response = await fetch(
    "/api/superadmin/registrar/section/insertsection",
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
    loaddropdownsection();
    document.getElementById("sectionidtext").value = "";
  }
}

///////////////////////////////////////////////////////////////

////////////////////////// function for deleting section //////////////////////
async function deletesection() {
  var schoollevel = document.getElementById("sectionschoollevelid").value;
  var yearlevel = document.getElementById("sectionyearlevelid").value;
  var section = document.getElementById("sectionid").value;

  let formData = new FormData();
  formData.append("schoollevel", schoollevel);
  formData.append("yearlevel", yearlevel);
  formData.append("section", section);

  let response = await fetch(
    "/api/superadmin/registrar/section/deletesection",
    {
      method: "POST",
      body: formData,
    }
  );
  let myresult = await response.json();
  if (myresult[0].id != "success") {
    alert("Error Pls try Again");
  } else {
    document.getElementById("sectionschoollevelid").value = "";
    document.getElementById("sectionyearlevelid").value = "";
    document.getElementById("sectionid").value = "";
    loadalert();
    loaddropdownsection();
    //sendrealtimemessage("reloadactivitylog");
  }
}
////////////////////////////////////////////////////////////////////////////////////
