/////////////////////// load all dropdown data ///////////////////////
async function loadalldropdownschoollevel() {
  //////// get school level data /////
  let response1 = await fetch(
    "/api/staff/registrar/schoollevel/displayschoollevel",
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
    document.getElementById("schoollevelid").innerHTML = text;
  }
  /////////////////////////////
}
//////////////////////////////////////////////////////////////////////

/////////////////////// function for inserting school level //////////
async function saveschoollevel() {
  var schoollevel = document.getElementById("schoollevelinput").value;
  let formData = new FormData();
  formData.append("schoollevel", schoollevel);

  let response = await fetch(
    "/api/staff/registrar/schoollevel/insertschoollevel",
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
    loadalldropdownschoollevel();
    //loadalldropdownyearlevel();
  }
}

///////////////////////////////////////////////////////////////

////////////////////////// function for deleting school level //////////////////////
async function deleteschoollevel() {
  var schoollevel = document.getElementById("schoollevelid").value;
  let formData = new FormData();
  formData.append("schoollevel", schoollevel);
  let response = await fetch(
    "/api/staff/registrar/schoollevel/deleteschoollevel",
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
    loadalert();
    loadalldropdownschoollevel();
    //loadalldropdownyearlevel();
    //sendrealtimemessage("reloadactivitylog");
  }
}
////////////////////////////////////////////////////////////////////////////////////
