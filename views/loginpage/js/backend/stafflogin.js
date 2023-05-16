async function stafflogin() {
  try {
    let username = document.getElementById("staffusernametext").value;
    let password = document.getElementById("staffpasswordtext").value;
    let getdata = {
      username: username,
      password: password,
    };
    let response = await axios.post("/api/auth/stafflogin", getdata, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.status == "success") {
      if (response.data.position == "superadmin") {
        location.replace("../superadminpage");
      }
      if (response.data.position == "admin") {
        location.replace("../adminpage");
      }
      if (response.data.position == "staff") {
        location.replace("../staffpage");
      }
    } else {
      alert("Invalid");
    }
  } catch (error) {
    alert(error);
  }
}
