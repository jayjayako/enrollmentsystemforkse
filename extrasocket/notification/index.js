require("dotenv").config();
const webpush = require("web-push");

function sendnotif(strsubscription, payload) {
  webpush.setVapidDetails(
    process.env.WEBPUSHMAILTO,
    process.env.PUBLICVAPIDKEY,
    process.env.PRIVATEVAPIDKEY
  );
  webpush
    .sendNotification(JSON.parse(strsubscription), payload)
    .catch((err) => console.error(err));
}

module.exports = { sendnotif: sendnotif };
