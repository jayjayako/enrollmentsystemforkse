var errortimeout = 0;
////////////////////// get file function //////////////////
var loadFile = function (event) {
  var output = document.getElementById("myimage");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
};

function uploadprofilepic() {
  document.getElementById("picture").click();
}
//////////////////////////////////////////////////////////
function displaysaccfunct(
  username,
  password,
  lastname,
  firstname,
  birthdate,
  phone,
  email,
  address,
  picture
) {
  document.getElementById("usernametxt").value = username;
  document.getElementById("passwordtxt").value = password;
  document.getElementById("lastnametxt").value = lastname;
  document.getElementById("firstnametxt").value = firstname;
  document.getElementById("birthdatetxt").value = birthdate;
  document.getElementById("phonetxt").value = phone;
  document.getElementById("emailtxt").value = email;
  document.getElementById("addresstxt").value = address;

  ///////////////////////// second /////////////////////////
  document.getElementById("username2").value = username;
  document.getElementById("password2").value = password;
  document.getElementById("lastname2").value = lastname;
  document.getElementById("firstname2").value = firstname;
  document.getElementById("birthdate2").value = birthdate;
  document.getElementById("phonenumber2").value = phone;
  document.getElementById("emailaddress2").value = email;
  document.getElementById("address2").value = address;
  //////////////////////////////////////////////////////////

  if (picture != "../../img/defaultimg.png") {
    document.getElementById("profilepicid").src =
      "/api/superadmin/myfiles/" + picture;
  } else {
    document.getElementById("profilepicid").src = "../../img/defaultimg.png";
  }
}

function accountprofilefunct(options) {
  async function checkuser() {
    try {
      let response = await fetch("/api/superadmin/accountprofile/getaccount", {
        method: "GET",
      });
      let myobj = await response.json();
      if (myobj[0].id != "invalid") {
        displaysaccfunct(
          myobj[0].username,
          myobj[0].password,
          myobj[0].lastname,
          myobj[0].firstname,
          myobj[0].birthdate,
          myobj[0].phone,
          myobj[0].email,
          myobj[0].address,
          myobj[0].picture
        );
        accountprofilefunct("loadactivitylog");
      } else {
        location.replace("../../loginpage");
      }
      errortimeout = 0;
    } catch (error) {
      errortimeout += 1;
      if (errortimeout >= 5) {
        alert("Opps Network Error!");
      } else {
        setTimeout(checkuser, 1000);
      }
    }
  }

  async function editprofilefunc() {
    try {
      var lastname = document.getElementById("lastname2").value;
      var firstname = document.getElementById("firstname2").value;
      var username = document.getElementById("username2").value;
      var password = document.getElementById("password2").value;
      var birthdate = document.getElementById("birthdate2").value;
      var emailaddress = document.getElementById("emailaddress2").value;
      var phonenumber = document.getElementById("phonenumber2").value;
      var address = document.getElementById("address2").value;
      let formData = new FormData();
      formData.append("lastname", lastname);
      formData.append("firstname", firstname);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("birthdate", birthdate);
      formData.append("email", emailaddress);
      formData.append("phonenumber", phonenumber);
      formData.append("address", address);
      formData.append("picture", picture.files[0]);
      let response = await fetch(
        "/api/superadmin/accountprofile/editmyprofile",
        {
          method: "POST",
          body: formData,
        }
      );
      let myobj = await response.json();
      displaysaccfunct(
        myobj[0].username,
        myobj[0].password,
        myobj[0].lastname,
        myobj[0].firstname,
        myobj[0].birthdate,
        myobj[0].phone,
        myobj[0].email,
        myobj[0].address,
        myobj[0].picture
      );
      loadalert();
    } catch (error) {
      alert("Opps Network Error!");
    }
  }

  async function defaultactivitylog() {
    var text =
      "<tr>" +
      "<th><div>Time</div></th>" +
      "<th><div>Activities</div></th>" +
      "<th><div>User Type</div></th>" +
      "<th><div>Year</div></th>" +
      "</tr>";
    document.getElementById("activitylog").innerHTML = text;
  }

  async function loadactivitylog() {
    try {
      let response = await fetch(
        "/api/superadmin/audittrail/displaysuperadminactivitylog",
        {
          method: "GET",
        }
      );
      let myobj = await response.json();
      var myresult = myobj;
      if (myresult[0].id != "invalid") {
        var text =
          "<tr>" +
          "<th><div>Time</div></th>" +
          "<th><div>Activities</div></th>" +
          "<th><div>User Type</div></th>" +
          "<th><div>Year</div></th>" +
          "</tr>";
        for (var x in myresult) {
          text +=
            "<tr><td><div>" +
            myresult[x].time +
            "</div></td><td><div>" +
            myresult[x].activities +
            "</div></td><td><div>" +
            myresult[x].usertype +
            "</div></td><td><div>" +
            myresult[x].year +
            "</div></td></tr>";
        }
        document.getElementById("activitylog").innerHTML = text;
      } else {
        defaultactivitylog();
      }
    } catch (error) {
      alert("error");
    }
  }

  if (options == "checkuser") {
    checkuser();
  }
  if (options == "editprofilefunc") {
    editprofilefunc();
  }
  if (options == "loadactivitylog") {
    loadactivitylog();
  }
  if (options == "defaultactivitylog") {
    defaultactivitylog();
  }
}
