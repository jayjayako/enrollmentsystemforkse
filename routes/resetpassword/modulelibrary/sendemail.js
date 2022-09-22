const nodemailer = require("nodemailer");
require("dotenv").config();

function sendemail(myresult, myrandomstring) {
  let fromMail = process.env.FROMMAIL;
  let password = process.env.MAILPASS;
  let toMail = myresult;
  let subject = process.env.SUBJECT;
  let text = myrandomstring;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: fromMail,
      pass: password,
    },
  });

  let mailOptions = {
    from: fromMail,
    to: toMail,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    }
    console.log(response);
    transporter.close();
  });
}

module.exports = {
  sendemail: sendemail,
};
