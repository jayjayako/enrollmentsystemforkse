////////////////// this is for displaying student max number //////////////////////
async function displaystudentmaxnum() {
  //////// get student max number data /////
  let response1 = await fetch(
    "/api/superadmin/registrar/studentmaxnum/displaystdntmaxnumber",
    {
      method: "GET",
    }
  );
  let myresult1 = await response1.json();
  if (myresult1[0].id != "invalid") {
    document.getElementById("studentmaxnumberid").value =
      myresult1[0].maxnumbercol;
  }
  ////////////////////////////////////

  //////// get student max number data /////
  let response2 = await fetch(
    "/api/superadmin/registrar/studentmaxnum/displayclassmaxnumber",
    {
      method: "GET",
    }
  );
  let myresult2 = await response2.json();
  if (myresult2[0].id != "invalid") {
    document.getElementById("classmaxnumberid").value =
      myresult2[0].maxnumbercol;
  }
  ////////////////////////////////////
}
///////////////////////////////////////////////////////////////////////////////////

////////////////// this is for updating student max number //////////////////////
async function updatestudentmaxnum() {
  //////// get student max number data /////
  var studentmaxnumber = document.getElementById("studentmaxnumberid").value;
  let formData = new FormData();
  formData.append("maxnumber", studentmaxnumber);

  let response1 = await fetch(
    "/api/superadmin/registrar/studentmaxnum/updatestdntmaxnumber",
    {
      method: "POST",
      body: formData,
    }
  );
  let myresult1 = await response1.json();
  if (myresult1[0].id != "invalid") {
    loadalert();
    //sendrealtimemessage("reloadactivitylog");
    displaystudentmaxnum();
  } else {
    alert("Invalid pls try again!");
  }
  ////////////////////////////////////
}

async function updateclassmaxnum() {
  //////// get student max number data /////
  var classmaxnumber = document.getElementById("classmaxnumberid").value;
  let formData = new FormData();
  formData.append("classmaxnumber", classmaxnumber);

  let response1 = await fetch(
    "/api/superadmin/registrar/studentmaxnum/updateclassmaxnumber",
    {
      method: "POST",
      body: formData,
    }
  );
  let myresult1 = await response1.json();
  if (myresult1[0].id != "invalid") {
    loadalert();
    //sendrealtimemessage("reloadactivitylog");
    displaystudentmaxnum();
  } else {
    alert("Invalid pls try again!");
  }
  ////////////////////////////////////
}
///////////////////////////////////////////////////////////////////////////////////
