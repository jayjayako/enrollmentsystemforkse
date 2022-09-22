var verifypaymentglobalvar, verifypaymentglobalstudentidvar;

//// when table is clicked the information is also displayed on the student info modal /////
async function displayclickabletableverifypayment(superid) {
  let response = await fetch(
    "/api/superadmin/cashier/verifypayment/displayspecifictable?superid=" +
      superid,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  if (myresult) {
    verifypaymentglobalvar = superid;
    verifypaymentglobalstudentidvar = myresult[0].id;
    ////////////////// for displaying student picture /////////////
    if (myresult[0].picture == "../../img/defaultimg.png") {
      document.getElementById("verifypaymentpictureid").src =
        "../../img/defaultimg.png";
    } else {
      document.getElementById("verifypaymentpictureid").src =
        "/api/superadmin/accessfiles?studid=" +
        myresult[0].id +
        "&filemethod=view&filename=" +
        myresult[0].picture;

      document.getElementById("proofofpaymentpictureid").src =
        "/api/superadmin/accessfiles?studid=" +
        myresult[0].id +
        "&filemethod=view&filename=" +
        myresult[0].filename;
    }
    ///////////////////////////////////////////////////////////////
    document.getElementById("verifypaymentenrolleename").innerHTML =
      myresult[0].lastname + " " + myresult[0].firstname;
    ///////// for personal info ////////
    document.getElementById("infolastname").value = myresult[0].lastname;
    document.getElementById("infofirstname").value = myresult[0].firstname;
    document.getElementById("infobirthdate").value = myresult[0].birthdate;
    document.getElementById("infogender").value = myresult[0].gender;
    document.getElementById("infoaddress").value = myresult[0].address;
    document.getElementById("infocontactno").value = myresult[0].contact_no;
    ////////////////////////////////////
    ///////////// for payment //////////
    document.getElementById("displaypaymenttype").value =
      myresult[0].paymenttypecol;
    document.getElementById("displaypaymentmethod").value =
      myresult[0].paymentmethodcol;
    document.getElementById("paidamountid").value = myresult[0].amount;
    ////////////////////////////////////
  }
  displayalltotalpaymentverifypayment(superid);
}
//////////////////////////////////////////////////////////////////////

/////////////////////// display all payment function /////////////////
async function displayalltotalpaymentverifypayment(superid) {
  let response = await fetch(
    "/api/superadmin/cashier/verifypayment/displayallpayment?superid=" +
      superid,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  if (myresult[0].totalamount) {
    document.getElementById("displayalltotalpayments").value =
      myresult[0].totalamount;
  }
}
//////////////////////////////////////////////////////////////////////
function verifypaymentfunc(options) {
  async function displayschoollevel() {
    //////// get school level data /////
    let response1 = await fetch(
      "/api/superadmin/cashier/verifypayment/displayschoollevel",
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
      document.getElementById("verifypaymentschoollevelid").innerHTML = text;
      verifypaymentfunc("displayyearlevel");
    }
    /////////////////////////////
  }

  async function displayyearlevel() {
    var schoollevel = document.getElementById(
      "verifypaymentschoollevelid"
    ).value;

    //////// get school level data /////
    let response1 = await fetch(
      "/api/superadmin/cashier/verifypayment/displayyearlevel?schoollevel=" +
        schoollevel,
      {
        method: "GET",
      }
    );
    let myresult1 = await response1.json();
    if (myresult1) {
      var text = "";
      for (var x in myresult1) {
        text += "<option>" + myresult1[x].yearlevelcol + "</option>";
      }
      document.getElementById("verifypaymentyearlevelid").innerHTML = text;
      verifypaymentfunc("displaytable");
    }
    /////////////////////////////
  }
  async function displaytable() {
    document.getElementById("verifypaymenttableid").innerHTML = "";
    var schoollevel = document.getElementById(
      "verifypaymentschoollevelid"
    ).value;
    var yearlevel = document.getElementById("verifypaymentyearlevelid").value;

    let response = await fetch(
      "/api/superadmin/cashier/verifypayment/displaytable?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    var text =
      "<tr><th><div>Last Name</div></th><th><div>First Name</div></th></tr>";
    if (myresult[0].id != "invalid") {
      for (var x in myresult) {
        text +=
          '<tr onclick="' +
          "displayclickabletableverifypayment('" +
          myresult[x].superid +
          "')" +
          '">' +
          "<td>" +
          myresult[x].lastname +
          "</td><td>" +
          myresult[x].firstname +
          "</td></tr>";
      }
      document.getElementById("verifypaymenttableid").innerHTML = text;
    } else {
      document.getElementById("verifypaymenttableid").innerHTML = text;
    }
  }

  //////////////////////// display id filter table //////////////////////
  async function displayidfiltertable() {
    document.getElementById("verifypaymenttableid").innerHTML = "";
    var id = document.getElementById("idfiltertabletextverifypayment").value;
    //////////////////////// get table data //////////////////////
    let response1 = await fetch(
      "/api/superadmin/cashier/verifypayment/filterbyid?idnumber=" + id,
      {
        method: "GET",
      }
    );
    let myresult = await response1.json();
    var text =
      "<tr><th><div>Last Name</div></th><th><div>First Name</div></th></tr>";
    if (myresult[0].id != "invalid") {
      for (var x in myresult) {
        text +=
          "<tr onclick=" +
          '"' +
          "displayclickabletableverifypayment('" +
          myresult[x].superid +
          "')" +
          '"' +
          "><td>" +
          myresult[x].lastname +
          "</td><td>" +
          myresult[x].firstname +
          "</td></tr>";
      }
      document.getElementById("verifypaymenttableid").innerHTML = text;
    } else {
      document.getElementById("verifypaymenttableid").innerHTML = text;
    }
    /////////////////////////////
  }

  /////////////////////////////// paynow ///////////////////////////////
  async function paynow() {
    var paynowtext = document.getElementById("paynowtextid").value;

    let formData = new FormData();
    formData.append("paynowtext", paynowtext);
    let response = await fetch(
      "/api/superadmin/cashier/verifypayment/paynow?superid=" +
        verifypaymentglobalvar,
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id == "success") {
      alert("successfully updated");
    }
  }
  ////////////////////////////////////////////////////////////////////
  ////////////////////////// approve payment /////////////////////////
  async function approvepayment() {
    let response = await fetch(
      "/api/superadmin/cashier/verifypayment/approve?superid=" +
        verifypaymentglobalvar,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id == "success") {
      alert("successfully approved");
      document.getElementById("verifypaymenttableid").innerHTML = "";
      document.getElementById("verifypaymentenrolleename").innerHTML = "";
      verifypaymentfunc("displayschoollevel");
      //sendrealtimemessage("reloadmobilenotifications");
    }
  }
  ////////////////////////////////////////////////////////////////////
  if (options == "displayschoollevel") {
    displayschoollevel();
  }

  if (options == "displayyearlevel") {
    displayyearlevel();
  }

  if (options == "displaytable") {
    displaytable();
  }

  if (options == "idfilter") {
    displayidfiltertable();
  }
  if (options == "paynow") {
    paynow();
  }
  if (options == "approve") {
    approvepayment();
  }
}
