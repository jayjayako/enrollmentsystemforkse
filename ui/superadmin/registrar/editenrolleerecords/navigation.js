/////////////////// this is for tab functions ////////////
function tabfunction(evt, tabname) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabname).style.display = "block";
  evt.currentTarget.className += " active";
  if (tabname == "tab1") {
    editenrolleerecordsnewstudent("displaystudenttable");
  }
  if (tabname == "tab2") {
    editenrolleerecordsoldstudent("displaystudenttable");
  }
  if (tabname == "tab3") {
    editenrolleerecordstransfereestudent("displaystudenttable");
  }
  if (tabname == "tab4") {
    editenrolleerecordsforeignerstudent("displaystudenttable");
  }
}

/////////////////////////////////////////////////////////
