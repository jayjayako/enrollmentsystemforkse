let errortimeout = 0;
async function checkuser() {
  try {
    let response = await fetch("/api/auth/checkuser", {
      method: "GET",
    });
    let myresult = await response.json();
    if (myresult.status == "loggedin") {
      if (myresult.position == "superadmin") {
        location.replace("../superadminpage");
      }
      if (myresult.position == "admin") {
        location.replace("../adminpage");
      }
      if (myresult.position == "staff") {
        location.replace("../staffpage");
      }
    }
    errortimeout = 0;
  } catch (error) {
    errortimeout += 1;
    if (errortimeout >= 5) {
      alert("Opps Network Error!");
    } else {
      errortimeout = 0;
      setTimeout(checkuser, 1000);
    }
  }
}

checkuser();
