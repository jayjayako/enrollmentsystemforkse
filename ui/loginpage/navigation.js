async function loadalldata() {
  await includeHTML();
  setTimeout(loginfunct, 200, "checkuser");
}
loadalldata();

function forgotpassword() {
  location.replace("../forgotpassword/forgot_passwordpage");
}
