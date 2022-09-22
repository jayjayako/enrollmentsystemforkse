function paymentplans(options) {
  //////////////////////////////////////////////////////////////////////////////////////
  ////////////// this function used to load all data payment plans ///////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  async function loadalldropdownyearlevel() {
    //////// get school level data /////
    let response1 = await fetch(
      "/api/staff/accounting/paymentplans/displayschoollevel",
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
      document.getElementById("paymentplansschoollevelid").innerHTML = text;
      document.getElementById("paymentplansfilschoollevelid").innerHTML = text;
    }
    /////////////////////////////

    var schoollevel = document.getElementById(
      "paymentplansschoollevelid"
    ).value;
    //////// get year level data /////
    let response2 = await fetch(
      "/api/staff/accounting/paymentplans/displayyearlevel?schoollevel=" +
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
      document.getElementById("paymentplansyearlevelid").innerHTML = text;
      document.getElementById("paymentplansfilyearlevelid").innerHTML = text;
      displaytable();
    }
    //////////////////////////////////
  }
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////
  /////////////////// this is used for displaying dropdown update //////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  async function displaydropdown() {
    document.getElementById("paymentplansyearlevelid").innerHTML = "";
    var schoollevel = document.getElementById(
      "paymentplansschoollevelid"
    ).value;
    //////// get year level data /////
    let response2 = await fetch(
      "/api/staff/accounting/paymentplans/displayyearlevel?schoollevel=" +
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
      document.getElementById("paymentplansyearlevelid").innerHTML = text;
    }
    //////////////////////////////////
  }
  ////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////
  /////////////////// this is used for displaying dropdown month //////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  async function displaydropdownmonth() {
    document.getElementById("paymentplansmonthid").innerHTML = "";
    var year = document.getElementById("paymentplansyearid").value;
    //////////////////////////////// get month data ////////////////////////////////////
    let response1 = await fetch(
      "/api/staff/accounting/paymentplans/displaymonth?year=" + year,
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
      document.getElementById("paymentplansmonthid").innerHTML = text;
      displaydropdownday();
    }
    ////////////////////////////////////////////////////////////////////////////////////
  }
  //////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////
  /////////////////// this is used for displaying dropdown day //////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  async function displaydropdownday() {
    document.getElementById("paymentplansdayid").innerHTML = "";
    var year = document.getElementById("paymentplansyearid").value;
    var month = document.getElementById("paymentplansmonthid").value;
    /////////////////////////////// get day data /////////////////////////////////////
    let response1 = await fetch(
      "/api/staff/accounting/paymentplans/displayday?month=" +
        month +
        "&year=" +
        year,
      {
        method: "GET",
      }
    );
    let myresult1 = await response1.json();
    if (myresult1) {
      var text = "";
      var numresult2 = Number(myresult1[0].number);
      for (let i = 1; i <= numresult2; i++) {
        text += "<option value='" + i + "'>" + i + "</option>";
      }
      document.getElementById("paymentplansdayid").innerHTML = text;
    }
    ////////////////////////////////////////////////////////////////////////////////////
  }
  //////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////
  ////////////////// this is used to display filter of the table /////////////
  //////////////////////////////////////////////////////////////////////////////////////
  async function displayfilterschooldroptdowntable() {
    document.getElementById("paymentplansfilyearlevelid").innerHTML = "";
    var schoollevel = document.getElementById(
      "paymentplansfilschoollevelid"
    ).value;
    //////// get year level data /////

    let response2 = await fetch(
      "/api/staff/accounting/paymentplans/displayyearlevel?schoollevel=" +
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
      document.getElementById("paymentplansfilyearlevelid").innerHTML = text;
      displayfilteryeartable();
    }
    //////////////////////////////////
  }
  //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////// this is used to display table ////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  async function displaytable() {
    var schoollevel = document.getElementById(
      "paymentplansschoollevelid"
    ).value;
    var yearlevel = document.getElementById("paymentplansyearlevelid").value;
    document.getElementById("paymentplanstableresult").innerHTML = "";

    let response = await fetch(
      "/api/staff/accounting/paymentplans/displayspecificpaymentplans?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    var headertbl =
      "<tr><th><div>School Level</div></th><th><div>Yearlvl</div></th><th><div>Payment Type</div></th><th><div>Particular</div></th><th><div>Year</div></th><th><div>Month</div></th><th><div>Day</div></th></tr>";
    if (myresult[0].id != "invalid") {
      var text = "";
      for (var x in myresult) {
        text +=
          "<tr><td>" +
          myresult[x].schoollevelcol +
          "</td><td>" +
          myresult[x].yearlevelcol +
          "</td><td>" +
          myresult[x].payment_typecol +
          "</td><td>" +
          myresult[x].particularcol +
          "</td><td>" +
          myresult[x].yearcol +
          "</td><td>" +
          myresult[x].monthcol +
          "</td><td>" +
          myresult[x].daycol +
          "</td></tr>";
      }
      document.getElementById("paymentplanstableresult").innerHTML =
        headertbl + text;
      clickabletable();
    } else {
      document.getElementById("paymentplanstableresult").innerHTML = headertbl;
    }
  }
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ////////////////// this is used to display clickable table ////////////////
  ///////////////////////////////////////////////////////////////////////////
  function clickabletable() {
    var table = document.getElementById("paymentplanstableresult");

    for (var i = 1; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
        //document.getElementById("idnumber").value = this.cells[0].innerHTML;
        displaydatafromtable(
          this.cells[0].innerHTML,
          this.cells[1].innerHTML,
          this.cells[2].innerHTML,
          this.cells[3].innerHTML,
          this.cells[4].innerHTML,
          this.cells[5].innerHTML,
          this.cells[6].innerHTML
        );
      };
    }
  }
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ////////////////// this is used to display data from table ////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  async function displaydatafromtable(
    schoollevel,
    yearlevel,
    paymenttype,
    particular,
    year,
    month,
    day
  ) {
    document.getElementById("paymentplansschoollevelid").value = schoollevel;
    document.getElementById("paymentplansyearlevelid").value = yearlevel;
    document.getElementById("paymentplanspaymenttypeid").value = paymenttype;
    document.getElementById("paymentplansparticularid").value = particular;
    document.getElementById("paymentplansyearid").value = year;
    document.getElementById("paymentplansmonthid").value = month;
    document.getElementById("paymentplansdayid").value = day;
    await displaydropdown();
    await displaydropdownmonth();
    await displaydropdownday();
  }
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  //////////////////// this is used to display filtered table //////////////////
  ///////////////////////////////////////////////////////////////////////////
  async function displayfilteryeartable() {
    var schoollevel = document.getElementById(
      "paymentplansfilschoollevelid"
    ).value;
    var yearlevel = document.getElementById("paymentplansfilyearlevelid").value;
    document.getElementById("paymentplanstableresult").innerHTML = "";

    let response = await fetch(
      "/api/staff/accounting/paymentplans/displayspecificpaymentplans?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    var headertbl =
      "<tr><th><div>School Level</div></th><th><div>Yearlvl</div></th><th><div>Payment Type</div></th><th><div>Particular</div></th><th><div>Year</div></th><th><div>Month</div></th><th><div>Day</div></th></tr>";
    if (myresult[0].id != "invalid") {
      var text = "";
      for (var x in myresult) {
        text +=
          "<tr><td>" +
          myresult[x].schoollevelcol +
          "</td><td>" +
          myresult[x].yearlevelcol +
          "</td><td>" +
          myresult[x].payment_typecol +
          "</td><td>" +
          myresult[x].particularcol +
          "</td><td>" +
          myresult[x].yearcol +
          "</td><td>" +
          myresult[x].monthcol +
          "</td><td>" +
          myresult[x].daycol +
          "</td></tr>";
      }
      document.getElementById("paymentplanstableresult").innerHTML =
        headertbl + text;
      clickabletable();
    } else {
      document.getElementById("paymentplanstableresult").innerHTML = headertbl;
    }
  }
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// this is used to addnew data /////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  async function addnewdata() {
    var schoollevel = document.getElementById(
      "paymentplansschoollevelid"
    ).value;
    var yearlevel = document.getElementById("paymentplansyearlevelid").value;
    var paymenttype = document.getElementById(
      "paymentplanspaymenttypeid"
    ).value;
    var particular = document.getElementById("paymentplansparticularid").value;

    let formData = new FormData();
    formData.append("schoollevel", schoollevel);
    formData.append("yearlevel", yearlevel);
    formData.append("paymenttype", paymenttype);
    formData.append("particulars", particular);

    let response = await fetch(
      "/api/staff/accounting/paymentplans/insertpaymentplans",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      loadalert();
      displaytable();
    } else {
      alert("Invalid");
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// update data //////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  async function updatedata() {
    var schoollevel = document.getElementById(
      "paymentplansschoollevelid"
    ).value;
    var yearlevel = document.getElementById("paymentplansyearlevelid").value;
    var paymenttype = document.getElementById(
      "paymentplanspaymenttypeid"
    ).value;
    var particular = document.getElementById("paymentplansparticularid").value;
    var year = document.getElementById("paymentplansyearid").value;
    var month = document.getElementById("paymentplansmonthid").value;
    var day = document.getElementById("paymentplansdayid").value;

    let formData = new FormData();
    formData.append("schoollevel", schoollevel);
    formData.append("yearlevel", yearlevel);
    formData.append("paymenttype", paymenttype);
    formData.append("particulars", particular);

    formData.append("year", year);
    formData.append("month", month);
    formData.append("day", day);

    let response = await fetch(
      "/api/staff/accounting/paymentplans/updatepaymentplans",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      loadalert();
      displaytable();
    } else {
      alert("Invalid");
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// used to delete data //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  async function deletedata() {
    var schoollevel = document.getElementById(
      "paymentplansschoollevelid"
    ).value;
    var yearlevel = document.getElementById("paymentplansyearlevelid").value;
    var paymenttype = document.getElementById(
      "paymentplanspaymenttypeid"
    ).value;
    var particular = document.getElementById("paymentplansparticularid").value;

    let formData = new FormData();
    formData.append("schoollevel", schoollevel);
    formData.append("yearlevel", yearlevel);
    formData.append("paymenttype", paymenttype);
    formData.append("particulars", particular);

    let response = await fetch(
      "/api/staff/accounting/paymentplans/deletepaymentplans",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      loadalert();
      displaytable();
    } else {
      alert("Invalid");
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  if (options == "displayalldropdown") {
    loadalldropdownyearlevel();
  }

  if (options == "displaydropdown") {
    displaydropdown();
  }

  if (options == "displaymonth") {
    displaydropdownmonth();
  }

  if (options == "updatedropdownday") {
    displaydropdownday();
  }

  if (options == "schoolfilter") {
    displayfilterschooldroptdowntable();
  }

  if (options == "yearfilter") {
    displayfilteryeartable();
  }

  if (options == "displaytable") {
    displaytable();
  }

  if (options == "addnew") {
    addnewdata();
  }

  if (options == "update") {
    updatedata();
  }

  if (options == "delete") {
    deletedata();
  }

  function loadalert() {
    // alert here
  }
}
