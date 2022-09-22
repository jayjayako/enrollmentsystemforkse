var viewstudentbalanceglobalvar, viewstudentbalanceglobalstudentidvar;

//// when table is clicked the information is also displayed on the student info modal /////
async function displayclickabletableviewstudentbalance(superid) {
  let response = await fetch(
    "/api/superadmin/cashier/viewstudentbalance/displayspecifictable?superid=" +
      superid,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  if (myresult) {
    viewstudentbalanceglobalvar = superid;
    viewstudentbalanceglobalstudentidvar = myresult[0].id;
    ////////////////// for displaying student picture /////////////
    if (myresult[0].picture == "../../img/defaultimg.png") {
      document.getElementById("viewstudentbalancepictureid").src =
        "../../img/defaultimg.png";
    } else {
      document.getElementById("viewstudentbalancepictureid").src =
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
    ///////// for personal info ////////
    document.getElementById("infolastname").value = myresult[0].lastname;
    document.getElementById("infofirstname").value = myresult[0].firstname;
    document.getElementById("infobirthdate").value = myresult[0].birthdate;
    document.getElementById("infogender").value = myresult[0].gender;
    document.getElementById("infoaddress").value = myresult[0].address;
    document.getElementById("infocontactno").value = myresult[0].contact_no;

    document.getElementById("paidamountid").value = myresult[0].amount;
    document.getElementById("displaypaymenttype").value =
      myresult[0].contact_no;
    document.getElementById("displaypaymentmethod").value =
      myresult[0].contact_no;
    ////////////////////////////////////
    ///////////// for balance //////////
    document.getElementById("wholenamebalance").value =
      myresult[0].lastname + " " + myresult[0].firstname;
    document.getElementById("idnumberbalance").value = myresult[0].id;
    document.getElementById("schoolevelbalance").value =
      myresult[0].schoollevelcol;
    document.getElementById("yearlevelbalance").value =
      myresult[0].yearlevelcol;
    document.getElementById("paymenttypebalance").value =
      myresult[0].paymentmethodcol;
    document.getElementById("totalbalancebalance").value =
      myresult[0].totalbalance;
    document.getElementById("paidamountbalance").value = myresult[0].amount;
    ////////////////////////////////////
  }
  displayalltotalpaymentviewstudentbalance(superid);
}
//////////////////////////////////////////////////////////////////////

/////////////////////// display all payment function /////////////////
async function displayalltotalpaymentviewstudentbalance(superid) {
  let response = await fetch(
    "/api/superadmin/cashier/viewstudentbalance/displayallbalancepayment?superid=" +
      superid,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  if (myresult[0].totalpayments) {
    document.getElementById("displayalltotalpayments").value =
      myresult[0].totalpayments;
  }
}
//////////////////////////////////////////////////////////////////////
function viewstudentbalancefunc(options) {
  async function displayschoollevel() {
    //////// get school level data /////
    let response1 = await fetch(
      "/api/superadmin/cashier/viewstudentbalance/displayschoollevel",
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
      document.getElementById("viewstudentbalanceschoollevelid").innerHTML =
        text;
      viewstudentbalancefunc("displayyearlevel");
    }
    /////////////////////////////
  }

  async function displayyearlevel() {
    var schoollevel = document.getElementById(
      "viewstudentbalanceschoollevelid"
    ).value;

    //////// get school level data /////
    let response1 = await fetch(
      "/api/superadmin/cashier/viewstudentbalance/displayyearlevel?schoollevel=" +
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
      document.getElementById("viewstudentbalanceyearlevelid").innerHTML = text;
      viewstudentbalancefunc("displaytable");
    }
    /////////////////////////////
  }
  async function displaytable() {
    document.getElementById("viewstudentbalancetableid").innerHTML = "";
    var schoollevel = document.getElementById(
      "viewstudentbalanceschoollevelid"
    ).value;
    var yearlevel = document.getElementById(
      "viewstudentbalanceyearlevelid"
    ).value;

    let response = await fetch(
      "/api/superadmin/cashier/viewstudentbalance/displaytable?schoollevel=" +
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
          "displayclickabletableviewstudentbalance('" +
          myresult[x].superid +
          "')" +
          '">' +
          "<td>" +
          myresult[x].lastname +
          "</td><td>" +
          myresult[x].firstname +
          "</td></tr>";
      }
      document.getElementById("viewstudentbalancetableid").innerHTML = text;
    } else {
      document.getElementById("viewstudentbalancetableid").innerHTML = text;
    }
  }

  //////////////////////// display id filter table //////////////////////
  async function displayidfiltertable() {
    document.getElementById("viewstudentbalancetableid").innerHTML = "";
    var id = document.getElementById(
      "idfiltertabletextviewstudentbalance"
    ).value;
    //////////////////////// get table data //////////////////////
    let response1 = await fetch(
      "/api/superadmin/cashier/viewstudentbalance/filterbyid?idnumber=" + id,
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
          "displayclickabletableviewstudentbalance('" +
          myresult[x].superid +
          "')" +
          '"' +
          "><td>" +
          myresult[x].lastname +
          "</td><td>" +
          myresult[x].firstname +
          "</td></tr>";
      }
      document.getElementById("viewstudentbalancetableid").innerHTML = text;
    } else {
      document.getElementById("viewstudentbalancetableid").innerHTML = text;
    }
    /////////////////////////////
  }

  ////////////////////////// approve payment /////////////////////////
  async function approvepayment() {
    let response = await fetch(
      "/api/superadmin/cashier/viewstudentbalance/approvebalance?superid=" +
        viewstudentbalanceglobalvar,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id == "success") {
      alert("successfully approved");
      document.getElementById("viewstudentbalancetableid").innerHTML = "";
      viewstudentbalancefunc("displayschoollevel");
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

  if (options == "approve") {
    approvepayment();
  }
}
