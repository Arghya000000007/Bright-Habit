const nodemailer = require('nodemailer');

const SendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "599d1974d60d90",
      pass: "312b26054e114a"
    }
  });
  const mailOptions = {
    from: 'Suparno Ghosh<suparnoghosh227@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  await transport.sendMail(mailOptions);
};

module.exports = SendEmail;