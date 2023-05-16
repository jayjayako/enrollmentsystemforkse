//////////////// function for check if <> /////////
async function checkforxss(string) {
  var specialChars = "<>";
  for (i = 0; i < specialChars.length; i++) {
    if (string.indexOf(specialChars[i]) > -1) {
      return true;
    }
  }
  return false;
}
///////////////////////////////////////////////////

//////////////// function for check if numbers /////////
async function checknumbers(string) {
  var specialChars = "0123456789";
  for (i = 0; i < specialChars.length; i++) {
    if (string.indexOf(specialChars[i]) > -1) {
      return true;
    }
  }
  return false;
}
///////////////////////////////////////////////////

//////////// function for check if uppercase //////
async function checkuppercase(string) {
  var specialChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (i = 0; i < specialChars.length; i++) {
    if (string.indexOf(specialChars[i]) > -1) {
      return true;
    }
  }
  return false;
}
///////////////////////////////////////////////////

//////////// function for check if lowercase //////
async function checklowercase(string) {
  var specialChars = "abcdefghijklmnopqrstuvwxyz";
  for (i = 0; i < specialChars.length; i++) {
    if (string.indexOf(specialChars[i]) > -1) {
      return true;
    }
  }
  return false;
}
///////////////////////////////////////////////////

///// function for check if special character /////
async function checkspecialchar(string) {
  var specialChars = "@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  for (i = 0; i < specialChars.length; i++) {
    if (string.indexOf(specialChars[i]) > -1) {
      return true;
    }
  }
  return false;
}
///////////////////////////////////////////////////

module.exports = {
  checkforxss: checkforxss,
  checknumbers: checknumbers,
  checkuppercase: checkuppercase,
  checklowercase: checklowercase,
  checkspecialchar: checkspecialchar,
};
