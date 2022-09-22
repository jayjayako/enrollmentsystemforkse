function otherfeesfunc(options) {
  /////////////////////// load all dropdown data ///////////////////////
  async function loadalldropdownyearlevel() {
    //////// get school level data /////
    let response1 = await fetch(
      "/api/staff/accounting/otherfees/displayschoollevel",
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
      document.getElementById("filschoollevelid").innerHTML = text;
    }
    /////////////////////////////

    var schoollevel = document.getElementById("schoollevelid").value;
    //////// get year level data /////
    let response2 = await fetch(
      "/api/staff/accounting/otherfees/displayyearlevel?schoollevel=" +
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
      document.getElementById("filyearlevelid").innerHTML = text;
      displayotherfeestable();
    }
    //////////////////////////////////
  }

  //////////////// function for loading yearlevel while changing school level /////////
  async function loaddropdownyearlevel() {
    document.getElementById("yearlevelid").innerHTML = "";
    var schoollevel = document.getElementById("schoollevelid").value;
    //////// get year level data /////
    let response2 = await fetch(
      "/api/staff/accounting/otherfees/displayyearlevel?schoollevel=" +
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

  async function loaddropdownyearlevel2() {
    document.getElementById("filyearlevelid").innerHTML = "";
    var schoollevel = document.getElementById("filschoollevelid").value;
    //////// get year level data /////

    let response2 = await fetch(
      "/api/staff/accounting/otherfees/displayyearlevel?schoollevel=" +
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
      document.getElementById("filyearlevelid").innerHTML = text;
      displayotherfeesfiltertable();
    }
    //////////////////////////////////
  }

  ////////////////////////////////// load table data /////////////////////////////////////
  async function displayotherfeestable() {
    var schoollevel = document.getElementById("schoollevelid").value;
    var yearlevel = document.getElementById("yearlevelid").value;
    document.getElementById("otherfeestableresult").innerHTML = "";

    let response = await fetch(
      "/api/staff/accounting/otherfees/displayspecificotherfees?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    var headertbl =
      "<tr><th><div>School Level</div></th><th><div>Yearlvl</div></th><th><div>Particular</div></th><th><div>Amount</div></th></tr>";
    if (myresult[0].id != "invalid") {
      var text = "";
      for (var x in myresult) {
        text +=
          "<tr><td>" +
          myresult[x].schoollevelcol +
          "</td><td>" +
          myresult[x].yearlevelcol +
          "</td><td>" +
          myresult[x].particularscol +
          "</td><td>" +
          myresult[x].amountcol +
          "</td></tr>";
      }
      document.getElementById("otherfeestableresult").innerHTML =
        headertbl + text;
      clickabletable();
    } else {
      document.getElementById("otherfeestableresult").innerHTML = headertbl;
    }
  }

  //////////////////////////////// this is for clickable table /////////////////////////
  function clickabletable() {
    var table = document.getElementById("otherfeestableresult");

    for (var i = 1; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
        //document.getElementById("idnumber").value = this.cells[0].innerHTML;
        displayclickabletable(
          this.cells[0].innerHTML,
          this.cells[1].innerHTML,
          this.cells[2].innerHTML,
          this.cells[3].innerHTML
        );
      };
    }
  }

  //// when table is clicked the information is also displayed on the student info modal /////
  async function displayclickabletable(
    schoollevel,
    yearlevel,
    particular,
    amount
  ) {
    document.getElementById("schoollevelid").value = schoollevel;
    await loaddropdownyearlevel();
    document.getElementById("yearlevelid").value = yearlevel;
    document.getElementById("particularid").value = particular;
    document.getElementById("amountid").value = amount;
  }
  ////////////////////////////////////////////////////////////////////

  ////////////////////////////////// display from filter table ///////////////////////////
  async function displayotherfeesfiltertable() {
    var schoollevel = document.getElementById("filschoollevelid").value;
    var yearlevel = document.getElementById("filyearlevelid").value;
    document.getElementById("otherfeestableresult").innerHTML = "";

    let response = await fetch(
      "/api/staff/accounting/otherfees/displayspecificotherfees?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    var headertbl =
      "<tr><th><div>School Level</div></th><th><div>Yearlvl</div></th><th><div>Particular</div></th><th><div>Amount</div></th></tr>";
    if (myresult[0].id != "invalid") {
      var text = "";
      for (var x in myresult) {
        text +=
          "<tr><td>" +
          myresult[x].schoollevelcol +
          "</td><td>" +
          myresult[x].yearlevelcol +
          "</td><td>" +
          myresult[x].particularscol +
          "</td><td>" +
          myresult[x].amountcol +
          "</td></tr>";
      }
      document.getElementById("otherfeestableresult").innerHTML =
        headertbl + text;
      clickabletable();
    } else {
      document.getElementById("otherfeestableresult").innerHTML = headertbl;
    }
  }
  ///////////////////////////////////////////////////////////////////////////

  ////////////////////////////////// add new other fees //////////////////////////////////
  async function addnewotherfees() {
    var schoollevel = document.getElementById("schoollevelid").value;
    var yearlevel = document.getElementById("yearlevelid").value;
    var particular = document.getElementById("particularid").value;
    var amount = document.getElementById("amountid").value;

    let formData = new FormData();
    formData.append("schoollevel", schoollevel);
    formData.append("yearlevel", yearlevel);
    formData.append("particulars", particular);
    formData.append("amount", amount);

    let response = await fetch(
      "/api/staff/accounting/otherfees/insertotherfees",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      loadalert();
      displayotherfeestable();
    } else {
      alert("Invalid");
    }
  }

  ////////////////////////////////// update other fees /////////////////////////////////
  async function updateotherfees() {
    var schoollevel = document.getElementById("schoollevelid").value;
    var yearlevel = document.getElementById("yearlevelid").value;
    var particular = document.getElementById("particularid").value;
    var amount = document.getElementById("amountid").value;

    let formData = new FormData();
    formData.append("schoollevel", schoollevel);
    formData.append("yearlevel", yearlevel);
    formData.append("particulars", particular);
    formData.append("amount", amount);

    let response = await fetch(
      "/api/staff/accounting/otherfees/updateotherfees",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      loadalert();
      displayotherfeestable();
    } else {
      alert("Invalid");
    }
  }
  ///////////////////////////////////////////////////////////////////////////

  ////////////////////////////////// delete other fees /////////////////////////////////
  async function deleteotherfees() {
    var schoollevel = document.getElementById("schoollevelid").value;
    var yearlevel = document.getElementById("yearlevelid").value;
    var particular = document.getElementById("particularid").value;

    let formData = new FormData();
    formData.append("schoollevel", schoollevel);
    formData.append("yearlevel", yearlevel);
    formData.append("particulars", particular);

    let response = await fetch(
      "/api/staff/accounting/otherfees/deleteotherfees",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      loadalert();
      displayotherfeestable();
    } else {
      alert("Invalid");
    }
  }
  ///////////////////////////////////////////////////////////////////////////

  if (options == "alldropdownyearlvl") {
    loadalldropdownyearlevel();
  }
  if (options == "loaddropdownyearlevel") {
    loaddropdownyearlevel();
  }

  if (options == "loadalldropdownyearlevel") {
    loadalldropdownyearlevel();
  }

  if (options == "loaddropdownyearlevel2") {
    loaddropdownyearlevel2();
  }

  if (options == "displayotherfeesfiltertable") {
    displayotherfeesfiltertable();
  }

  if (options == "addnewotherfees") {
    addnewotherfees();
  }

  if (options == "updateotherfees") {
    updateotherfees();
  }

  if (options == "deleteotherfees") {
    deleteotherfees();
  }
}
