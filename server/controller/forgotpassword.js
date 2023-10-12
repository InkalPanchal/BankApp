const UserModel = require("../models/User");

const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const globalConfig = require("../Authentication/global.config");

class forgotPasswordController {
  static async sendResetLink(req, res) {
    try {
      const user = await UserModel.findOne({ Email: req.body.email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { Email, _id } = user;
      const token = jwt.sign({ Email, _id }, globalConfig.secretKey, {
        algorithm: globalConfig.algorithm,
        expiresIn: globalConfig.expiredIn,
      });

      const transporter = nodemailer.createTransport({
        host: "mail.mailtest.radixweb.net",
        port: 587,
        secure: false,
        auth: {
          user: "testdotnet@mailtest.radixweb.net",
          pass: "Radix@web#8",
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });
      const resetLink = `http://localhost:3000/resetPassword/${token}`;
      const mailOptions = {
        from: "testdotnet@mailtest.radixweb.net",
        to: "panchalinkal15@gmail.com",
        subject: "Password reset",
        html: `Click <a href="${resetLink}">here</a> to reset your password.`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({
        msg: "Password reset email sent successfully.",
        token: token,
      });
    } catch (ex) {
      res.status(500).json({
        msg: "Error sending password reset email:",
        error: ex,
      });
    }
  }

  static async resetPassword(req, res) {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
      const decodedToken = jwt.verify(token, globalConfig.secretKey);
      const user = await UserModel.findById(decodedToken._id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.Password = hashedPassword;
      await user.save();

      res.status(200).json({
        msg: "Password reset successful",
        data: user,
      });
    } catch (ex) {
      res.status(500).json({
        msg: "Error while fetching users.",
        error: ex,
      });
    }
  }
}

module.exports = forgotPasswordController;
