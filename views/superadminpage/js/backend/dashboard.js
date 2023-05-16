let dashboardvar;
const socket = io();

socket.on("connect", () => {
  dashboardvar = Dashboard();
  dashboardvar.displayall();
  dashboardvar.displayactivities();
  dashboardvar.checkuser();
});

function Dashboard() {
  let errortimeout1 = 0,
    errortimeout2 = 0,
    errortimeout3 = 0;
  async function displayall() {
    try {
      let response = await fetch("/api/users/superadmin/dashboard", {
        method: "GET",
      });
      let myresult = await response.json();
      if (myresult.picture == "default") {
      } else {
        document.getElementById("profilepicid").src =
          "/api/users/superadmin/myaccount/profilepic";
      }
      if (myresult.status != "invalid") {
        let name = myresult.name;
        let titlename = document.getElementById("titleid").innerHTML;
        let output = eval("`" + titlename.toString() + "`");
        document.getElementById("titleid").innerHTML = output;
      } else {
        location.replace("../loginpage");
      }
      errortimeout1 = 0;
    } catch (error) {
      errortimeout1 += 1;
      if (errortimeout1 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout1 = 0;
        setTimeout(displayall, 1000);
      }
    }
  }

  async function displayactivities() {
    try {
      let response = await fetch("/api/users/superadmin/dashboard/activities", {
        method: "GET",
      });
      let myresult = await response.json();
      if (myresult.status == "success") {
        let output = "";
        let results = myresult.allresults;
        var value = document.getElementById(
          "dashboardacttable1_template"
        ).innerHTML;
        for (let i in results) {
          output += eval("`" + value.toString() + "`");
        }
        document.getElementById("dashboardacttable1_cont").innerHTML += output;
      }
    } catch (error) {
      errortimeout3 += 1;
      if (errortimeout3 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout3 = 0;
        setTimeout(displayactivities, 1000);
      }
    }
  }

  async function checkuser() {
    try {
      let response = await fetch("/api/auth/checkuser", {
        method: "GET",
      });
      let myresult = await response.json();
      if (myresult.status == "loggedin") {
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
    displayactivities,
    checkuser,
  };
}

function logout() {
  fetch("/api/auth/logout", {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  location.replace("../loginpage");
}
