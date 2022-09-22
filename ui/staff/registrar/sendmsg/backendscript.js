//////////////////////// send message to student ////////////////////////
async function sendmessage() {
  var message = document.getElementById("messageid").value;
  let response = await fetch(
    "/api/staff/registrar/sendmessage/sendmessageenrollee?superid=" +
      studentsuperidglobalvar +
      "&msgtype=" +
      "inquiry" +
      "&message=" +
      message,
    {
      method: "GET",
    }
  );
  let myresult = await response.json();
  if (myresult[0].id == "success") {
    alert("sent successfuly");
    enrollmentreservationfunction("loadtable");
    //sendrealtimemessage("reloadactivitylog");
    //sendrealtimemessage("reloadmobilenotifications");
  }
}
/////////////////////////////////////////////////////////////////////////
