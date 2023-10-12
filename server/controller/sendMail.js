const nodemailer = require("nodemailer");
class emailController {
  static async sendEmail() {
    // Configure the SMTP transport
    const transporter = nodemailer.createTransport({
      host: "mail.mailtest.radixweb.net",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "testdotnet@mailtest.radixweb.net",
        pass: "Radix@web#8",
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // Email content
    const mailOptions = {
      from: "testdotnet@mailtest.radixweb.net",
      to: "panchalinkal15@gmail.com",
      subject: "Test Email",
      text: "This is a test email from Node.js using nodemailer.",
    };

    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

module.exports = emailController;
