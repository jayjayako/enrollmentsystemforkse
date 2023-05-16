function defaultsidenavall() {
  document.getElementById("home").classList.remove("navbtnactive");
  document.getElementById("myaccount").classList.remove("navbtnactive");
  document.getElementById("aboutus").classList.remove("navbtnactive");
  document.getElementById("contactus").classList.remove("navbtnactive");
}

function toggleburgermenu() {
  let navbar = document.querySelector(`[HTMLINCLUDE='leftnavbarid']`);
  let burgerid = document.getElementById("burgermenuid");
  burgerid.classList.toggle("burgerbgcontactive");
  navbar.classList.toggle("drawermenuactive");
  if (document.getElementById("burgermenuopen").style.display == "none") {
    document.getElementById("burgermenuopen").style.display = "block";
    document.getElementById("burgermenuclose").style.display = "none";
  } else {
    document.getElementById("burgermenuopen").style.display = "none";
    document.getElementById("burgermenuclose").style.display = "block";
  }
}
