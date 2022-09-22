var fileidglobalvar;
///////////////// this is for clickable student files table /////////////
function clickablestudentfilestable(filename) {
  fileidglobalvar = filename;
}
/////////////////////////////////////////////////////////////////////////
////////////////// for viewing student picture /////////////
async function viewstudentadmissionfiles() {
  if (editenrolleerecordsglobalstudentid && fileidglobalvar) {
    document.getElementById("fileadmitpicid").src =
      "/api/superadmin/accessfiles?studid=" +
      editenrolleerecordsglobalstudentid +
      "&filemethod=view&filename=" +
      fileidglobalvar;
  }
}
////////////////////////////////////////////////////////////
