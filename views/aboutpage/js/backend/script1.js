let aboutvar, position_globalvar;
const socket = io();

socket.on("connect", () => {
  aboutvar = Aboutfunc();
  //   dashboardvar.displayall();
  aboutvar.checkuser();
});

function Aboutfunc() {
  let errortimeout1 = 0,
    errortimeout2 = 0;
  async function displayall() {}

  async function checkuser() {
    try {
      let response = await fetch("/api/auth/checkuser", {
        method: "GET",
      });
      let myresult = await response.json();
      if (myresult.status == "loggedin") {
        position_globalvar = myresult.position;
      } else {
        location.replace("../loginpage");
      }
      errortimeout2 = 0;
    } catch (error) {
      errortimeout2 += 1;
      if (errortimeout2 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout2 = 0;
        setTimeout(checkuser, 1000);
      }
    }
  }

  return {
    displayall,
    checkuser,
  };
}

function goback() {
  if (position_globalvar == "superadmin") {
    location.replace("../superadminpage");
  }
  if (position_globalvar == "admin") {
    location.replace("../adminpage");
  }
  if (position_globalvar == "staff") {
    location.replace("../staffpage");
  }
}
