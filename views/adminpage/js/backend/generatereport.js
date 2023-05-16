function generatePDF() {
  const element = document.getElementById("adminreport");

  var opt = {
    margin: 1,
    filename: "adminreport.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
}
