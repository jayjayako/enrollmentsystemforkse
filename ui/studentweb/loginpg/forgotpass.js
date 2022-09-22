// F O R G O T P A S S W O R D //
var globalemailvariable;
const forgotpass = document.querySelector("#fgotpage");
const verif = document.querySelector("#verfpgcontent-page");
const cpass = document.querySelector("#cngpass");
const succng = document.querySelector("#successcng");

forgotpass.style.display = "none";
verif.style.display = "none";
cpass.style.display = "none";
succng.style.display = "none";

function fpass() {
  const forgotpass = document.querySelector("#fgotpage");
  const logpage = document.querySelector("#log-page");

  forgotpass.style.display = "block";
  logpage.style.display = "none";
}

function verf() {
  const verif = document.querySelector("#verfpgcontent-page");
  const forgotpass = document.querySelector("#fgotpage");

  verif.style.display = "block";
  forgotpass.style.display = "none";
}

function cngpass() {
  const cpass = document.querySelector("#cngpass");
  const verif = document.querySelector("#verfpgcontent-page");

  cpass.style.display = "block";
  verif.style.display = "none";
}

function succcng() {
  const succng = document.querySelector("#successcng");
  const cpass = document.querySelector("#cngpass");

  succng.style.display = "block";
  cpass.style.display = "none";
}

function forgotpasswordfunction(options) {
  async function forgotpasswordsendemail() {
    //////// send otp to email /////
    var email = document.getElementById("emailtext").value;
    let formData = new FormData();
    formData.append("email", email);
    let response = await fetch(
      "/api/studentwebbackend/resetpassword/resetaccount",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id == "success") {
      globalemailvariable = email;
      verf();
    } else {
      alert("Invalid");
    }
    ////////////////////////////////
  }

  async function forgotpasswordresendemail() {
    //////// resend otp to email /////
    let formData = new FormData();
    formData.append("email", globalemailvariable);
    let response = await fetch(
      "/api/studentwebbackend/resetpassword/resetaccount",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id == "success") {
      alert("otp is resend");
    } else {
      alert("Invalid");
    }
    ////////////////////////////////
  }

  async function forgotpasswordsendotp() {
    //////// send otp to confirm /////
    var otpcode = document.getElementById("otptext").value;
    let formData = new FormData();
    formData.append("otpcode", otpcode);
    let response = await fetch(
      "/api/studentwebbackend/resetpassword/checksentcode/" +
        globalemailvariable,
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id == "success") {
      cngpass();
    } else {
      alert("Invalid");
    }
    ////////////////////////////////
  }

  async function forgotpasswordchangepassword() {
    //////// send change password /////
    var newpassword = document.getElementById("newpasswordtext").value;
    var confirmpassword = document.getElementById("confirmpasswordtext").value;
    let formData = new FormData();
    formData.append("newpassword", newpassword);
    formData.append("confirmpassword", confirmpassword);
    let response = await fetch(
      "/api/studentwebbackend/resetpassword/updatepassword",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id == "success") {
      succcng();
    } else {
      alert("Invalid \n" + myresult[0].error);
    }
    ////////////////////////////////
  }

  if (options == "sendemail") {
    forgotpasswordsendemail();
  }
  if (options == "resendemail") {
    forgotpasswordresendemail();
  }
  if (options == "sendotp") {
    forgotpasswordsendotp();
  }
  if (options == "changepassword") {
    forgotpasswordchangepassword();
  }
}
