//////////////////////////// modal 1 /////////////////////////////
function openeditaccountmodal() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "block";
  document.getElementById("editaccount").style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closefirstmodal() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "none";
}
//////////////////////////////////////////////////////////////////
// var resolver = 0;
// const loadpage = function () {
//   try {
//     document.getElementById("testid1").value = "qwdsqw";
//   } catch (error) {
//     resolver += 1;
//     if (resolver < 5) {
//       setTimeout(loadpage, 1000);
//       console.log(resolver);
//     } else {
//       alert("page error");
//       resolver = 0;
//     }
//   }
// };

async function loadalldata() {
  await includeHTML();
  setTimeout(accountprofilefunct, 200, "checkuser");
  // setTimeout(loadpage, 100);
}

loadalldata();

function gotohome() {
  location.replace("../dashboard");
}
