document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});

// document.getElementsByClassName("toggle").addEventListener("click", menuToggle);

function menuToggle() {
  // alert("HELLO WORLD");
  let menuToggle = document.querySelector(".toggle");
  let navigation = document.querySelector(".sidenav-dash");
  menuToggle.classList.toggle("active");
  navigation.classList.toggle("active");
}

window.onmouseover = function sidenavi() {
  // add active class in selected item list item
  let list = document.querySelectorAll(".list");
  for (let i = 0; i < list.length; i++) {
    list[i].onclick = function () {
      let j = 0;
      while (j < list.length) {
        list[j++].className = "list";
      }
      list[i].className = "list active";
    };
  }
};

// let menuToggle = document.querySelector('.toggle');
// let navigation = document.querySelector('.sidenav-dash')
// menuToggle.onclick = function(){
//     menuToggle.classList.toggle('active');
//     navigation.classList.toggle('active');
// }

// MAIN PAGE -- LOGIN PAGE
function mainpg() {
  location.replace("/studentweb/loginpg");
}
//NAVIGATE TO FORGOT PASSWORD PAGE

//NAVIGATE TO LOGIN PAGE
function loginpg() {
  location.replace("/studentweb/loginpg");
}

function verfpg() {
  document.getElementById("fpasscontent-page").style.display = "none";
  document.getElementById("verfpgcontent-page").style.display = "flex";
}

//NAVIGATE TO THE REGISTER PAGE

function regpg() {
  location.replace("/studentweb/registerpg");
}

//NAVIGATE TO THE DASHBOARD
function dashpg() {
  // window.location.href = 'dashboard.html';
  location.replace("/studentweb/dashboard");
}
