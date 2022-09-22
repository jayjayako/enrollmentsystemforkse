/////////////////////// load all dropdown data ///////////////////////
async function loadalldropdown() {
  //////// get month data /////
  let response1 = await fetch(
    "/api/superadmin/registrar/enrollmentschedule/displaymonth",
    {
      method: "GET",
    }
  );
  let myresult1 = await response1.json();
  if (myresult1) {
    var text = "";
    for (var x in myresult1) {
      text +=
        "<option value='" +
        myresult1[x].number +
        "'>" +
        myresult1[x].monthname +
        "</option>";
    }
    document.getElementById("frommonth").innerHTML = text;
    document.getElementById("tomonth").innerHTML = text;
    await setTimeout(loadfromdays, 200);
    await setTimeout(loadtodays, 200);
    ////// get current schedule data////
    let response4 = await fetch(
      "/api/superadmin/registrar/enrollmentschedule/displaycursched",
      {
        method: "GET",
      }
    );
    let myresult4 = await response4.json();
    if (myresult4) {
      document.getElementById("frommonth").value = myresult4[0].frommonth;
      document.getElementById("fromday").value = myresult4[0].fromday;
      document.getElementById("tomonth").value = myresult4[0].tomonth;
      document.getElementById("today").value = myresult4[0].today;
    }
    ////////////////////////////////////
  }
  /////////////////////////////
}
//////////////////////////////////////////////////////////////////////

async function loadfromdays() {
  ////// get from day data ////
  var month1 = document.getElementById("frommonth").value;

  let response2 = await fetch(
    "/api/superadmin/registrar/enrollmentschedule/displaydays?month=" + month1,
    {
      method: "GET",
    }
  );
  let myresult2 = await response2.json();
  if (myresult2) {
    var text = "";
    var numresult1 = Number(myresult2[0].number);
    for (let i = 1; i <= numresult1; i++) {
      text += "<option value='" + i + "'>" + i + "</option>";
    }
    document.getElementById("fromday").innerHTML = text;
  }
  /////////////////////////////
}

async function loadtodays() {
  ////// get to day data //////
  var month2 = document.getElementById("tomonth").value;

  let response3 = await fetch(
    "/api/superadmin/registrar/enrollmentschedule/displaydays?month=" + month2,
    {
      method: "GET",
    }
  );
  let myresult3 = await response3.json();
  if (myresult3) {
    var text = "";
    var numresult2 = Number(myresult3[0].number);
    for (let i = 1; i <= numresult2; i++) {
      text += "<option value='" + i + "'>" + i + "</option>";
    }
    document.getElementById("today").innerHTML = text;
  }
  /////////////////////////////
}

/////////////////////// function for saving schedule //////////
async function save() {
  var frommonth = document.getElementById("frommonth").value;
  var fromdays = document.getElementById("fromday").value;
  var tomonth = document.getElementById("tomonth").value;
  var todays = document.getElementById("today").value;

  let formData = new FormData();
  formData.append("frommonth", frommonth);
  formData.append("fromdays", fromdays);
  formData.append("tomonth", tomonth);
  formData.append("todays", todays);

  let response = await fetch(
    "/api/superadmin/registrar/enrollmentschedule/updateschedule",
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
    sendrealtimemessage("reloadactivitylog");
  }
}
///////////////////////////////////////////////////////////////
