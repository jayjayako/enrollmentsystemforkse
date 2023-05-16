require("dotenv").config();

const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  scopes: SCOPES,
});

const drive = google.drive({
  version: "v3",
  auth: auth,
});

module.exports = {
  drive: drive,
};
