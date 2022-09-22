var CryptoJS = require("crypto-js");
// this is secret key for encryption
require("dotenv").config();
const secretKey = process.env.SECRETKEY;

//////////////// this is for encrypting cookie from browser /////////
function encodethecookie(sessionid) {
  var encrypted = CryptoJS.AES.encrypt(sessionid, secretKey).toString();
  var encoded = CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Hex);

  return encoded;
}
/////////////////////////////////////////////////////////////////////
//////////////// this is for decyphering cookie from browser /////////
function decypherthecookie(clientcookie) {
  var decoded = CryptoJS.enc.Hex.parse(clientcookie).toString(
    CryptoJS.enc.Base64
  );
  var decrypted = CryptoJS.AES.decrypt(decoded, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}
/////////////////////////////////////////////////////////////////////

module.exports = {
  encodethecookie: encodethecookie,
  decypherthecookie: decypherthecookie,
};
