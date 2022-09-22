var accountactualbalance;
function accountbalancefunction(options) {
  async function displayalldata() {
    let response = await fetch(
      "/api/studentwebbackend/balance/displaytotalbalance",
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id != "0") {
      document.getElementById("accountbalanceid").innerHTML =
        myresult[0].totalbalance;
      accountactualbalance = "P" + myresult[0].totalbalance;
    } else {
      document.getElementById("accountbalanceid").innerHTML =
        "P" + myresult[0].id;
      accountactualbalance = "P" + myresult[0].id;
    }

    displaybalancetable();
  }

  async function displaybalancetable() {
    let response = await fetch(
      "/api/studentwebbackend/balance/displaypaymenthistory",
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    // you can if condition if success or not to ouput something
    if (myresult[0].id == "invalid") {
      alert("Empty Database");
    } else {
      var text = "<th>Type of Payment</th><th>Amount</th>";
      for (var x in myresult) {
        text +=
          "<tr><td>" +
          myresult[x].paymenttypecol +
          "</td><td>" +
          myresult[x].amount +
          "</td></tr>";
      }
      document.getElementById("accountbalancetableid").innerHTML = text;
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
      document.getElementById("accountbalancepaymentmethod").innerHTML = text;
      displaymethodaccount();
    }
  }

  async function displaymethodaccount() {
    var selectedpaymentmeth = document.getElementById(
      "accountbalancepaymentmethod"
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
      document.getElementById("accountblncemethodaccountnameid").innerHTML =
        myresult[0].accountname;
      document.getElementById("accountblncemethodaccountnoid").innerHTML =
        myresult[0].accountnumber;
    }
  }

  async function uploadbalance() {
    var proofpaymentbalanceamount = document.getElementById(
      "proofpaymentbalanceamountid"
    ).value;
    var paymentmethod = document.getElementById(
      "accountbalancepaymentmethod"
    ).value;

    let formData = new FormData();
    formData.append("proofpaymentamount", proofpaymentbalanceamount);
    formData.append("paymentmethod", paymentmethod);
    formData.append("receipt", balanceproofpaymentid.files[0]);
    let response = await fetch(
      "/api/studentwebbackend/balance/uploadstudentbalance",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      alert("Success");
      sendrealtimemessage("reloadviewstudentbalance");
    } else {
      alert("Invalid");
    }
  }

  if (options == "uploadbalance") {
    uploadbalance();
  }

  if (options == "displayalldata") {
    displayalldata();
  }

  if (options == "accountbalancepaymentmethod") {
    document.getElementById("acb-selmd-paymt").style.display = "block";
    document.getElementById("totalaccountbalanceid").innerHTML =
      accountactualbalance;
    displaypaymentmethod();
  }

  if (options == "closemethod") {
    document.getElementById("acb-selmd-paymt").style.display = "none";
  }

  if (options == "uploadpay") {
    document.getElementById("acb-payamt").style.display = "block";
  }

  if (options == "closeuploadpay") {
    document.getElementById("acb-payamt").style.display = "none";
  }
}

function getbalanceproofpayment() {
  document.getElementById("balanceproofpaymentid").click();
}
