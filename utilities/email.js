const nodemailer = require("nodemailer");
//cannot use exports here because it always exports the 

const sendEmail = async (options) => {
  //it is create as a transport from where you need to send the Mail
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "227123ca1de8ed",
      pass: "ea4492ad58b217"
    }
  });
  const mailOptions = {
    from: "Ifham Shakil <ifan@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:options.html
  };

  // Actually Send the Email
  await transport.sendMail(mailOptions);
};
module.exports=sendEmail;
