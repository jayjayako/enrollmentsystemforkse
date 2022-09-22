function enlistmentfunction(options) {
  async function displayschedule() {
    let response = await fetch(
      "/api/studentwebbackend/enlistment/displayschedule",
      {
        method: "GET",
      }
    );
    let myresult = await response.json();
    if (myresult[0].id == "invalid") {
      alert("Invalid");
    } else {
      document.getElementById("displayscheduleid").src =
        "/api/studentwebbackend/fileschedule/" + myresult[0].filename;
    }
  }

  if (options == "displayschedule") {
    document.getElementById("displaysched").style.display = "block";
    displayschedule();
  }
  if (options == "submitenlistment") {
    async function submitenlistment() {
      var section = document.getElementById("sclvl").value;
      let formData = new FormData();
      formData.append("schoollevel", schoolllevelglobalid);
      formData.append("yearlevel", yearlevelglobalid);
      formData.append("section", section);
      let response = await fetch(
        "/api/studentwebbackend/enlistment/uploadsection?superid=" +
          studentenrolleesuperid,
        {
          method: "POST",
          body: formData,
        }
      );

      let myresult = await response.json();
      if (myresult[0].id == "invalid") {
        alert("Invalid");
      } else {
        alert("Successfully Submitted");
        //sendrealtimemessage("reloadadmindepartment");
        document.getElementById("selectsect").style.display = "none";
        document.getElementById("displaysched").style.display = "none";
        document.getElementById("msg-mdl").style.display = "none";
      }
    }
    submitenlistment();
  }
}
