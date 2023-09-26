const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const globalConfig = require("../Authentication/global.config");
const Transaction = require("../models/Transaction");
const nodemailer = require("nodemailer");

// function sendEmail() {
//   var transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "panchalinkal15@gmail.com",
//       pass: "ftjcbdvsqdcrhkfm",
//     },
//   });

//   var mailOptions = {
//     from: "panchalinkal15@gmail.com",
//     to: "panchalinkal15@gmail.com",
//     subject: "Test",
//     html: "<strong>Hello there!</strong>",
//   };

//   transporter.sendMail(mailOptions, function (err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//       console.log("Email sent");
//     }
//   });
// }

// ("use strict");

// const transporter = nodemailer.createTransport({
//   host: "smtp.forwardemail.net",
//   port: 465,
//   secure: true,
//   auth: {
//     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     user: "panchalinkal15@gmail.com",
//     pass: "inkal2000",
//   },
// });

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   //
//   // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
//   //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
//   //       <https://github.com/forwardemail/preview-email>
//   //
// }

// main().catch(console.error);

class UserController {
  static async GetUsers(req, res) {
    try {
      const users = await UserModel.find();
      if (users) {
        // console.log(users);
        res.status(200).json({
          msg: "Users found.",
          data: users,
        });
      }
    } catch (ex) {
      res.status(404).json({
        msg: "Error while fetching users.",
        error: ex,
      });
    }
  }

  static async GetUserById(req, res) {
    try {
      const user = await UserModel.find({ _id: req.params.id });
      if (user) {
        // console.log(user);
        res.status(200).json({
          msg: "User found.",
          data: user,
        });
      }
    } catch (ex) {
      res.status(404).json({
        msg: "Error while fetching user.",
        error: ex,
      });
    }
  }
  //create new account/ signup user
  static async CreateAccount(req, res) {
    try {
      const { Name, Password, Email, MobileNo, DOB } = req.body;
      // console.log(typeof DOB);
      const userExists = await UserModel.findOne({ Email: Email });

      if (userExists) {
        return res.status(409).json({ error: "Email is already registered." });
      }
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      const hashedPassword = await bcrypt.hash(Password, salt);

      const newUser = new UserModel({
        Name: Name,
        Password: hashedPassword,
        Email: Email,
        MobileNo: MobileNo,
        DOB: DOB,
        // Balance: 0,
      });
      await newUser.save();
      res.status(200).json({
        msg: "New account created successfully.",
        data: newUser,
      });
    } catch (ex) {
      res.status(400).json({
        msg: "Error while creating new user.",
        error: ex.message,
      });
    }
  }

  static async Login(req, res) {
    try {
      const { Email, Password } = req.body;
      const users = await UserModel.find();
      // console.log(users);
      const userExists = await UserModel.findOne({ Email: Email });
      if (userExists) {
        const userId = userExists._id;
        const isMatch = await bcrypt.compare(
          Password.toString(),
          userExists.Password
        );
        if (isMatch) {
          const token = jwt.sign({ Email, userId }, globalConfig.secretKey, {
            algorithm: globalConfig.algorithm,
            expiresIn: globalConfig.expiredIn,
          });
          res.cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          console.log("res", res);
          res.status(200).json({
            msg: "User logged in successfully.",
            data: userExists,
            token: token,
          });
        } else {
          res.status(401).json({
            error: "Email/Password is invalid.",
          });
        }
      } else {
        res.status(404).json({
          error: "User is not exist.",
        });
      }
    } catch (ex) {
      res.status(400).json({
        msg: "Error while login the user.",
        error: ex.message,
      });
    }
  }
  static async LogOut(req, res) {
    try {
      req.session = null;
      return res.status(200).json({ msg: "You've been signed out!" });
    } catch (err) {
      this.next(err);
    }
  }
  static async DepositFunds(req, res) {
    try {
      // console.log(token);
      const { userId } = req.body;
      var { amount } = req.body;
      const user = await UserModel.findById(userId);
      if (user) {
        const existedTran = await Transaction.find({
          UserId: userId,
          TransactionType: "Credit",
        });

        var transaction;
        if (existedTran.length === 0 && amount > 100) {
          var reward = amount * 0.1;
          // console.log("amount:>", amount);
          const rewardTran = new Transaction({
            UserId: userId,
            Amount: reward,
            TransactionType: "Reward",
          });
          transaction = new Transaction({
            UserId: userId,
            Amount: amount,
            TransactionType: "Credit",
          });

          await rewardTran.save();
        } else {
          transaction = new Transaction({
            UserId: userId,
            Amount: amount,
            TransactionType: "Credit",
          });
        }

        if (reward) {
          amount = amount + reward;
        }
        user.Balance += amount;
        await user.save();
        await transaction.save();
        return res.status(200).json({
          msg: "Funds deposited successfully",
          data: user,
        });
      }
      res.status(404).json({
        error: "User not found.",
      });
    } catch (ex) {
      res.status(400).json({
        msg: "Error while deposit funds.",
        error: ex.message,
      });
    }
  }

  static async TransferFunds(req, res) {
    try {
      const { receiverId, senderId, amount } = req.body;

      const receiver = await UserModel.findById(receiverId);
      const sender = await UserModel.findById(senderId);

      if (!sender || !receiver) {
        return res.status(404).json({
          error: "Sender or Receiver not found.",
        });
      }

      if (sender.Balance < amount) {
        return res.status(422).json({
          msg: "Insufficient balance.",
        });
      }

      var currentDate = new Date();
      const sendersAllTrans = await Transaction.find({
        UserId: senderId,
      });
      let totalAmount = 0;
      for (let i = 0; i < sendersAllTrans.length; i++) {
        if (
          sendersAllTrans[i].createdAt.toLocaleDateString() ===
            currentDate.toLocaleDateString() &&
          sendersAllTrans[i].TransactionType === "Debit"
        ) {
          totalAmount += sendersAllTrans[i].Amount;
        }
      }
      // console.log(totalAmount);
      if (totalAmount + amount <= 50000) {
        sender.Balance -= amount;
        receiver.Balance += amount;
        const receiverTran = new Transaction({
          UserId: receiverId,
          Amount: amount,
          TransactionType: "Credit",
        });
        const senderTran = new Transaction({
          UserId: senderId,
          Amount: amount,
          TransactionType: "Debit",
        });
        await sender.save();
        await receiver.save();
        await receiverTran.save();
        await senderTran.save();
        // sendEmail();
        res.status(200).json({
          msg: "Fund transfered successfully",
          data: `${sender.Name} has transfered ${amount} funds to ${receiver.Name}`,
        });
      } else {
        res.status(422).json({
          error: "Your daily limit exceeds.",
        });
      }
    } catch (ex) {
      res.status(400).json({
        msg: "Error while transfer funds.",
        error: ex.message,
      });
    }
  }
}

module.exports = UserController;
