function paymentplanamount(options) {
  async function loadschoollevel() {
    //////// get school level data /////
    let response1 = await fetch(
      "/api/superadmin/accounting/otherfees/displayschoollevel",
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
      document.getElementById("paymentplanamountschoollevelid").innerHTML =
        text;
      loadyearlevel();
    }
    /////////////////////////////
  }

  async function loadyearlevel() {
    var schoollevel = document.getElementById(
      "paymentplanamountschoollevelid"
    ).value;
    //////// get year level data /////
    let response2 = await fetch(
      "/api/superadmin/accounting/otherfees/displayyearlevel?schoollevel=" +
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
      document.getElementById("paymentplanamountyearlevelid").innerHTML = text;
      loadpaymenttype();
      displaytable();
    } else {
      displaytable();
    }
    //////////////////////////////////
  }

  async function loadpaymenttype() {
    displaytable();
    var schoollevel = document.getElementById(
      "paymentplanamountschoollevelid"
    ).value;
    var yearlevel = document.getElementById(
      "paymentplanamountyearlevelid"
    ).value;

    //////// get paymenttype data /////
    let response2 = await fetch(
      "/api/superadmin/accounting/paymentplanamount/displaypaymenttype?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel,
      {
        method: "GET",
      }
    );
    let myresult2 = await response2.json();
    if (myresult2) {
      var text = "";
      for (var x in myresult2) {
        text += "<option>" + myresult2[x].payment_typecol + "</option>";
      }
      document.getElementById("paymentplanamountpaymenttypeid").innerHTML =
        text;
      displaytable();
    }
    //////////////////////////////////
  }

  async function displaytable() {
    var schoollevel = document.getElementById(
      "paymentplanamountschoollevelid"
    ).value;
    var yearlevel = document.getElementById(
      "paymentplanamountyearlevelid"
    ).value;
    var paymenttype = document.getElementById(
      "paymentplanamountpaymenttypeid"
    ).value;

    ///////////////////////////// get filter data /////////////////////////////////////////
    let response2 = await fetch(
      "/api/superadmin/accounting/paymentplanamount/displayspecificpaymentplanamount?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel +
        "&paymenttype=" +
        paymenttype,
      {
        method: "GET",
      }
    );

    let myresult2 = await response2.json();
    var headertbl =
      "<tr><th><div>School Level</div></th><th><div>Yearlvl</div></th><th><div>Payment Type</div></th><th><div>Particular</div></th><th><div>Amount</div></th><th><div>Discount</div></th></tr>";
    if (myresult2[0].id != "invalid") {
      var text = "";
      for (var x in myresult2) {
        text +=
          "<tr><td>" +
          myresult2[x].schoollevelcol +
          "</td><td>" +
          myresult2[x].yearlevelcol +
          "</td><td>" +
          myresult2[x].payment_typecol +
          "</td><td>" +
          myresult2[x].particularcol +
          "</td><td>" +
          myresult2[x].amount +
          "</td><td>" +
          myresult2[x].discount +
          "</td></tr>";
      }
      document.getElementById("paymentplanamounttableresult").innerHTML =
        headertbl + text;
      clickabletable();
    } else {
      document.getElementById("paymentplanamounttableresult").innerHTML =
        headertbl;
    }
    //////////////////////////////////
  }

  ///////////////////////////////////////////////////////////////////////////
  ////////////////// this is used to display clickable table ////////////////
  ///////////////////////////////////////////////////////////////////////////
  function clickabletable() {
    var table = document.getElementById("paymentplanamounttableresult");

    for (var i = 1; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
        //document.getElementById("idnumber").value = this.cells[0].innerHTML;
        displaydatafromtable(
          this.cells[0].innerHTML,
          this.cells[1].innerHTML,
          this.cells[2].innerHTML,
          this.cells[3].innerHTML,
          this.cells[4].innerHTML,
          this.cells[5].innerHTML
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
    amount,
    discount
  ) {
    document.getElementById("paymentplanamountschoolleveldataid").value =
      schoollevel;
    document.getElementById("paymentplanamountyearleveldataid").value =
      yearlevel;
    document.getElementById("paymentplanamountpaymenttypedataid").value =
      paymenttype;
    document.getElementById("paymentplanamountparticulardataid").value =
      particular;
    document.getElementById("paymentplanamountamountid").value = amount;
    document.getElementById("paymentplanamountdiscountid").value = discount;
  }
  ///////////////////////////////////////////////////////////////////////////

  async function update() {
    var schoollevel = document.getElementById(
      "paymentplanamountschoolleveldataid"
    ).value;
    var yearlevel = document.getElementById(
      "paymentplanamountyearleveldataid"
    ).value;
    var paymenttype = document.getElementById(
      "paymentplanamountpaymenttypedataid"
    ).value;
    var particular = document.getElementById(
      "paymentplanamountparticulardataid"
    ).value;

    var amount = document.getElementById("paymentplanamountamountid").value;
    var discount = document.getElementById("paymentplanamountdiscountid").value;

    let formData = new FormData();
    formData.append("schoollevel", schoollevel);
    formData.append("yearlevel", yearlevel);
    formData.append("paymenttype", paymenttype);
    formData.append("particulars", particular);

    formData.append("amount", amount);
    formData.append("discount", discount);

    let response = await fetch(
      "/api/superadmin/accounting/paymentplanamount/updatepaymentplanamount",
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

  if (options == "loadschoollevel") {
    loadschoollevel();
  }

  if (options == "loadyearlevel") {
    loadyearlevel();
  }

  if (options == "loadpaymenttype") {
    loadpaymenttype();
  }

  if (options == "displaytable") {
    displaytable();
  }

  if (options == "update") {
    update();
  }

  function loadalert() {
    alert("payment plan amount updated successfully");
  }
}
