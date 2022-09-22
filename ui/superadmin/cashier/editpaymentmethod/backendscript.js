function editpaymentmethodfunc(options) {
  async function displaydropdown() {
    document.getElementById("cashiereditpaymentmethodid").innerHTML = "";
    //////// get payment method dropdown data /////
    let response1 = await fetch(
      "/api/superadmin/cashier/editpaymentmethod/displaypaymentmethod",
      {
        method: "GET",
      }
    );
    let myresult1 = await response1.json();
    if (myresult1) {
      var text = "";
      for (var x in myresult1) {
        text += "<option>" + myresult1[x].paymentmethodcol + "</option>";
      }
      document.getElementById("cashiereditpaymentmethodid").innerHTML = text;
      editpaymentmethodfunc("displayspecificdropdown");
    }
    /////////////////////////////
  }

  async function displayspecificdropdown() {
    var paymentmethod = document.getElementById(
      "cashiereditpaymentmethodid"
    ).value;
    //////// get payment method dropdown data /////
    let response1 = await fetch(
      "/api/superadmin/cashier/editpaymentmethod/displayspecificpaymentmethod?paymentmethod=" +
        paymentmethod,
      {
        method: "GET",
      }
    );
    let myresult1 = await response1.json();
    if (myresult1) {
      document.getElementById("cashierpaymentmethoddataid").value =
        myresult1[0].paymentmethodcol;
      document.getElementById("cashieraccountnamedataid").value =
        myresult1[0].accountnamecol;
      document.getElementById("cashieraccountnumberdataid").value =
        myresult1[0].accountnumbercol;
    }
    /////////////////////////////
  }

  async function addnewdata() {
    var paymentmethod = document.getElementById(
      "cashierpaymentmethoddataid"
    ).value;
    var accountname = document.getElementById("cashieraccountnamedataid").value;
    var accountnumber = document.getElementById(
      "cashieraccountnumberdataid"
    ).value;

    let formData = new FormData();
    formData.append("paymentmethod", paymentmethod);
    formData.append("accountname", accountname);
    formData.append("accountnumber", accountnumber);

    let response = await fetch(
      "/api/superadmin/cashier/editpaymentmethod/inserpaymentmethod",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      loadalert();
      displaydropdown();
    } else {
      alert("Invalid");
    }
  }

  async function deletedata() {
    var paymentmethod = document.getElementById(
      "cashiereditpaymentmethodid"
    ).value;

    let formData = new FormData();
    formData.append("paymentmethod", paymentmethod);

    let response = await fetch(
      "/api/superadmin/cashier/editpaymentmethod/deletepaymentmethod",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "invalid") {
      loadalert();
      displaydropdown();
    } else {
      alert("Invalid");
    }
  }

  if (options == "displaydropdown") {
    displaydropdown();
  }

  if (options == "displayspecificdropdown") {
    displayspecificdropdown();
  }

  if (options == "addnew") {
    addnewdata();
  }

  if (options == "delete") {
    deletedata();
  }

  function loadalert() {
    // alert here
  }
}
