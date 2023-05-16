document.addEventListener("click", (e) => {
  const dropdownmenu = e.target.matches("[data-dropdown-button]");
  if (!dropdownmenu && e.target.closest("[data-dropdown]") != null) return;

  let currentDropdown;
  if (dropdownmenu) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});
