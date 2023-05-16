function reportsetdata() {
  const data = {
    name: document.getElementById("reportnameid").value,
  };

  localStorage.setItem("reportdata", JSON.stringify(data));

  alert("Report Set Data Successfully");
}
function reportgetdata() {
  const data = JSON.parse(localStorage.getItem("reportdata"));

  document.getElementById("reportnameid").innerHTML = data.name;
}
