function uploadpicture() {
  document.getElementById("picture").click();
}
function schoolschedulefunction(options) {
  async function saveschedule() {
    let formData = new FormData();
    formData.append("picture", picture.files[0]);

    let response = await fetch(
      "/api/staff/registrar/schoolschedule/saveschedule",
      {
        method: "POST",
        body: formData,
      }
    );
    let myresult = await response.json();
    if (myresult[0].id != "success") {
      alert("Error Pls try Again");
    } else {
      loadalert();
      //sendrealtimemessage("reloadactivitylog");
    }
  }

  if (options == "updateschoolschedule") {
    saveschedule();
  }
}
