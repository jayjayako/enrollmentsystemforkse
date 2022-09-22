function assesmentfunction(options) {
  async function loadalldata() {
    try {
      /////////////////// display all data from server //////////////////
      let response = await fetch(
        "/api/studentwebbackend/assessment/schoolandyearlevel/displayschoollevel",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      // you can if condition if success or not to ouput something
      if (myresult[0].id == "invalid") {
        alert("empty database");
      } else {
        var text = "";
        for (var x in myresult) {
          text +=
            "<option value='" +
            myresult[x].id +
            "'>" +
            myresult[x].name +
            "</option>";
        }
        document.getElementById("sclvlid").innerHTML = text;
        yearlevel();
      }
    } catch (error) {
      alert("network error");
    }
  }

  async function yearlevel() {
    let schoollevel = document.getElementById("sclvlid").value;
    let response = await fetch(
      "/api/studentwebbackend/assessment/schoolandyearlevel/displayyearlevel?schoollevel=" +
        schoollevel,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id == "invalid") {
      alert("empty database");
    } else {
      var text = "";
      for (var x in myresult) {
        text +=
          "<option value='" +
          myresult[x].id +
          "'>" +
          myresult[x].name +
          "</option>";
      }
      document.getElementById("yrlvlid").innerHTML = text;
      assesmentfunction("displaypaymentplans");
    }
  }

  async function displaypaymentplans() {
    let schoollevel = document.getElementById("sclvlid").value;
    let yearlevel = document.getElementById("yrlvlid").value;
    let response = await fetch(
      "/api/studentwebbackend/assessment/assessmentfees/displaypaymentplans" +
        "?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id == "invalid") {
      alert("empty database");
    } else {
      var text =
        "<tr><th>Payment Type</th><th>Amount</th><th>Discount</th></tr>";
      for (var x in myresult) {
        text +=
          "<tr><td>" +
          myresult[x].paymenttype +
          "</td><td>" +
          myresult[x].amount +
          "</td><td>" +
          myresult[x].discount +
          "</td></tr>";
      }
      document.getElementById("paymentplanstbl").innerHTML = text;
      displayotherfees();
    }
  }

  async function displayotherfees() {
    let schoollevel = document.getElementById("sclvlid").value;
    let yearlevel = document.getElementById("yrlvlid").value;
    let response = await fetch(
      "/api/studentwebbackend/assessment/assessmentfees/displayotherfees" +
        "?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id == "invalid") {
      alert("empty database");
    } else {
      var text = "<tr><th>Particulars</th><th>Amount</th></tr>";
      for (var x in myresult) {
        text +=
          "<tr><td>" +
          myresult[x].particular +
          "</td><td>" +
          myresult[x].amount +
          "</td></tr>";
      }
      document.getElementById("otherfeestbl").innerHTML = text;
      displaypaymenttype();
    }
  }

  async function displaypaymenttype() {
    let schoollevel = document.getElementById("sclvlid").value;
    let yearlevel = document.getElementById("yrlvlid").value;
    let response = await fetch(
      "/api/studentwebbackend/assessment/assessmentfees/displaypaymenttype" +
        "?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id == "invalid") {
      alert("empty database");
    } else {
      var text = "";
      for (var x in myresult) {
        text +=
          "<option value='" +
          myresult[x].payment_typecol +
          "'>" +
          myresult[x].payment_typecol +
          "</option>";
      }
      document.getElementById("paymenttypedropdownid").innerHTML = text;
      displaypaymenttypetable();
    }
  }

  async function displaypaymenttypetable() {
    let schoollevel = document.getElementById("sclvlid").value;
    let yearlevel = document.getElementById("yrlvlid").value;
    let paymenttype = document.getElementById("paymenttypedropdownid").value;
    let response = await fetch(
      "/api/studentwebbackend/assessment/assessmentfees/displaypaymenttypetable" +
        "?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel +
        "&paymenttype=" +
        paymenttype,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id == "invalid") {
      alert("empty database");
    } else {
      var text = "<th id='paymenttypeselectedtblid' colspan='3'></th>";
      for (var x in myresult) {
        text +=
          "<tr><td>" +
          myresult[x].paymenttype +
          "</td><td>" +
          myresult[x].particular +
          "</td><td>" +
          myresult[x].finalamount +
          "</td></tr>";
      }
      var dropdownid = document.getElementById("paymenttypedropdownid").value;
      document.getElementById("paymenttypeselectedid").innerHTML = dropdownid;
      displaytotalpayments(
        schoollevel,
        yearlevel,
        paymenttype,
        text,
        dropdownid
      );
    }
  }

  async function displaytotalpayments(
    schoollevel,
    yearlevel,
    paymenttype,
    text,
    dropdownid
  ) {
    let response = await fetch(
      "/api/studentwebbackend/assessment/assessmentfees/displaytotalpaymentplansotherfees" +
        "?schoollevel=" +
        schoollevel +
        "&yearlevel=" +
        yearlevel +
        "&paymenttype=" +
        paymenttype,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id == "invalid") {
      alert("empty database");
    } else {
      text +=
        "<tr><td class='total-label' colspan='2'>Total</td><td class='total-value'>" +
        myresult[0].amount +
        "</td></tr>";
      document.getElementById("paymenttypetblid").innerHTML = text;
      document.getElementById("paymenttypeselectedtblid").innerHTML =
        dropdownid;
      document.getElementById("amountneedtopayid").innerHTML =
        "P" + myresult[0].amount;
    }
  }

  async function displaypaymentmethod() {
    let response = await fetch(
      "/api/studentwebbackend/payment/displaypaymentmethod",
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id == "invalid") {
      alert("empty database");
    } else {
      var text = "";
      for (var x in myresult) {
        text +=
          "<option value='" +
          myresult[x].paymentmethod +
          "'>" +
          myresult[x].paymentmethod +
          "</option>";
      }
      document.getElementById("paymentmethoddropdownid").innerHTML = text;
      displaymethodaccount();
    }
  }
  async function displaymethodaccount() {
    var selectedpaymentmeth = document.getElementById(
      "paymentmethoddropdownid"
    ).value;
    let response = await fetch(
      "/api/studentwebbackend/payment/displaypaymentmethodaccount" +
        "?paymentmethod=" +
        selectedpaymentmeth,
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id == "invalid") {
      alert("empty database");
    } else {
      document.getElementById("paymentmethodaccountnameid").innerHTML =
        myresult[0].accountname;
      document.getElementById("paymentmethodaccountnoid").innerHTML =
        myresult[0].accountnumber;
    }
  }

  async function uploadassessment() {
    var schoollevel = document.getElementById("sclvlid").value;
    var yearlevel = document.getElementById("yrlvlid").value;
    var paymenttype = document.getElementById("paymenttypedropdownid").value;
    var paymentmethod = document.getElementById(
      "paymentmethoddropdownid"
    ).value;
    var proofpaymentamountid = document.getElementById(
      "proofpaymentamountid"
    ).value;

    let formData = new FormData();
    formData.append("schoollevel", schoollevel);
    formData.append("yearlevel", yearlevel);
    formData.append("paymenttype", paymenttype);
    formData.append("paymentmethod", paymentmethod);
    formData.append("receipt", proofpaymentid.files[0]);
    formData.append("proofpaymentamount", proofpaymentamountid);
    let response = await fetch(
      "/api/studentwebbackend/payment/uploadpayment?superid=" +
        studentenrolleesuperid,
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      //sendrealtimemessage("reloadverifypayment");
      assesmentfunction("displayuploadpaysuccess");
    } else {
      alert("Invalid");
    }
  }

  if (options == "uploadassessment") {
    uploadassessment();
  }

  if (options == "displaymethodaccount") {
    displaymethodaccount();
  }

  if (options == "displaypaymentmethod") {
    displaypaymentmethod();
  }

  if (options == "updatedpaymenttype") {
    displaypaymenttypetable();
  }

  if (options == "loadalldata") {
    loadalldata();
  }
  if (options == "yearlevel") {
    yearlevel();
  }
  if (options == "displaypaymentplans") {
    displaypaymentplans();
  }
  if (options == "displaytuitionotherfees") {
    document.getElementById("tuitionfee").style.display = "block";
  }

  if (options == "displaytypeofpayment") {
    document.getElementById("seltypepay").style.display = "block";
    displaypaymenttype();
  }
  if (options == "displaypaymentmethod") {
    document.getElementById("selmd-paymt").style.display = "block";
    displaypaymentmethod();
  }
  if (options == "displayuploadpayment") {
    document.getElementById("payamt").style.display = "block";
  }
  if (options == "displayuploadpaysuccess") {
    document.getElementById("paysub").style.display = "block";
  }
}

function getproofpayment() {
  document.getElementById("proofpaymentid").click();
}
